import React from "react";

const Account = ({ transactions }) => {
  const totalAccountBalance = transactions.reduce((acc, transaction) => {
    if (transaction.type === "income") {
      return acc + transaction.amount;
    } else if (transaction.type === "expense") {
      return acc - transaction.amount;
    }
    return acc;
  }, 0);

  return (
    <div className="transaction-counter">
      <h1>Total Account Balance Changed: ${totalAccountBalance}</h1>
    </div>
  );
};

export default Account;