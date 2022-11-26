const express = require("express");
require("dotenv").config();
const dbconfig = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use("/api/users/", userRoute);








const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started Successfully at port ${port}`);
});