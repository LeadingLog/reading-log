import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router.tsx";
import ModalManager from "./components/modal/ModalManager.tsx";
import TooltipInfo from "./components/common/TooltipInfo.tsx";

function App() {
  return (
    <BrowserRouter>
      <ModalManager/>
      <Router/>
      <TooltipInfo />
    </BrowserRouter>
  );
}

export default App;
