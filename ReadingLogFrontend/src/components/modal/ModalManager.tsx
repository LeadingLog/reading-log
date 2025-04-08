import ModalAlert from './ModalAlert.tsx';
import ModalBookPlan from './ModalBookPlan';
import ModalMyPage from './ModalMyPage';
import ModalNotice from './ModalNotice';
import ModalTrackingPlan from './ModalTrackingPlan';

const ModalManager = () => {
  return (
    <>
      <ModalAlert />
      <ModalBookPlan />
      <ModalMyPage />
      <ModalNotice />
      <ModalTrackingPlan />
    </>
  );
};

export default ModalManager;
