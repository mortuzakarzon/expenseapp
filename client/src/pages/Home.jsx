import React from "react";
import axios from "axios";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import { useState } from "react";
import { Modal } from "antd";
import { Form, Input, Select } from 'antd';

function Home() {
  const [showEditTransactionModel, setShowEditTransactionModel] = useState(false);
  
  const onFinish = (values) => {
    console.log(values);
  }
  
  const getData = async () => {
    try {
      const response = await axios.post("/api/users/get-info-by-id", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <DefaultLayout>
      <div className="filter d-flex justify-content-between align-items-center">
        <div>

        </div>

        <div>
          <button className="primary addButton" onClick={() => { setShowEditTransactionModel(true) }}>
            ADD NEW
          </button>
        </div>

      </div>

      <div className="table-analytics">

      </div>

      <Modal
        title="Add Transaction"
        open={showEditTransactionModel}
        setOpen={setShowEditTransactionModel}
        onCancel={() => {
          setShowEditTransactionModel(false)
        }}
        footer={false}
      >

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
      </Modal>



    </DefaultLayout>
  );
}

export default Home;
