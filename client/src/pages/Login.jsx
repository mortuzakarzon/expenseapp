import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import Spinner from "../components/Spinner";

function Login() {
  // state to track whether data is being fetched
  const [loading, setLoading] = useState(false);
  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // handles the submission of the login form
  const onFinish = async (values) => {
    try {
      setLoading(true);
      // send a POST request to the login endpoint with the form values
      const response = await axios.post("/api/users/login", values);

      // if the login is successful, save the token and user data in local storage,
      // display a success message, and navigate to the home page
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "go-money-user",
          JSON.stringify({ ...response.data.user })
        );
        setLoading(false);
        navigate("/");
      } else {
        // if the login fails, display an error message and hide the loading spinner
        setLoading(false);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // navigate to the home page if a token exists in local storage
  useEffect(() => {
    if(localStorage.getItem("token")){
      navigate("/");
    }
  }, [navigate]); // added empty dependency array to avoid infinite loop

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