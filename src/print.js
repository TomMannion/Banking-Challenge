class Print {
  bankStatement(account) {
    let statement = `date || credit || debit || balance || success`;
    account.transactions.reverse().forEach((transaction) => {
      let date = transaction.date.toLocaleString();
      let credit = transaction.type === "deposit" ? transaction.amount : "";
      let debit = transaction.type === "withdrawal" ? transaction.amount : "";
      let balance = transaction.balance;
      let success = transaction.error ? "false" : "true";
      statement += `\n${date} || ${credit} || ${debit} || ${balance} || ${success}`;
    });
    return statement;
  }
}

module.exports = Print;
