class Transaction {
  constructor(type, amount) {
    this.error = null;
    this.date = new Date();
    this.type = type;
    this.amount = amount;
    this.balance = 0;
  }
}

module.exports = Transaction;
