import React, { useState } from 'react';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import { useModalStore } from "../../store/modalStore.ts";


interface AladinApiItem {
  title: string;
  author: string;
  isbn: string;
  cover: string;
  isFavorite?: boolean; // optional로
}

interface BookSearchResultProps {
  bookSearchResultList: AladinApiItem[];
}

const BookSearchResult: React.FC<BookSearchResultProps> = ({bookSearchResultList}) => {

  const [favoriteMap, setFavoriteMap] = useState<{ [isbn: string]: boolean }>({});
  const {openModal} = useModalStore();

  /* 북 정보 관련 */


  /* 관심도서 버튼을 클릭하면 뜨는 모달 관련 */
  const FavoriteToggle = (e: React.MouseEvent, isbn: string) => {
    e.stopPropagation(); // 해당 부분 클릭하면 부모요소 클릭 이벤트가 실행되지 않도록 방지 요소
    const isCurrentlyFavorite = favoriteMap[isbn];
    if (isCurrentlyFavorite) {
      openModal("ModalNotice", {
        title: "관심도서에서 제거 하시겠어요?",
        subTitle: "관심도서 목록에서 제거됩니다.",
        cancelText: "닫기",
        confirmText: "제거하기",
        reverseBtn: true,
        onConfirm: () => {
          openModal("ModalNotice", {
            title: "제거되었습니다.",
            subTitle: "언제든 다시 추가 가능해요!",
            onlyClose: true,
          });
          setFavoriteMap(prev => ({ ...prev, [isbn]: false }));
        },
      });
    } else {
      openModal("ModalNotice", {
        title: "관심도서로 설정하시겠어요?",
        subTitle: "관심도서로 설정됩니다.",
        cancelText: "닫기",
        confirmText: "예 추가할래요!",
        onConfirm: () => {
          openModal("ModalNotice", {
            title: "관심도서에 추가되었어요!",
            subTitle: "이 책이 마음에 드셨군요!",
            onlyClose: true,
          });
          setFavoriteMap(prev => ({ ...prev, [isbn]: true }));
        },
      });
    }
  }

  /* 책 리스트를 클릭하면 책 계획 모달이 뜨는 경우 */

  const openModalBookPlan = (item : AladinApiItem) => {
    openModal("ModalBookPlan", {
      cover: item.cover, // 여기 추가
      bookTitle: item.title,
      bookSubTitle: item.author,
      cancelText: "다음에 읽기",
      confirmText: "독서 계획 추가",
      onConfirm: () => {
        openModal("ModalNotice", {
          title: "내 독서 목록에 추가 되었어요!",
          subTitle: "즐거운 독서시간!",
          onlyClose: true,
        })
      }

    })
  }
  return (
    <>
      {/*책 표지 리스트*/}
      {bookSearchResultList.map((item, idx) => (
        <li
          className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-main_SearchBar_Border rounded-lg"
          onClick={() => openModalBookPlan(item)}
          key={idx}
        >
          <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl overflow-hidden">
            <img src={item.cover} alt={item.title} className="w-full h-full object-cover"/>
          </div>
          <div className="flex-1">
            <p className="text-lg">{item.title}</p>
            <p className="text-base">{item.author}</p>
          </div>
          <div className="w-12 aspect-square relative">
            <div
              className={`${item.isFavorite ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
          absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
              onClick={(e) => {
                e.stopPropagation(); // 모달 열림 방지
                FavoriteToggle(e, item.isbn)
              }}
            >
              <IconFavorite width="100%" height="100%"/>
            </div>
          </div>
        </li>
      ))}
    </>
  );
};

export default BookSearchResult;