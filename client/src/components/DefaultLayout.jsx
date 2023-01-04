import React from "react";
import "../resources/default-layout.css";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

// The DefaultLayout component takes in a prop called 'props' which includes the JSX elements to be rendered as children
function DefaultLayout(props) {
  // Use the 'useNavigate' hook from 'react-router-dom' to allow navigation to different routes
  const navigate = useNavigate();
  // Get the user object from local storage
  const user = JSON.parse(localStorage.getItem("go-money-user"));
  // Define an array of menu items for the dropdown
  const items = [
    {
      key: '1',
      label: (
        // The logout menu item logs the user out and removes the token and user object from local storage
        <li className="logout" onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("go-money-user");
          navigate("/login");
        }}> Logout</li>
      ),
    }
  ];
  // Return the JSX element that displays the header with a logo and a dropdown menu with the logout option
  // and the children elements passed in as props
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">
            Go Money
          </h1>
        </div>
        <div className="username">
          {/* The dropdown menu with the logout option */}
          <Dropdown
            menu={{
              items,
            }}
            placement="topLeft"
          >
            <li onClick={(e) => e.preventDefault()}>
              <Space>
                {/* Display the user's name */}
                {user.name}
                {/* Display the dropdown icon */}
                <DownOutlined />
              </Space>
            </li>
          </Dropdown>
        </div>
      </div>
      {/* Render the children elements passed in as props */}
      <div className="content">
        {props.children}
      </div>
    </div>
  );
}

// Export the DefaultLayout component
export default DefaultLayout;
