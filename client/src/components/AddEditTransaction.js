import React, { useState } from "react";
import { Modal } from "antd";
import { Form, Input, Select } from 'antd';
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";

function AddEditTransaction({setShowEditTransactionModel, showEditTransactionModel}) {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("go-money-user"))
        const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/transactions/add-transaction", {...values, userid: user._id});
            setLoading(true);
            if (response.data.success) {
                toast.success(response.data.message);
                setShowEditTransactionModel(false);
                setLoading(false);
                
            } else {
                setLoading(false);
                toast.error(response.data.message);
            }



        } catch (error) {

            console.log(error);
        }
    }

    return (<Modal
        title="Add Transaction"
        open={showEditTransactionModel}
        setOpen={setShowEditTransactionModel}
        onCancel={() => {
            setShowEditTransactionModel(false)
        }}
        footer={false}
    >
        {loading && <Spinner />}

        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input type="text" />
            </Form.Item>
            <Form.Item
                label="Type"
                name="type"
                rules={[
                    {
                        required: true,
                    },
                ]}
            ><Select>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense">Expense</Select.Option>

                </Select>

            </Form.Item>
            <Form.Item
                label="Category"
                name="category"
                rules={[
                    {
                        required: true,
                    },
                ]}
            ><Select>
                    <Select.Option value="salary">Salary</Select.Option>
                    <Select.Option value="freelance">Freelance</Select.Option>
                    <Select.Option value="otherIncome">Other Income</Select.Option>
                    <Select.Option value="rent">Rent</Select.Option>
                    <Select.Option value="food">Food</Select.Option>
                    <Select.Option value="entertainment">Entertainment</Select.Option>
                    <Select.Option value="otherExpense">Other Expense</Select.Option>
                </Select>

            </Form.Item>

            <Form.Item
                label="Date"
                name="date"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input type="date" />
            </Form.Item>

            <Form.Item label="References" name="references">
                <Input type="text" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Input type="text" />
            </Form.Item>

            <div className="d-flex justify-content-end">

                <button className="primary saveButton" type="submit">SAVE </button>
            </div>
        </Form>
    </Modal>)
}


export default AddEditTransaction;







