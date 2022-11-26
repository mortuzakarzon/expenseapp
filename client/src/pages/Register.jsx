import React from "react";
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import{toast} from "react-hot-toast";

function Register() {
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
 
          const response = await axios.post("/api/users/register", values);

          if (response.data.success) {
            toast.success(response.data.message);
            navigate("/login");
          } else {
            toast.error(response.data.message);
          }
    
    
    
        } catch (error) {

          console.log(error);
        }
      }


    return (
        <div className="App">
            <Form name="basic" className="reg-form p-4" onFinish={onFinish} autoComplete="on" layout="vertical">
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Name!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="email"
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
                        Register
                    </Button>
                </Form.Item>
                <Link to="/login">Already Register? Please login</Link>
            </Form>

        </div>
    );
}

export default Register;
