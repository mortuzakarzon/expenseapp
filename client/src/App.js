import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div className="App">
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <ProtectedRoute> <Home /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}



export function ProtectedRoute(props){

  if(localStorage.getItem("token")){
    return props.children
  } else{
    return <Navigate to="login" />
  }

}

export function PublicRoute(props){

  if(localStorage.getItem("token")){
    return props.children
  } else{
    return <Navigate to="login" />
  }

}

export default App;
