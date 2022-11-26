import React from "react";
import axios from "axios";
import { useEffect } from "react";

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
    <div className="App">
      Home

    </div>
  );
}

export default Home;
