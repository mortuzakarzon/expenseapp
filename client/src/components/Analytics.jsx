import React from "react";
import "../resources/analytics.css";
import { Progress, Space } from 'antd';


function Analytics({ transactions }) {
    const totalTransactions = transactions.length;
    const totalIncomTransactions = transactions.filter(transaction => transaction.type === "income");
    const totalExpenseTransactions = transactions.filter(transaction => transaction.type === "expense");
    const totalIncomeTransactionsPercentage = (totalIncomTransactions.length / totalTransactions) * 100;
    const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;

    const totalTurnOver = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnOver = transactions.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpenseTurnOver = transactions.filter(transaction => transaction.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnOver) * 100;
    const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnOver) * 100;




    return (
        <div className="analytics">

            <div className="row">
                <div className="col-md-4 mt-3">
                    <div className="transaction-counter">
                        <h5>Number of Income and expense</h5>
                        <hr />
                        <h6>Income: {totalIncomTransactions.length}</h6>
                        <h6>Expense: {totalExpenseTransactions.length}</h6>
                        <div className="progress-bars">
                            <Space wrap>
                                <Progress type="circle" percent={totalIncomeTransactionsPercentage.toFixed(0)} strokeColor={"green"} />
                                <Progress type="circle" percent={totalExpenseTransactionsPercentage.toFixed(0)} strokeColor={"red"} />
                            </Space>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mt-3">
                    <div className="transaction-counter">
                        <h5>Total Income and Expense</h5>
                        <hr />
                        <h6>Income: ${totalIncomeTurnOver}</h6>
                        <h6>Expense: ${totalExpenseTurnOver}</h6>
                        <div className="progress-bars">
                            <Space wrap>
                                <Progress type="circle" percent={totalIncomeTurnOverPercentage.toFixed(0)} strokeColor={"green"} />
                                <Progress type="circle" percent={totalExpenseTurnOverPercentage.toFixed(0)} strokeColor={"red"} />
                            </Space>
                        </div>
                    </div>
                </div>

        
                
            </div>

        </div>
    )

}


export default Analytics;