import React, { useEffect, useRef, useState } from 'react';
import { useModalStore } from '../../store/modalStore';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import IconCalendar from "../../assets/Icon-calendar.svg?react"
import { ModalBookPlanProps, ModalData } from "../../types/modal.ts";
import { readingListAddApi } from "../../api/readingListAddAPI.ts";
import { ReadingListAddApiRequestBody } from "../../types/readingListAdd.ts";
import { useUserStore } from "../../store/userStore.ts";
import { bookStatusChangeBody } from "../../types/bookStatusChange.ts";
import { bookStatusChangeApi } from "../../api/bookStatusChangeApi.ts";
import { deleteBookApi } from "../../api/deleteBookApi.ts";
import { DeleteBook } from "../../types/deleteBook.ts";
import { useGlobalChangeStore } from "../../store/useGlobalChangeStore.ts";
import { AxiosError } from "axios";
import { useReadingBookStore } from "../../store/useReadingInfoStore.ts";

const ModalBookPlan: React.FC<ModalBookPlanProps> = ({
                                                       bookId,
                                                       title,
                                                       bookTitle,
                                                       author,
                                                       isbn13,
                                                       cover,
                                                       bookLink,
                                                       readStartDt,
                                                       readEndDt,
                                                       confirmText,
                                                       bookStatus,
                                                       monthReadingList,
                                                       onlyClose,
                                                       cancelText
                                                     }) => {
  const { closeModal, openModal, closeAllModals } = useModalStore();
  const { userId } = useUserStore();
  const { readingBookId } = useReadingBookStore()

  /* db 변경 알림용 */
  const { triggerChange } = useGlobalChangeStore.getState();

  const [isLoading, setIsLoading] = useState<boolean>( false );

  /* 시작 달 종료 달 표시용 */
  const [pickStartYear, setPickStartYear] = useState<number>( 0 );
  const [pickStartMonth, setPickStartMonth] = useState<number>( 0 );
  const [pickEndYear, setPickEndYear] = useState<number>( 0 );
  const [pickEndMonth, setPickEndMonth] = useState<number>( 0 );

  /* 현재 날로 초기화 하기 용*/
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  /* 종료 달 부분에 그 달의 마지막 날을 표시 하기 위한 것 */
  const getLastDateOfMonth = (currentYear: number, currentMonth: number): string => {
    const lastDate = new Date( currentYear, currentMonth, 0 ).getDate(); // month는 1-12로 받아서 그대로 사용
    return String( lastDate ).padStart( 2, '0' );
  };

  /* 시작달 or 종료달 캘릭터 뛰우기 */
  const openCalendar = ({ startOrEnd }: ModalData) => {
    if (monthReadingList) return
    const isStart = startOrEnd === "시작 달";
    const { modals } = useModalStore.getState();

    // 이미 같은 종류의 모달이 열려 있다면 아무것도 하지 않음
    const sameModal = modals.find(
      (modal) =>
        modal.type === "ModalCalendar" &&
        modal.data?.startOrEnd === startOrEnd
    );
    if (sameModal) return;

    // 다른 종류의 ModalCalendar가 열려 있으면 먼저 닫기
    const otherModal = modals.find(
      (modal) =>
        modal.type === "ModalCalendar" &&
        modal.data?.startOrEnd !== startOrEnd
    );
    if (otherModal) {
      closeModal( otherModal.modalId );
    }
    // 모달 열기
    openModal( 'ModalCalendar', {
      startOrEnd,
      currentYear: isStart ? pickStartYear : pickEndYear,
      pickYear: isStart ? setPickStartYear : setPickEndYear,
      pickMonth: isStart ? setPickStartMonth : setPickEndMonth
    } );
  };

  /* 독서계획추가 api */
  const ReadingListAdd = async () => {
    setIsLoading( true )
    const ReadingListAddApiRequestBody: ReadingListAddApiRequestBody = {
      userId: userId,
      bookTitle: bookTitle ?? "",
      author: author ?? "",
      isbn13: isbn13 ?? "",
      link: bookLink,
      coverImgUrl: cover,
      bookStatus: 'NOT_STARTED',

      // 문자열 템플릿을 사용해 날짜 포맷 구성
      readStartDt: `${pickStartYear}-${String( pickStartMonth ).padStart( 2, '0' )}-01`,
      readEndDt: `${pickEndYear}-${String( pickEndMonth ).padStart( 2, '0' )}-${getLastDateOfMonth( pickEndYear, pickEndMonth )}`
    };
    try {
      const response = await readingListAddApi( ReadingListAddApiRequestBody )

      if (response) {
        triggerChange( "MyReadingList" )
        openModal( 'ModalNotice', {
          title: "내 독서 목록에 추가 되었어요!",
          subTitle: "즐거운 독서시간!",
          confirmText: "닫기",
          onlyConfirm: true,
          withMotion: true,
          onConfirm: async () => {
            closeAllModals()
          }
        } )
      }
    } catch (error) {

      let errorMessage = '알 수 없는 오류가 발생했습니다.';

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error( '독서 목록 추가 실패', error )
      openModal( 'ModalNotice', {
        title: '요청 실패',
        subTitle: `${errorMessage}`,
        onlyClose: true,
        withMotion: true,
      } )
    } finally {
      setIsLoading( false )
    }
  }

  /* 독서계획변경 api */
  const bookPlanChange = async () => {
    const bookStatusChangeBody: bookStatusChangeBody = {
      bookId: bookId,
      userId: userId,
      bookStatus: 'NOT_STARTED',

      // 문자열 템플릿을 사용해 날짜 포맷 구성
      readStartDt: `${pickStartYear}-${String( pickStartMonth ).padStart( 2, '0' )}-01`,
      readEndDt: `${pickEndYear}-${String( pickEndMonth ).padStart( 2, '0' )}-${getLastDateOfMonth( pickEndYear, pickEndMonth )}`
    };

    if (readStartDt === bookStatusChangeBody.readStartDt && readEndDt === bookStatusChangeBody.readEndDt) {
      openModal( 'ModalNotice', {
        title: "기존 계획 날짜와 같습니다.",
        subTitle: "날짜를 변경해주세요",
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      } );
      return;
    }
    try {
      setIsLoading( true )
      const response = await bookStatusChangeApi( bookStatusChangeBody )

      if (response) {
        if (bookStatus === "INTERESTED") {
          triggerChange( "INTERESTED" )
        } else {
          triggerChange( "MyReadingList" )
        }
        openModal( 'ModalNotice', {
          title: `독서 계획이 ${bookStatus === "INTERESTED" ? "추가 " : "변경"} 되었어요!`,
          subTitle: "즐거운 독서시간!",
          confirmText: "닫기",
          onlyConfirm: true,
          withMotion: true,
          onConfirm: async () => {
            closeAllModals()
          }
        } )
      }
    } catch (error) {

      let errorMessage = '알 수 없는 오류가 발생했습니다.';

      if (error instanceof AxiosError && error.response) {
        errorMessage = error.response.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error( '독서 계획 변경 실패', error )
      openModal( 'ModalNotice', {
        title: '요청 실패',
        subTitle: `${errorMessage}`,
        onlyClose: true,
        withMotion: true,
      } )
    } finally {
      setIsLoading( false )
    }
  }
  /* 독서 계획 추가 버튼 클릭 시 함수 */
  const completeBookPlan = async () => {
    const alertModal = (alertMessage: string) => {
      openModal( 'ModalNotice', {
        title: alertMessage,
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      } );
    }
    if (bookId === readingBookId) {
      openModal( 'ModalNotice', {
        title: "독서중인 도서는 변경 할 수 없습니다.",
        subTitle: "독서를 종료하고 변경하세요",
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      } );
      return;
    }
    // 종료일이 시작일보다 앞선 경우
    const isEndBeforeStart =
      pickEndYear < pickStartYear ||
      (pickEndYear === pickStartYear && pickEndMonth < pickStartMonth);

    // 시작일이 오늘 이전인 경우
    const isStartBeforeToday =
      pickStartYear < currentYear ||
      (pickStartYear === currentYear && pickStartMonth < currentMonth);

    if (isEndBeforeStart) {
      alertModal( "종료일이 시작일보다 빠를 수 없어요!" ); // 경고 모달 또는 alert
      return;
    } else if (isStartBeforeToday) {
      alertModal( "시작일이 오늘 보다 이전 일 순 없어요!" ); // 경고 모달 또는 alert
      return;
    } else if (bookId) {
      await bookPlanChange()
    } else {
      await ReadingListAdd()
    }
  };
  /* 독서 계획 추가 버튼 클릭 시 함수 END -----------------*/

  /* 모달 처음 실행할 때 현재 달로 시작 달 종료달 세팅 */
  useEffect( () => {
    setPickStartYear( Number( readStartDt?.split( "-" )[0] ) || currentYear )
    setPickStartMonth( Number( readStartDt?.split( "-" )[1] ) || currentMonth )
    setPickEndYear( Number( readEndDt?.split( "-" )[0] ) || currentYear )
    setPickEndMonth( Number( readEndDt?.split( "-" )[1] ) || currentMonth )
  }, [] );
  /* 모달 처음 실행할 때 현재 달로 시작 달 종료달 세팅 END -----------------*/


  /* 관심도서 추가 모달 로딩 관련 */
  const setModalIsLoading = useModalStore( state => state.setModalIsLoading );

  /* 관심도서로 추가 api */
  const addInterested = async () => {
    if (bookId === readingBookId) {
      openModal( 'ModalNotice', {
        title: "독서중인 도서는\n관심도서로 변경 할 수 없습니다.",
        subTitle: "독서를 종료하고 변경하세요",
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      } );
      return;
    }
    const addInterestedRequestBody: bookStatusChangeBody = {
      bookId: bookId,
      userId: userId,
      bookStatus: 'INTERESTED',
    };
    const addInterestedModal = () => {
      openModal( "ModalNotice", {
        title: "관심도서로 변경 하시겠어요?",
        subTitle: "내 독서 목록에서 제거 됩니다.",
        cancelText: "아니요",
        confirmText: "추가하기",
        withMotion: true,
        loadingMessage: "추가중",
        onConfirm: async () => {
          try {
            setModalIsLoading( true )
            const response = await bookStatusChangeApi( addInterestedRequestBody )
            if (response) {
              triggerChange( "MyReadingList" )
              openModal( "ModalNotice", {
                title: "관심도서로 추가되었어요!",
                onlyClose: true,
                withMotion: true,
                onCancel: () => {
                  closeAllModals()
                }
              } );
            }
          } catch (error) {
            let errorMessage = '알 수 없는 오류가 발생했습니다.';

            if (error instanceof AxiosError && error.response) {
              errorMessage = error.response.data?.message || error.message;
            } else if (error instanceof Error) {
              errorMessage = error.message;
            }
            console.error( '관심 도서로 변경 실패', error )
            openModal( "ModalNotice", {
              title: '요청 실패',
              subTitle: `${errorMessage}`,
              onlyClose: true,
              withMotion: true,
            } );
          } finally {
            setModalIsLoading( false )
          }
        },
      } );
    }
    addInterestedModal()
  }

  const deleteBook = () => {
    if (bookId === readingBookId) {
      openModal( 'ModalNotice', {
        title: "독서중인 도서는 삭제 할 수 없습니다.",
        subTitle: "독서를 종료하고 변경하세요",
        cancelText: "다시 선택하기",
        onlyClose: true,
        withMotion: true
      } );
      return;
    }
    openModal( "ModalNotice", {
      title: `${bookTitle} 도서를 삭제 하시겠어요?`,
      subTitle: "해당 목록에서 제거 됩니다.",
      withMotion: true,
      cancelText: '아니요',
      confirmText: '삭제하기',
      loadingMessage: "삭제중",
      onConfirm: async () => {
        const DeleteBookBody: DeleteBook = {
          userId: userId,
          bookId: bookId
        }
        try {
          setModalIsLoading( true )
          const response = await deleteBookApi( DeleteBookBody )
          if (response) {
            if (bookStatus === "INTERESTED") {
              triggerChange( "INTERESTED" );
            } else {
              triggerChange( "MyReadingList" )
            }

            openModal( "ModalNotice", {
              title: "목록에서 제거되었습니다!",
              onlyClose: true,
              withMotion: true,
              onCancel: () => {
                closeAllModals()
              }
            } );
          }
        } catch (error) {
          let errorMessage = '알 수 없는 오류가 발생했습니다.';

          if (error instanceof AxiosError && error.response) {
            errorMessage = error.response.data?.message || error.message;
          } else if (error instanceof Error) {
            errorMessage = error.message;
          }

          console.error( '도서 삭제 실패', error )
          openModal( "ModalNotice", {
            title: '요청 실패',
            subTitle: `${errorMessage}`,
            onlyClose: true,
            withMotion: true,
          } );
        } finally {
          setModalIsLoading( false )
        }
      }
    } )
  }

  /* 유동적인 이미지 높이 값을 설정하기 위해 오른쪽 독서계획 영역의 높이 값을 추적함 수 ----------------*/
  const parentRef = useRef<HTMLAnchorElement | null>( null );
  const [imageHeight, setImageHeight] = useState<number>( 0 );

  useEffect( () => {
    const parent = parentRef.current;
    if (!parent) return;

    // ResizeObserver 인스턴스 생성
    const resizeObserver = new ResizeObserver( (entries) => {
      for (const entry of entries) {
        const newHeight = entry.contentRect.height;
        setImageHeight( newHeight );
      }
    } );

    resizeObserver.observe( parent ); // 감시 시작

    // 언마운트 시 관찰 중지
    return () => {
      resizeObserver.unobserve( parent );
      setImageHeight( 0 )
    };
  }, [] );
  /* 유동적인 이미지 높이 값을 설정하기 위해 오른쪽 독서계획 영역의 높이 값을 추적함 수 END ----------------*/
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-modal_Container_bg z-50">
      <section className="flex gap-5 bg-modal_Default_Bg p-5 rounded-lg">
        <a
          ref={parentRef}
          href={bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="relative min-w-fit bg-modal_BookImg_Bg"
        >
          {cover ? (
            <img
              src={cover}
              alt={title}
              className="object-contain min-w-fit"
              style={{ height: `${imageHeight}px` }}
            />
          ) : (
            <div className="flex w-full justify-center relative px-2 h-full items-center bg-imgBook_Item_Bg">
              <span className="text-2xl font-bold text-imgBook_Item_No_Img_Text">No Image</span>
            </div>
          )}
          {bookId && bookStatus !== "INTERESTED" && (
            <button
              className="hover:brightness-[95%] duration-100 active:scale-90 absolute w-8 h-8 left-2 top-2 text-favorite_Icon_Color bg-unFavorite_Icon_Bg rounded-full p-1.5"
              onClick={(e) => {
                e.preventDefault();  // 이벤트 버블링 방지
                e.stopPropagation(); // <a>의 기본 링크 동작 방지
                addInterested();
              }}
            >
              <IconFavorite width="100%" height="100%"/>
            </button>
          )}
        </a>
        <article
          className="flex flex-1 justify-between flex-col gap-8 bg-modal_Content_Bg p-2.5 rounded-lg"
        >
          <div className="relative max-w-80 flex flex-col gap-1">
            <span className="flex gap-2 relative justify-between">
              <p className="absolute top-1 bottom-1 left-0 w-1 bg-title_Marker"></p>
              <span
                className="text-lg font-semibold break-keep text-modal_BookPlan_Book_Title_Text ml-2">{bookTitle}</span>
              {bookId && (
                <button onClick={() => deleteBook()}
                        className="hover:brightness-[95%] duration-100 active:scale-95 min-w-fit max-h-9 text-modal_BookPlan_Book_DeleteBook_Text border-4 border-modal_BookPlan_Book_DeleteBook_Border px-2 rounded-lg">삭제</button>
              )}
            </span>
            <p className="text-modal_BookPlan_Book_Sub_Title_Text">{author}</p>
          </div>

          <section className="relative flex gap-4">
            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">시작 달</p>
              <button
                className={`${monthReadingList ? 'cursor-default' : 'hover:brightness-[97%] duration-100'} group flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg`}
                disabled={isLoading}
                onClick={() => {
                  openCalendar( { startOrEnd: "시작 달" } )
                }}
              >
                <span className="text-modal_BookPlan_Calendar_Date_Text">
                  {pickStartYear}.{String( pickStartMonth ).padStart( 2, '0' )}.01
                </span>
                {!monthReadingList && (
                  <span className="w-3 group-active:scale-90 duration-100 text-modal_BookPlan_Calendar_Icon_Color">
                    <IconCalendar width="100%" height="100%"/>
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-col flex-1">
              <p className="text-modal_BookPlan_StartEnd_Month_Text">종료 달</p>
              <button
                className={`${monthReadingList ? 'cursor-default ' : 'hover:brightness-[97%] duration-100'} group flex justify-between py-1 px-2 bg-modal_BookPlan_Calendar_Bg rounded-lg`}
                disabled={isLoading}
                onClick={() => {
                  openCalendar( { startOrEnd: "종료 달" } )
                }}
              >
                <span className="text-modal_BookPlan_Calendar_Date_Text">
                  {pickEndYear}.{String( pickEndMonth ).padStart( 2, '0' )}.{getLastDateOfMonth( pickEndYear, pickEndMonth )}
                </span>
                {!monthReadingList && (
                  <span className="w-3 group-active:scale-90 duration-100 text-modal_BookPlan_Calendar_Icon_Color">
                    <IconCalendar width="100%" height="100%"/>
                  </span>
                )}
              </button>
            </div>
          </section>

          <section className="flex gap-4">
            <button
              onClick={() => {
                closeAllModals()
              }}
              className="hover:brightness-[95%] active:scale-95 duration-100 flex-1 min-w-[130px] px-4 py-1 border-4 border-modal_Left_Btn_Border rounded-lg"
              disabled={isLoading}
            >
              {cancelText || '닫기'}
            </button>
            {!onlyClose && (
              <button
                onClick={() => {
                  completeBookPlan();      // 현재 페이지 관련 초기화 작업
                }}
                className="hover:brightness-[95%] active:scale-95 duration-100 flex-1 min-w-[130px] justify-center items-center gap-1 flex px-4 py-1 bg-modal_Right_Btn_Bg rounded-lg"
                disabled={isLoading}
              >

                {isLoading ? (
                  <>
                    <span>추가 중</span>
                    <span
                      className="w-5 h-5 border-4 border-modal_BookPlan_loadingBg border-t-modal_BookPlan_loadingSpinner rounded-full animate-spin"></span>
                  </>
                ) : (
                  <span>{confirmText || "독서 계획 추가"}</span>
                )}
              </button>
            )}
          </section>
        </article>
      </section>
    </div>
  );
};

export default ModalBookPlan;
