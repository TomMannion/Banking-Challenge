const TransactionLayer = require("./transactionLayer");

describe("TransactionLayer", () => {
  it("should be an instance of TransactionLayer", () => {
    expect(new TransactionLayer()).toBeInstanceOf(TransactionLayer);
  });
  it("should have a method to add a transaction", () => {
    const transactionLayer = new TransactionLayer();
    expect(transactionLayer.makeTransaction).toBeInstanceOf(Function);
  });
  it("should return the account", () => {
    const transactionLayer = new TransactionLayer();
    const account = { balance: 0, transactions: [] };
    const transaction = { type: "deposit", amount: 100 };
    expect(transactionLayer.makeTransaction(account, transaction)).toEqual(
      account
    );
  });
  it("should handle a deposit", () => {
    const account = { transactions: [], balance: 0 };
    const transaction = { type: "deposit", amount: 100 };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    expect(transaction.balance).toBe(100);
    expect(account.balance).toBe(100);
  });
  it("should handle a withdrawal", () => {
    const account = { transactions: [], balance: 100 };
    const transaction = { type: "withdrawal", amount: 100 };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    expect(transaction.balance).toBe(0);
    expect(account.balance).toBe(0);
  });
  it("should throw an error if there are insufficient funds", () => {
    const account = { transactions: [], balance: 0 };
    const transaction = { error: null, type: "withdrawal", amount: 100 };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    expect(transaction.balance).toBe(0);
    expect(account.balance).toBe(0);
    expect(transaction.error).toBeInstanceOf(Error);
  });
  it("should add the transaction to the account", () => {
    const account = { transactions: [], balance: 0 };
    const transaction = { type: "deposit", amount: 100 };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    expect(account.transactions).toEqual([transaction]);
  });
});
