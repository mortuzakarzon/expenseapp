import React from "react";
import "../resources/default-layout.css";
import { useNavigate } from "react-router-dom";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';


function DefaultLayout(props) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("go-money-user"));
  const items = [
    {
      key: '1',
      label: (
        <li onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("go-money-user");
          navigate("/login");
        }}> Logout</li>
      ),
    }
  ];


  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">
            Go Money
          </h1>
        </div>
        <div className="username">

          <Dropdown
            menu={{
              items,
            }}
            placement="topLeft"
          >
            <li onClick={(e) => e.preventDefault()}>
              <Space>
                {user.name}
                <DownOutlined />
              </Space>
            </li>

          </Dropdown>


        </div>
      </div>

      <div className="content">
        {props.children}
      </div>

    </div>
  );
}

export default DefaultLayout;