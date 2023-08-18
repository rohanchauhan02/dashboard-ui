import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Home from "./Component/Home";

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
