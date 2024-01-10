import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin  from "./Component/Admin";
import UserDetails from "./Component/UserDetails";

export default function App() {
 
  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<Admin />} />
        <Route  path="/user" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}


