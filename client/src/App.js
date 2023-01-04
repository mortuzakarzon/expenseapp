import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <div className="App">
      {/* toaster component */}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      {/* browser router component */}
      <BrowserRouter>
        {/* routes component */}
        <Routes>
          {/* home route */}
          <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
          {/* login route */}
          <Route path="/login" element={<Login />} />
          {/* register route */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// protected route component
export function ProtectedRoute(props){
  // check if token exists in local storage
  if(localStorage.getItem("token")){
    // render protected route content
    return props.children;
  } else{
    // redirect to login if token does not exist
    return <Navigate to="/login" />
  }
}

// public route component
export function PublicRoute(props){
  // check if token exists in local storage
  if(localStorage.getItem("token")){
    // redirect to home if token exists
    return <Navigate to="/" />
  } else{
    // render public route content
    return props.children;
  }
}

export default App;
