const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();



router.post("/add-transaction", async (req, res) => {

    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.send({message: "Transaction Successfull", success: true});
    } catch (error) {
        return res.status(200).send({
            message: " Not Successfull",
            success: false
        })
    }
});



router.post("/get-all-transaction", async(req, res) => {
    try {
        const transactions = await Transaction.find({userid: req.body.userid});
        res.send(transactions)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;