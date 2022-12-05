import React from "react";
import "../resources/default-layout.css";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import { useNavigate } from "react-router-dom";

function DefaultLayout(props) {
  const navigate =useNavigate();
  const user = JSON.parse(localStorage.getItem("go-money-user"));
  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <li onClick={()=>{
              localStorage.removeItem("token");
              localStorage.removeItem("go-money-user");
              navigate("/login");
            }}> logout</li>
          ),
        },
      ]}
    />
  );


  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">
            Go Money
          </h1>
        </div>
        <div className="username">

          <Dropdown overlay={menu}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {user.name}
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>

        </div>
      </div>

      <div className="content">

      </div>

    </div>
  );
}

export default DefaultLayout;