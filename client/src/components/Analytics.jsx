import React from "react";
import "../resources/analytics.css";
import { Progress, Space } from 'antd';

// The Analytics component takes in a prop called 'transactions' which is an array of transaction objects
function Analytics({ transactions }) {
  // Calculate the total number of transactions
  const totalTransactions = transactions.length;

  // Filter the transactions array to get only the income transactions
  const totalIncomTransactions = transactions.filter(transaction => transaction.type === "income");

  // Filter the transactions array to get only the expense transactions
  const totalExpenseTransactions = transactions.filter(transaction => transaction.type === "expense");

  // Calculate the percentage of income transactions out of the total transactions
  const totalIncomeTransactionsPercentage = (totalIncomTransactions.length / totalTransactions) * 100;

  // Calculate the percentage of expense transactions out of the total transactions
  const totalExpenseTransactionsPercentage = (totalExpenseTransactions.length / totalTransactions) * 100;

  // Use the reduce function to get the total turnover (sum of all transaction amounts)
  const totalTurnOver = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

  // Use the filter function and the reduce function to get the total income turnover (sum of amounts of all income transactions)
  const totalIncomeTurnOver = transactions.filter(transaction => transaction.type === "income").reduce((acc, transaction) => acc + transaction.amount, 0);

  // Use the filter function and the reduce function to get the total expense turnover (sum of amounts of all expense transactions)
  const totalExpenseTurnOver = transactions.filter(transaction => transaction.type === "expense").reduce((acc, transaction) => acc + transaction.amount, 0);

  // Calculate the percentage of total income turnover out of the total turnover
  const totalIncomeTurnOverPercentage = (totalIncomeTurnOver / totalTurnOver) * 100;

  // Calculate the percentage of total expense turnover out of the total turnover
  const totalExpenseTurnOverPercentage = (totalExpenseTurnOver / totalTurnOver) * 100;




  return (
    <div className="analytics">
      {/* Display the calculated statistics in a row with two columns */}
      <div className="row">
        <div className="col-md-4 mt-3">
          {/* Display the number of income and expense transactions */}
          <div className="transaction-counter">
            <h5>Number of Income and expense</h5>
            <hr />
            <h6>Income: {totalIncomTransactions.length}</h6>
            <h6>Expense: {totalExpenseTransactions.length}</h6>
            {/* Display progress bars for the percentage of income and expense transactions */}
            <div className="progress-bars">
              <Space wrap>
                {/* Display a progress bar for income transactions, with the percentage value calculated above */}
                <Progress type="circle" percent={totalIncomeTransactionsPercentage.toFixed(0)} strokeColor={"green"} />
                {/* Display a progress bar for expense transactions, with the percentage value calculated above */}
                <Progress type="circle" percent={totalExpenseTransactionsPercentage.toFixed(0)} strokeColor={"red"} />
              </Space>
            </div>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          {/* Display the total income and expense turnover */}
          <div className="transaction-counter">
            <h5>Total Income and Expense</h5>
            <hr />
            <h6>Income: ${totalIncomeTurnOver}</h6>
            <h6>Expense: ${totalExpenseTurnOver}</h6>
            {/* Display progress bars for the percentage of total income and expense turnover */}
            <div className="progress-bars">
              <Space wrap>
                {/* Display a progress bar for total income turnover, with the percentage value calculated above */}
                <Progress type="circle" percent={totalIncomeTurnOverPercentage.toFixed(0)} strokeColor={"green"} />
                {/* Display a progress bar for total expense turnover, with the percentage value calculated above */}
                <Progress type="circle" percent={totalExpenseTurnOverPercentage.toFixed(0)} strokeColor={"red"} />
              </Space>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


// Export the Analytics component
export default Analytics;