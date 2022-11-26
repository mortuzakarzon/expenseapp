const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on("error", ()=>{
    console.log("Error connecting Database");
});

connection.on("connected", () => {
    console.log("Databasse connected successfully")
});

module.exports= mongoose;