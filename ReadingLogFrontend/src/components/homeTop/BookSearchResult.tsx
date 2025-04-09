import React, { useState } from 'react';
import IconFavorite from "../../assets/Icon-favorite.svg?react"
import { useModalStore } from "../../store/modalStore.ts";

const BookSearchResult: React.FC = () => {

  const [isOn, SetIsOn] = useState<boolean>(false);
  const {openModal} = useModalStore();

  /* 관심도서 토글 */
  const FavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // 해당 부분 클릭하면 부모요소 클릭 이벤트가 실행되지 않도록 방지 요소
    if (isOn) {
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
          })
        SetIsOn(false);
        }
      })
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
          })
        SetIsOn(true);
        }
      })
    }
  }

  const openModalBookPlan = () => {
    openModal("ModalBookPlan", {
      bookTitle: "책 제목",
      bookSubTitle: "책 저자",
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
      {/* 책 표지 리스트 */}
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li
        className="cursor-pointer flex gap-2 basis-[calc(50%-8px)] transition-[border] p-1 border-2 border-transparent items-center hover:border-2 hover:border-main_SearchBar_Border rounded-lg"
        onClick={() => {
          openModalBookPlan()
        }}
      >
        <div className="w-32 aspect-square bg-imgBook_Item_Bg rounded-xl">
          책 사진
        </div>
        <div className="flex-1">
          <p className="text-lg">책 이름이름이름책 이름이름이름책 이름이름이름책 이름이름이름</p>
          <p className="text-base">책 저자</p>
        </div>
        <div className="w-12 aspect-square relative">
          <div
            className={`${isOn ? "bg-favorite_Icon_Bg" : "bg-unFavorite_Icon_Bg"}
            absolute w-12 aspect-square left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-favorite_Icon_Color rounded-full p-2`}
            onClick={FavoriteToggle}
          >
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>

    </>
  );
};

export default BookSearchResult;