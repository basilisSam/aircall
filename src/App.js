import {  Routes, Route } from "react-router-dom";
import Home from "./componets/Home";
import Login from "./componets/Login";

function App() {
  return (
   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    
  );
}

export default App;
