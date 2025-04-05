import { useEffect, useState } from "react";

export default function ItemReadStatus() {

  /* 독서중 or 완독 토글*/
  const [isOn, setIsOn] = useState(false) // 타이머 토글 on/off
  const toggleSwitch = () => setIsOn(!isOn)
  const [noRead, setNoRead] = useState(true) // 읽기 전인지 읽는 중 & 완독 인지 구별 하기 위한 것

  useEffect(() => {
    setNoRead(true)
  }, [])

  return (
    /* 이번 달 독서 리스트 */
    <>
      {noRead ? (
        <button
          onClick={toggleSwitch}
          className="relative flex items-center w-[70px] h-full rounded-full px-1 bg-toggle_Read_Status_Bg overflow-hidden"
        >
          {/* 움직이는 동그라미 */}
          <div
            className={`z-[2] h-[calc(100%-6px)] absolute aspect-square rounded-full bg-modal_BookImg_Bg transition-[left,background] duration-300 ${
              isOn ? 'bg-toggle_Reading_Circle_Color left-[8%] group-hover:bg-toggle_Reading_Circle_Hover' : 'bg-toggle_Complete_Circle_Color left-[63%] group-hover:bg-toggle_Complete_Circle_Hover'
            }`}
          ></div>

          {/* 상태 텍스트 */}
          <span className={`${isOn ? 'right-1' : 'left-3'} 
            absolute text-[13px] font-semibold text-toggle_Complete_Text_Color transition-opacity duration-200`}>
              {isOn ? '독서중' : '완독'}
            </span>
        </button>
      ) :
        <button
          className="relative flex justify-end items-center h-full bg-toggleNoReadingBg py-0.5 px-2 rounded-full">
          <span className="text-xs text-noReadingBg contrast-0">읽기전</span>
        </button>
      }
    </>
  );
}