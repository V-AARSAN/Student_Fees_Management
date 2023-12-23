import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";


export default function Header(){

    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/welcome" element={<Welcome/>}/>
               
            </Routes>
        </BrowserRouter>
        </>
    )
}