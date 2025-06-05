import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router.tsx";
import ModalManager from "./components/modal/ModalManager.tsx";

function App() {
  return (
    <BrowserRouter>
      <ModalManager/>
      <Router/>
    </BrowserRouter>
  );
}

export default App;
