import ModalManager from "../../components/modal/ModalManager.tsx";

const KakaoCallback = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        {/* 로딩용 원형 스피너 */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
      <ModalManager />
    </div>
  );
};

export default KakaoCallback;