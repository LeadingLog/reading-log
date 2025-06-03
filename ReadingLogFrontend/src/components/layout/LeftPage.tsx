import React, { useState } from 'react';
import TimeLine from '../homeLeft/TimeLine.tsx';
import MyBookList from '../homeLeft/MyBookList';
import MyFavoriteList from '../homeLeft/MyFavoriteList';
import { TabName } from "../../types/tabName.ts";

// 탭 이름 타입 정의
const LeftPage: React.FC = () => {
  // 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabName>( '타임라인' );

  const tabList: TabName[] = ['타임라인', '내 독서 목록', '관심 도서']

  // 탭 클릭 핸들러
  const handleTabClick = (tab: TabName) => {
    setActiveTab( tab );
  };

  return (
    <section className="flex flex-col flex-1 overflow-hidden gap-4 h-full bg-page_Bg rounded-xl p-7">
      {/* 탭 영역 */}
      <ul className="flex text-base ">
        {tabList.map( (tab: TabName, idx) => (
          <li
            key={idx}
            className={`flex justify-center flex-1 cursor-pointer pb-1 border-b-2  ${
              activeTab === tab ? 'font-semibold border-b-8 border-leftPage_ActiveTab_Border' : 'border-leftPage_InActiveTab_Border'
            }`}
            onClick={() => handleTabClick( tab )}
          >
            {tab}
          </li>
        ) )}
      </ul>
      {/* 탭 콘텐츠 영역 */}
      {activeTab === '타임라인' && <TimeLine/>}
      {activeTab === '내 독서 목록' && <MyBookList/>}
      {activeTab === '관심 도서' && <MyFavoriteList activeTab={activeTab}/>}
    </section>
  );
};

export default LeftPage;
