import React, { useState } from 'react';
import TimeLine from '../homeLeft/TimeLine.tsx';
import MyBookList from '../homeLeft/MyBookList';
import MyFavoriteList from '../homeLeft/MyFavoriteList';
import { LeftPageTabName } from "../../types/LeftPageTabName.ts";

// 탭 이름 타입 정의
const LeftPage: React.FC = () => {
  // 활성화된 탭 상태 관리
  const [activeLeftPageTab, setActiveLeftPageTab] = useState<LeftPageTabName>( '타임라인' );

  const LeftPageTabName: LeftPageTabName[] = ['타임라인', '내 독서 목록', '관심 도서']

  const leftPageTabNumber = {
    "타임라인": 0,
    "내 독서 목록": 33.33,
    "관심 도서": 66.66
  }

  // 탭 클릭 핸들러
  const handleTabClick = (LeftPageTabName: LeftPageTabName) => {
    setActiveLeftPageTab( LeftPageTabName );
  };

  return (
    <section className="flex flex-col flex-1 overflow-hidden gap-4 h-full bg-page_Bg rounded-xl p-7">
      {/* 탭 영역 */}
      <ul className="flex text-base relative">
        {LeftPageTabName.map( (tab: LeftPageTabName) => (
          <li
            key={tab}
            className={`hover:text-leftPage_Tab_Hover_Text hover:border-b-4 
            flex justify-center flex-1 cursor-pointer pb-1 border-b-2
            ${activeLeftPageTab === tab ? "text-leftPage_Tab_Hover_Text" : "text-leftPage_Tab_Text" }`}

            onClick={() => handleTabClick( tab )}
          >
            {tab}
          </li>
        ) )}
        <li className="absolute w-1/3 bottom-0 h-2 bg-leftPage_ActiveTab_Border"
            style={{ left : `${ leftPageTabNumber[activeLeftPageTab] }%` }}
        >

        </li>
      </ul>
      {/* 탭 콘텐츠 영역 */}
      {activeLeftPageTab === '타임라인' && <TimeLine/>}
      {activeLeftPageTab === '내 독서 목록' && <MyBookList/>}
      {activeLeftPageTab === '관심 도서' && <MyFavoriteList/>}
    </section>
  );
};

export default LeftPage;
