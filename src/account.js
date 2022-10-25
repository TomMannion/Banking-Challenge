class Account {
  constructor(type, balance) {
    this.type = type;
    this.transactions = [];
    this.balance = balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

module.exports = Account;
