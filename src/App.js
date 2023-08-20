import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import CompleteAssesment from "./Component/CompleteAssesment";
import Thanks from "./Component/Thanks";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/complete-assesment" element={<CompleteAssesment />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
