const Account = require("../../src/account");
const Transaction = require("../../src/transaction");
const TransactionLayer = require("../../src/transactionLayer");

describe("Account", () => {
  const account = new Account("debit", 0);
  const transactionLayer = new TransactionLayer();
  it("should be an instance of Account", () => {
    expect(new Account()).toBeInstanceOf(Account);
  });
  it("should make a deposit", () => {
    const transaction = new Transaction("deposit", 100);
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(account.balance);
    account.addTransaction(transaction);
    expect(account.balance).toBe(100);
  });
  it("should make a withdrawal", () => {
    const transaction = new Transaction("withdrawal", 50.25);
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(account.balance);
    account.addTransaction(transaction);
    expect(account.balance).toBe(49.75);
  });
  it("should not make a withdrawal if there are insufficient funds", () => {
    const transaction = new Transaction("withdrawal", 100.0);
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(account.balance);
    account.addTransaction(transaction);
    expect(account.balance).toBe(49.75);
    expect(transaction.error).toEqual(new Error("Insufficient funds"));
  });
  it("should have a transaction history", () => {
    expect(account.transactions.length).toBe(3);
  });
});
