import { useState, useEffect, useRef } from 'react';

type CustomScrollbarProps = {
  children: React.ReactNode;
  containerClassName?: string;
  scrollbarClassName?: string;
  hideScrollbar?: boolean;
  scrollbarWidth?: string;
};

const CustomScrollbar = ({
                           children,
                           containerClassName = '',
                           scrollbarClassName = '',
                           scrollbarWidth = 'w-2',
                         }: CustomScrollbarProps) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const containerRef = useRef<HTMLUListElement>(null);
  const [useScrollbar, setUseScrollbar] = useState<boolean>(false);// 스크롤바 표시 여부

  // 스크롤바 높이 계산 함수
  const calculateScrollbarHeight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const contentHeight = container.scrollHeight; // 내부 요소의 전체 높이
      const containerHeight = container.clientHeight; // 화면에 보이는 높이

      if (contentHeight === containerHeight) { // 스크롤 보이지 않게 하기
        setUseScrollbar(false);
        return
      } else {
        setUseScrollbar(true);
        const scrollbarHeightCalc = Math.max(
          (containerHeight / contentHeight) * containerHeight,
          20
        );
        setScrollbarHeight(scrollbarHeightCalc);
      }
    }
  };

  // 스크롤 시 thumb 위치만 업데이트
  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const contentHeight = container.scrollHeight;
      const containerHeight = container.clientHeight;

      const scrollbarHeightCalc = Math.max(
        (containerHeight / contentHeight) * containerHeight,
        20
      );

      const scrollTop = container.scrollTop;
      const maxScrollTop = contentHeight - containerHeight;
      const scrollPercentageCalc =
        maxScrollTop > 0
          ? (scrollTop / maxScrollTop) * (containerHeight - scrollbarHeightCalc)
          : 0;

      setScrollPercentage(scrollPercentageCalc);
    }
  };

  // 초기 마운트 시 높이 계산
  useEffect(() => {
    calculateScrollbarHeight();
  }, []);

  // ResizeObserver로 container 크기 변화를 감지
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      calculateScrollbarHeight();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative flex flex-1 overflow-hidden group/scroll ${useScrollbar ? "pr-4" : 'pr-0'}`}>
      {/* 스크롤 가능한 콘텐츠 */}
      <ul
        ref={containerRef}
        onScroll={handleScroll}
        className={`${containerClassName} flex flex-col flex-1 gap-3 overflow-auto scrollbar-hide`}
      >
        {children}
      </ul>

      {/* 커스텀 스크롤바 */}
      {useScrollbar && (
        <div
          className={`z-[2] w-3 py-2 bg-scrollbar_bg absolute right-0 top-0 h-full ${scrollbarWidth}`}
        >
          <div
            className={`absolute w-[50%] left-1/2 transform -translate-x-1/2 rounded-full bg-scrollbar_Color transition-[colors] group-hover/scroll:bg-scrollbar_Hover_Color ${scrollbarClassName}`}
            style={{
              top: `${scrollPercentage}px`,
              height: `${scrollbarHeight}px`,
            }}
          />
        </div>
      )}
    </section>
  );
};

export default CustomScrollbar;
