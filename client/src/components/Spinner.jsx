import React from "react";
import "../resources/default-layout.css";
import { Spin } from 'antd';

// The Spinner component displays a loading spinner
function Spinner(props){
  // Return the JSX element that displays the loading spinner
  return(
    <div className="spinner">
      {/* The loading spinner from Ant Design */}
      <Spin />
    </div>
  );
}

// Export the Spinner component
export default Spinner;
