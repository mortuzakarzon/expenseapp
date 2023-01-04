import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from 'antd';
import axios from "axios";
import { toast } from "react-hot-toast";
import Spinner from "./Spinner";

function AddEditTransaction({
    setShowEditTransactionModel,
    showEditTransactionModel,
    selectedItemForEdit,
    setSelectedItemForEdit,
    getTransaction
}) {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("go-money-user"));
    const [form] = Form.useForm();

    // populate form with selected item values if in edit mode
    useEffect(() => {
        if (selectedItemForEdit) {
            form.setFieldsValue({
                amount: selectedItemForEdit.amount,
                type: selectedItemForEdit.type,
                category: selectedItemForEdit.category,
                date: selectedItemForEdit.date,
                references: selectedItemForEdit.references
            });
        }
    }, [selectedItemForEdit, form]);

    const onFinish = async values => {
        try {
          setLoading(true);
      
          // determine whether to make POST request to add or edit transaction endpoint
          const url = selectedItemForEdit
            ? "/api/transactions/edit-transaction"
            : "/api/transactions/add-transaction";
          // determine payload based on whether we are in edit mode
          const payload = selectedItemForEdit
            ? {
                payload: { ...values, userid: user._id },
                transactionId: selectedItemForEdit._id
              }
            : { ...values, userid: user._id };
      
          const response = await axios.post(url, payload);
          setLoading(true);
      
          // show success or error message based on response from server
          if (response.data.success) {
            getTransaction();
            toast.success(response.data.message);
            setShowEditTransactionModel(false);
            setSelectedItemForEdit(null);
            setLoading(false);
          } else {
            setLoading(false);
            toast.error(response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
    return (
        <Modal
            title={selectedItemForEdit ? "Edit Transaction" : "Add Transaction"}
            open={showEditTransactionModel}
            setOpen={setShowEditTransactionModel}
            onCancel={() => {
                setShowEditTransactionModel(false);
            }}
            footer={false}
        >
            {loading && <Spinner />}
            <Form layout="vertical" form={form} onFinish={onFinish}>
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
                >
                    <Select>
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
                >
                    <Select>
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
                <div className="d-flex justify-content-end">
                    <button className="primary saveButton" type="submit">
                        SAVE{" "}
                    </button>
                </div>
            </Form>
        </Modal>
    );
}

export default AddEditTransaction;