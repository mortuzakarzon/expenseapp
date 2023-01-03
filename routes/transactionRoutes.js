const express = require("express");
const Transaction = require("../models/transaction");
const router = express.Router();
const moment = require("moment");
moment().format();

router.post("/add-transaction", async (req, res) => {

    try {
        const newTransaction = new Transaction(req.body);
        await newTransaction.save();
        res.send({ message: "Transaction Successfull", success: true });
    } catch (error) {
        return res.status(200).send({
            message: " Not Successfull",
            success: false
        })
    }
});



router.post("/edit-transaction", async (req, res) => {

    try {
        await Transaction.findByIdAndUpdate({_id: req.body.transactionId}, req.body.payload)
    
        res.send({ message: "Transaction Updated Successfull", success: true });
    } catch (error) {
        return res.status(200).send({
            message: " Not Successfull",
            success: false
        })
    }
});



router.post("/delete-transaction", async (req, res) => {

    try {
        await Transaction.findByIdAndDelete({_id: req.body.transactionId})
    
        res.send({ message: "Transaction Deleted Successfull", success: true });
    } catch (error) {
        return res.status(200).send({
            message: " Not Successfull",
            success: false
        })
    }
});


router.post("/get-all-transaction", async (req, res) => {
    const { frequency, selectedRange, type } = req.body;
    try {
        const transactions = await Transaction.find({

            ...(frequency !== "custom"
                ?
                {
                    date: {
                        $gt: moment().subtract(Number(req.body.frequency), "d").toDate(),
                    },
                }
                : {
                    date: {
                        $gte: selectedRange[0],
                        $lte: selectedRange[1],
                      },
                }),
            userid: req.body.userid,
            ...(type !== "all" && {type})
        });
        res.send(transactions)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;