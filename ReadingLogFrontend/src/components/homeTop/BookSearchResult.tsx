import React from 'react';
import IconFavorite from "../../assets/Icon-favorite.svg?react"

const BookSearchResult: React.FC = () => {
  return (
    <>
      {/* 책 표지 리스트 */}
      <li className="flex basis-1/2">
        <div className="bg-imgBook_Item_Bg">
          책 사진
        </div>
        <div>
          <p>책 이름이름이름</p>
          <p>책 저자</p>
        </div>
        <div className="relative">
          <div
            className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li className="flex">
        <div className="bg-imgBook_Item_Bg">
          책 사진
        </div>
        <div>
          <p>책 이름이름이름</p>
          <p>책 저자</p>
        </div>
        <div className="relative">
          <div
            className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li className="flex">
        <div className="bg-imgBook_Item_Bg">
          책 사진
        </div>
        <div>
          <p>책 이름이름이름</p>
          <p>책 저자</p>
        </div>
        <div className="relative">
          <div
            className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
            <IconFavorite width="100%" height="100%"/>
          </div>
        </div>
      </li>
      <li className="relative bg-imgBook_Item_Bg">
        <div
          className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
          <IconFavorite width="100%" height="100%"/>
        </div>
      </li>
      <li className="relative bg-imgBook_Item_Bg">
        <div
          className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
          <IconFavorite width="100%" height="100%"/>
        </div>
      </li>
      <li className="relative bg-imgBook_Item_Bg">
        <div
          className="absolute w-8 h-8 right-2 bottom-2 text-favorite_Icon_Color bg-favorite_Icon_Bg rounded-full p-1.5">
          <IconFavorite width="100%" height="100%"/>
        </div>
      </li>
    </>
  );
};

export default BookSearchResult;