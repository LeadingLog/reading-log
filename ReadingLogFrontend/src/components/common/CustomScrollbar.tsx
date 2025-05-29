import React, { useState, useEffect, useRef } from 'react';

type CustomScrollbarProps = {
  children: React.ReactNode;
  containerClassName?: string;
  scrollbarClassName?: string;
  hideScrollbar?: boolean;
  scrollbarWidth?: string;
  direction?: 'vertical' | 'horizontal'; // ➕ 방향 지정
  className?: string;
};

const CustomScrollbar = ({
                           children,
                           containerClassName = '',
                           scrollbarClassName = '',
                           scrollbarWidth = 'w-2',
                           className = '',
                           direction = 'vertical', // ➕ 기본값 세로
                         }: CustomScrollbarProps) => {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [scrollbarHeight, setScrollbarHeight] = useState(0);

  const containerRef = useRef<HTMLUListElement>(null);
  const [useScrollbar, setUseScrollbar] = useState<boolean>(false);// 스크롤바 표시 여부

  /* 스크롤 드래그 */
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef(0); // 클릭한 위치 (Y 또는 X)
  const initialScroll = useRef(0); // 클릭 시 스크롤 위치

  // 스크롤바 높이 계산 함수
  const calculateScrollbarHeight = () => {
    const container = containerRef.current;
    if (!container) return;

    const isVertical = direction === 'vertical';

    const contentSize = isVertical ? container.scrollHeight : container.scrollWidth;
    const containerSize = isVertical ? container.clientHeight : container.clientWidth;
    const scrollPos = isVertical ? container.scrollTop : container.scrollLeft;

    if (contentSize <= containerSize) {
      setUseScrollbar(false);
      return;
    }

    setUseScrollbar(true);

    const thumbSize = Math.max((containerSize / contentSize) * containerSize, 20);
    setScrollbarHeight(thumbSize);

    const maxScroll = contentSize - containerSize;
    const percentage = maxScroll > 0
      ? (scrollPos / maxScroll) * (containerSize - thumbSize)
      : 0;

    setScrollPercentage(percentage);
  };


  // 스크롤 시 thumb 위치만 업데이트
  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;

      const isVertical = direction === 'vertical';

      const contentSize = isVertical ? container.scrollHeight : container.scrollWidth;
      const containerSize = isVertical ? container.clientHeight : container.clientWidth;
      const scrollPos = isVertical ? container.scrollTop : container.scrollLeft;

      const thumbSize = Math.max((containerSize / contentSize) * containerSize, 20);

      const maxScroll = contentSize - containerSize;
      const percentage = maxScroll > 0
        ? (scrollPos / maxScroll) * (containerSize - thumbSize)
        : 0;

      setScrollPercentage(percentage);
    }
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = direction === 'vertical' ? e.clientY : e.clientX;
    initialScroll.current = direction === 'vertical'
      ? containerRef.current?.scrollTop || 0
      : containerRef.current?.scrollLeft || 0;

    // 👉 grabbing 상태 및 선택 방지
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;

    const currentPos = direction === 'vertical' ? e.clientY : e.clientX;
    const delta = currentPos - dragStartPos.current;

    if (direction === 'vertical') {
      containerRef.current.scrollTop = initialScroll.current + (delta * (containerRef.current.scrollHeight / containerRef.current.clientHeight));
    } else {
      containerRef.current.scrollLeft = initialScroll.current + (delta * (containerRef.current.scrollWidth / containerRef.current.clientWidth));
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // 👉 원상복구

    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // 초기 마운트 시 높이 계산
  useEffect(() => {
    calculateScrollbarHeight();
  }, []);

  // ResizeObserver로 container 크기 변화를 감지
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      calculateScrollbarHeight();
    });

    const mutationObserver = new MutationObserver(() => {
      calculateScrollbarHeight();
    });

    const container = containerRef.current;
    if (container) {
      resizeObserver.observe(container);
      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  // 가로 스크롤 가능하도록
  useEffect(() => {
    const container = containerRef.current;
    if (!container || direction !== "horizontal") return;

    const handleWheel = (e: WheelEvent) => {
      // 세로 스크롤 값을 가로로 이동
      e.preventDefault(); // 기본 세로 스크롤 막기
      container.scrollLeft = container.scrollLeft + e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [direction]);

  // 스크롤 잡고 이동 관련
  useEffect(() => {
    window.addEventListener("mousemove", handleDragMove);
    window.addEventListener("mouseup", handleDragEnd);
    return () => {
      window.removeEventListener("mousemove", handleDragMove);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  return (
    <section
      className={`relative flex flex-1 overflow-hidden group/scroll min-h-fit ${className} ${direction === 'horizontal' ? "pb-3" : 'pr-3'}`}>
      {/* 스크롤 가능한 콘텐츠 */}
      <ul
        ref={containerRef}
        onScroll={handleScroll}
        className={`${containerClassName} scrollbar-hide ${
          direction === 'vertical' ? 'overflow-y-auto' : 'overflow-x-auto'
        }`}
      >
        {children}
      </ul>

      {/* 커스텀 스크롤바 */}
      {useScrollbar && (
        <div
          className={`z-[2] ${direction === 'vertical' ? 'w-3 right-0 top-0 h-full' : 'h-3 bottom-0 left-0 w-full'} 
                bg-scrollbar_bg absolute ${scrollbarWidth}`}
        >
          <div
            className={`absolute ${direction === 'vertical' ? 'w-1.5 right-0' : 'h-1.5 bottom-0'} 
                  transform rounded-full ${scrollbarClassName}`}
            style={{
              top: direction === 'vertical' ? `${scrollPercentage}px` : undefined,
              left: direction === 'horizontal' ? `${scrollPercentage}px` : undefined,
              height: direction === 'vertical' ? `${scrollbarHeight}px` : undefined,
              width: direction === 'horizontal' ? `${scrollbarHeight}px` : undefined,
              cursor: isDragging ? 'grabbing' : 'grab',
            }}
            onMouseDown={handleDragStart}
          />
        </div>
      )}
    </section>
  );
};

export default CustomScrollbar;
