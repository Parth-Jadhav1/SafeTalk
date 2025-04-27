import React, { useEffect, useState } from "react";
import Home from "./Home";
import Login from "./Login";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import '../index.css';


function Routing_App(){

    const [isLoggedIn, setisLoggedIn]=useState(true);
    const [user, setUser]= useState(null)

    
    return<>
    <Routes>
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Home setisLoggedIn={setisLoggedIn}></Home></ProtectedRoute>}></Route>

        <Route path="/:uniqueId" element={<ProtectedRoute isLoggedIn={isLoggedIn}> <Home></Home></ProtectedRoute>}></Route>

        <Route path="/login" element={<Login setisLoggedIn={setisLoggedIn} isLoggedIn={isLoggedIn}></Login>}></Route>

    </Routes>

    </>
}


export default Routing_App;