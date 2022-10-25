class TransactionLayer {
  // Handle the transaction
  makeTransaction(account, transaction) {
    if (transaction.type === "deposit") {
      this.#deposit(account, transaction.amount);
    } else if (transaction.type === "withdrawal") {
      try {
        this.#withdrawal(account, transaction.amount);
      } catch (error) {
        transaction.error = error;
      }
    }
    // Set the current balance after the transaction as a record
    transaction.balance = account.balance;
    account.transactions.push(transaction);
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
}

module.exports = TransactionLayer;
