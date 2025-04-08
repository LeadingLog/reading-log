import React, { useState } from 'react';
import TimeLine from '../homeLeft/TimeLine.tsx';
import MyBookList from '../homeLeft/MyBookList';
import MyFavoriteList from '../homeLeft/MyFavoriteList';

// 탭 이름 타입 정의
type TabName = 'TimeLine' | 'MyBookList' | 'MyFavoriteList';

const LeftPage: React.FC = () => {
  // 활성화된 탭 상태 관리
  const [activeTab, setActiveTab] = useState<TabName>('TimeLine');

  // 탭 클릭 핸들러
  const handleTabClick = (tabName: TabName) => {
    setActiveTab(tabName);
  };

  return (
    <section className="flex flex-col flex-1 overflow-hidden gap-4 h-full bg-page_Bg rounded-xl p-7">
      {/* 탭 영역 */}
      <ul className="flex text-base ">
        <li
          className={`flex justify-center flex-1 cursor-pointer pb-1 border-b-2  ${
            activeTab === 'TimeLine' ? 'font-semibold border-b-8 border-leftPage_ActiveTab_Border' : 'border-leftPage_InActiveTab_Border'
          }`}
          onClick={() => handleTabClick('TimeLine')}
        >
          타임라인
        </li>
        <li
          className={`flex justify-center flex-1 cursor-pointer pb-1 border-b-2  ${
            activeTab === 'MyBookList' ? 'font-semibold border-b-8 border-leftPage_ActiveTab_Border' : 'border-leftPage_InActiveTab_Border'
          }`}
          onClick={() => handleTabClick('MyBookList')}
        >
          내 독서 목록
        </li>
        <li
          className={`flex justify-center flex-1 cursor-pointer pb-1 border-b-2  ${
            activeTab === 'MyFavoriteList' ? 'font-semibold border-b-8 border-leftPage_ActiveTab_Border' : 'border-leftPage_InActiveTab_Border'
          }`}
          onClick={() => handleTabClick('MyFavoriteList')}
        >
          관심 도서
        </li>
      </ul>
      {/* 탭 콘텐츠 영역 */}
      {activeTab === 'TimeLine' && <TimeLine />}
      {activeTab === 'MyBookList' && <MyBookList />}
      {activeTab === 'MyFavoriteList' && <MyFavoriteList />}
    </section>
  );
};

export default LeftPage;
