import React, { useState } from "react";
import { useModalStore } from "../../../store/modalStore.ts";
import { itemReadStatusParams } from "../../../types/readStatus.ts";
import { bookStatusChangeApi } from "../../../api/bookStatusChange.ts";
import { useUserStore } from "../../../store/userStore.ts";
import { bookStatusChangeBody } from "../../../types/bookStatusChange.ts";

// 2. 컴포넌트 정의
export default function ItemReadStatus({ bookId, bookStatus }: itemReadStatusParams) {

  const { openModal, closeAllModals } = useModalStore()
  const setModalIsLoading = useModalStore( state => state.setModalIsLoading );
  // const modalIsLoading = useModalStore( (state) => state.modalIsLoading );

  const [currentStatus, setCurrentStatus] = useState( bookStatus )

  const { userId } = useUserStore()

  /* 독서중 or 완독 토글*/
  const toggleSwitch = (e: React.MouseEvent) => {
    e.stopPropagation(); // 해당 부분 클릭하면 부모요소 클릭 이벤트가 실행되지 않도록 방지 요소

    const bookStatusChangeBodyValue: bookStatusChangeBody = {
      userId: userId,
      bookId: bookId ?? null,
      bookStatus: currentStatus
    }

    if (currentStatus === "IN_PROGRESS") {
      openModal( "ModalNotice", {
        title: "완독한 도서 인가요?",
        subTitle: "완독한 도서로 변경됩니다.",
        cancelText: "조금 더 읽을래요!",
        confirmText: "예 완독했습니다!",
        loadingMessage: "변경 중",
        onConfirm: async () => {
          setModalIsLoading( true )
          try {
            await bookStatusChangeApi( bookStatusChangeBodyValue )
            setCurrentStatus( "COMPLETED" )
            openModal( "ModalNotice", {
              title: "완독을 축하드려요!",
              onlyClose: true,
            } )
            closeAllModals()

          } catch (error) {
            console.error( '완독 도서로 변경 실패', error )
            openModal( 'ModalNotice', {
              title: '완독 도서로 변경 실패',
              subTitle: `${error}`,
              onlyClose: true,
              withMotion: true,
            } )
          } finally {
            setModalIsLoading( false )
          }
        }
      } )
    } else if (currentStatus === "COMPLETED") {
      openModal( "ModalNotice", {
        title: "아직 완독하지 않은 도서인가요?",
        subTitle: "완독하지 않은 도서로 변경됩니다.",
        cancelText: "닫기",
        confirmText: "예 조금 더 읽을래요!",
        loadingMessage: "변경 중",
        onConfirm: async () => {
          setModalIsLoading( true )
          try {
            await bookStatusChangeApi( bookStatusChangeBodyValue )
            setCurrentStatus( "IN_PROGRESS" )
            openModal( "ModalNotice", {
              title: "독서 중 도서로 변경되었습니다.!",
              onlyClose: true,
            } )
            closeAllModals()
          } catch (error) {
            console.error( '독서중인 도서로 변경 실패', error )
            openModal( 'ModalNotice', {
              title: '독서중인 도서로 변경 실패',
              subTitle: `${error}`,
              onlyClose: true,
              withMotion: true,
            } )
          } finally {
            setModalIsLoading( false )
          }
        }
      } )
    }
  }

  return (
    /* 이번 달 독서 리스트 */
    <>
      {currentStatus !== "NOT_STARTED" ? (
          <button
            onClick={toggleSwitch}
            className="relative flex items-center w-[70px] h-full rounded-full px-1 bg-toggle_Read_Status_Bg overflow-hidden"
          >
            {/* 움직이는 동그라미 */}
            <div
              className={`z-[2] h-[calc(100%-6px)] absolute aspect-square rounded-full bg-modal_BookImg_Bg transition-[left,background] duration-300 ${
                currentStatus === "IN_PROGRESS" ? 'bg-toggle_Reading_Circle_Color left-[8%] group-hover:bg-toggle_Reading_Circle_Hover' : 'bg-toggle_Complete_Circle_Color left-[63%] group-hover:bg-toggle_Complete_Circle_Hover'
              }`}
            ></div>

            {/* 상태 텍스트 */}
            <span className={`${currentStatus === "IN_PROGRESS" ? 'right-1' : 'left-3'} 
            absolute text-[13px] font-semibold text-toggle_Complete_Text_Color transition-opacity duration-200`}>
              {currentStatus === "IN_PROGRESS" ? '독서중' : '완독'}
            </span>
          </button>
        ) :
        <button
          className="relative flex justify-end items-center h-full bg-toggle_NoReading_Bg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      }
    </>
  );
}