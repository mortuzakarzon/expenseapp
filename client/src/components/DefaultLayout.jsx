import React from "react";
import "../resources/default-layout.css";

function DefaultLayout(props){
    const user = JSON.parse(localStorage.getItem("go-money-user"));
    
    return(
        <div className="layout">
            <div className="header d-flex justify-content-between align-items-center">
                <div>
                    <h1 className="logo">
                        Go Money
                    </h1>
                </div>
                <div className="username">
                   {user.name}
                </div>
            </div>
            
            <div className="content">
                
            </div>

        </div>
    );
}

export default DefaultLayout;