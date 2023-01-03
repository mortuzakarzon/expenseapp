import React from "react";
import axios from "axios";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import { useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import { Select, Table, DatePicker, Space } from "antd";
import moment from "moment";
import { TableOutlined, FundOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Analytics from "../components/Analytics";
import Account from "../components/Account";
import { toast } from "react-hot-toast";

const { RangePicker } = DatePicker;

function Home() {

  const [loading, setLoading] = useState(false);
  const [showEditTransactionModel, setShowEditTransactionModel] =
    useState(false);
  const [transationData, setTransactionData] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [type, setType] = useState("all");
  const [selectedRange, setSelectedRange] = useState([]);
  const [viewType, setViewType] = useState("table");
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/users/get-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTransaction = async () => {
    try {

      const user = JSON.parse(localStorage.getItem("go-money-user"));
      
      setLoading(true);
      const response = await axios.post(
        "/api/transactions/get-all-transaction",
        {
          userid: user._id,
          frequency,
          ...(frequency === "custom" && { selectedRange }),
          type,
    
        }
      );
      console.log(response.data);
      setTransactionData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTransaction = async (record) => {
    try {

      setLoading(true);
      const response = await axios.post(
        "/api/transactions/delete-transaction",
        {
          transactionId : record._id
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        getTransaction();
        setLoading(false);

    } else {
        setLoading(false);
        toast.error(response.data.message);
    }

    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getTransaction();
  }, [frequency, selectedRange, type]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (date) => <label>{moment(date).format("MM-DD-YYYY")}</label>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
        {
      title: "References",
      dataIndex: "references",
    },
    {
      title: "Actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined onClick={() => {
              setSelectedItemForEdit(record);
              setShowEditTransactionModel(true)
            }}/>
            <DeleteOutlined className="mx-3" onClick={() => deleteTransaction(record)}/>
          </div>
        )
      }
    }
  ];


  return (
    <DefaultLayout>
      {loading && <Spinner />}
      <div className="filter d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h6>Seclect Frequency</h6>
            <Select value={frequency} onChange={(value) => setFrequency(value)}>
              <Select.Option value="7"> Last 1 Week</Select.Option>
              <Select.Option value="30"> Last 1 Month</Select.Option>
              <Select.Option value="365"> Last 1 Year</Select.Option>
              <Select.Option value="custom"> Custom </Select.Option>
            </Select>
          </div>

          {frequency === "custom" && (
            <div className="mt-4">
              <Space direction="horizontal" size={18}>
                <RangePicker
                  value={selectedRange}
                  onChange={(values) => setSelectedRange(values)}
                />
              </Space>
            </div>
          )}

          <div className="d-flex flex-column mx-5">
            <h6>Seclect Type</h6>
            <Select value={type} onChange={(value) => setType(value)}>
              <Select.Option value="all"> All</Select.Option>
              <Select.Option value="income"> Income</Select.Option>
              <Select.Option value="expense"> Expense</Select.Option>
            </Select>
          </div>

 
        </div>

        <div className="d-flex">
          <button
            className="primary addButton"
            onClick={() => {
              setShowEditTransactionModel(true);
            }}
          >
            ADD NEW
          </button>
          <div className="view-switch mx-2">
            <TableOutlined
              className={`mx-1 ${viewType === "table" ? "active-icon" : "inactive-icon"
                } `}
              onClick={() => setViewType("table")}
              size={30}
            />
            <FundOutlined
              className={`mx-1 ${viewType === "analytics" ? "active-icon" : "inactive-icon"
                } `}
              onClick={() => setViewType("analytics")}
              size={30}
            />

            <AreaChartOutlined  
              className={`mx-1 ${viewType === "account" ? "active-icon" : "inactive-icon"
                } `}
              onClick={() => setViewType("account")}
              size={30}
            />
          </div>


        </div>
      </div>

      <div className="table-analytics">
        {(viewType === "table") ? (
          <div className="table">
            <Table columns={columns} dataSource={transationData} bordered />
          </div>
        ) : ((viewType === "analytics") ? <Analytics transactions={transationData} /> : (<Account transactions={transationData}/>))}
      </div>

      <div>
        {showEditTransactionModel && (
          <AddEditTransaction
            showEditTransactionModel={showEditTransactionModel}
            setShowEditTransactionModel={setShowEditTransactionModel}
            selectedItemForEdit = {selectedItemForEdit}
            getTransaction={getTransaction}
            setSelectedItemForEdit = {setSelectedItemForEdit}
          />
        )}
      </div>
    </DefaultLayout>
  );
}

export default Home;
