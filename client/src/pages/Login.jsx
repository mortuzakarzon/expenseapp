import React, { useEffect } from "react";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Spinner from "../components/Spinner";


function Login() {

const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async(values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
   
      if (response.data.success) {
          toast.success(response.data.message);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem(
            "go-money-user",
            JSON.stringify({ ...response.data.user})
          );
          setLoading(false);
          navigate("/");
      } else {
        setLoading(false);
          toast.error(response.data.message);
      }
  } catch (error) {
      console.log(error);
  }

  };
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  });

  return (
    <div className="login-register">
      {loading && <Spinner />}
      <Form name="basic" className="reg-form p-4" onFinish={onFinish} autoComplete="on" layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        <Link to="/register">Register First!</Link>
      </Form>

    </div>
  );
}

export default Login;
