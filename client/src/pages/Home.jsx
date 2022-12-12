import React from "react";
import axios from "axios";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import { useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";
import Spinner from "../components/Spinner";
import { Table } from "antd";

function Home() {
  const [loading, setLoading] = useState(false);
  const [showEditTransactionModel, setShowEditTransactionModel] = useState(false);
  const [transationData, setTransactionData]= useState([]);

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

  const getTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("go-money-user"));
      setLoading(true);
      const response = await axios.post("/api/transactions/get-all-transaction", { userid: user._id });
      console.log(response.data);
      setTransactionData(response.data);
      setLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getTransaction();
  }, []);


  const columns = [
    {
      title: "Date",
      dataIndex: "date"
    },
    {
      title: "Amount",
      dataIndex: "amount"
    },
    {
      title: "Category",
      dataIndex: "category"
    },
    {
      title: "References",
      dataIndex: "references"
    },
  ]


  return (
    <DefaultLayout>
      {loading && <Spinner />}
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
        <div className="table">
          <Table columns={columns} dataSource={transationData} bordered  />
        </div>
      </div>

      <div>
        {showEditTransactionModel && (<AddEditTransaction
          showEditTransactionModel={showEditTransactionModel}
          setShowEditTransactionModel={setShowEditTransactionModel}
          getTransaction={getTransaction}
        />)

        }

      </div>


    </DefaultLayout>
  );
}

export default Home;
