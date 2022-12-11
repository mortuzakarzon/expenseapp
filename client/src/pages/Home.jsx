import React from "react";
import axios from "axios";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";
import { useState } from "react";
import AddEditTransaction from "../components/AddEditTransaction";

function Home() {
  const [showEditTransactionModel, setShowEditTransactionModel] = useState(false);

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

      {showEditTransactionModel && (<AddEditTransaction
        showEditTransactionModel={showEditTransactionModel} 
        setShowEditTransactionModel= {setShowEditTransactionModel}
        />)}





    </DefaultLayout>
  );
}

export default Home;
