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



router.post("/get-all-transaction", async (req, res) => {
    const { frequency, selectedRange } = req.body;
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
        });
        res.send(transactions)
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;