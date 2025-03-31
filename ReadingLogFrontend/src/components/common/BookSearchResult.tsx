import React from 'react';
import IconFavorite from "../../assets/Icon-favorite.svg?react"

const BookSearchResult: React.FC = () => {
  return (
      <article className="bg-searchBg rounded-b-[20px] overflow-hidden">
      {/* 책 표지 리스트 */}
        <ul className="grid grid-cols-3 gap-6">
          <li className="relative aspect-square bg-bookImgItemBg">
            <div className="absolute w-8 h-8 right-2 bottom-2 text-FavoriteIcon bg-FavoriteIconBg rounded-full p-1.5">
              <IconFavorite width="100%" height="100%"/>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">
            <div className="absolute w-8 h-8 right-2 bottom-2 text-FavoriteIcon bg-FavoriteIconBg rounded-full p-1.5">
              <IconFavorite width="100%" height="100%"/>
            </div>
          </li>
          <li className="relative aspect-square bg-bookImgItemBg">

          </li>
          <li className="relative aspect-square bg-bookImgItemBg">

          </li>
          <li className="relative aspect-square bg-bookImgItemBg">

          </li>
          <li className="relative aspect-square bg-bookImgItemBg">

          </li>
          <li className="relative aspect-square bg-bookImgItemBg">

          </li>
        </ul>
      </article>
  );
};

export default BookSearchResult;