class TransactionLayer {
  // Handle the transaction logic
  makeTransaction(account, transaction) {
    try {
      if (transaction.type === "deposit") {
        this.#deposit(account, transaction.amount);
      } else if (transaction.type === "withdrawal") {
        this.#withdrawal(account, transaction.amount);
      } else {
        this.#invalidTransactionType();
      }
    } catch (error) {
      transaction.error = error;
    }
    return account;
  }
  // Functions to be used in makeTransaction
  #deposit(account, amount) {
    account.balance += amount;
  }
  #withdrawal(account, amount) {
    if (account.balance - amount < 0) {
      throw new Error("Insufficient funds");
    } else {
      account.balance -= amount;
    }
  }
  #invalidTransactionType() {
    throw new Error("Invalid transaction type");
  }
}

module.exports = TransactionLayer;
