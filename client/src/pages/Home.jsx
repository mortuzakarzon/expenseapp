import React from "react";
import axios from "axios";
import { useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import "../resources/transactions.css";

function Home() {

  const getData = async () => {
    try {
      const response = await axios.post("/api/users/get-info-by-id", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
    } catch (error) {

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
          <button className="primary"> ADD NEW </button>
        </div>

      </div>

      <div className="table-analytics">

      </div>



    </DefaultLayout>
  );
}

export default Home;
