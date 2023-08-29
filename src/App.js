

import { Routes } from "./routes/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function App() {
  return (
    <div >
      <Routes/>
      <ToastContainer/>
    </div>
  );
}

export default App;
