class Account {
  constructor(type, balance) {
    this.type = type;
    this.transactions = [];
    this.balance = balance;
  }
}

module.exports = Account;
