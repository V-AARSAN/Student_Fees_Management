import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin  from "./Component/Admin";
import Manage from "./Component/Manage";
import Add from "./Component/Add";
export default function App() {
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Admin />} />
        <Route  path="/manage" element={<Manage />} />
        <Route  path="/add" element={<Add />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}


