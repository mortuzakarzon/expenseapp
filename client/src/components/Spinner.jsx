import React from "react";
import "../resources/default-layout.css";
import { Spin } from 'antd';

function Spinner(props){
    return(
        <div className="spinner">
         <Spin />
        </div>
    );
}

export default Spinner;