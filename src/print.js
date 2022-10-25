class Print {
  bankStatement(account) {
    let statement = `date || credit || debit || balance || success`;
    account.transactions.reverse().forEach((transaction) => {
      let date = transaction.date.toLocaleString();
      let credit =
        transaction.type === "deposit" ? transaction.amount.toFixed(2) : "";
      let debit =
        transaction.type === "withdrawal" ? transaction.amount.toFixed(2) : "";
      let balance = transaction.balance.toFixed(2);
      let success = transaction.error ? "false" : "true";
      statement += `\n${date} || ${credit} || ${debit} || ${balance} || ${success}`;
    });
    return statement;
  }
}

module.exports = Print;
