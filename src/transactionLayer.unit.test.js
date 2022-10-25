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
    const transaction = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      type: "deposit",
      amount: 100,
      balance: 0,
    };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(transaction, account);
    expect(transaction.balance).toBe(100);
    expect(account.balance).toBe(100);
  });
  it("should handle a withdrawal", () => {
    const account = { transactions: [], balance: 100 };
    const transaction = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      type: "withdrawal",
      amount: 100,
      balance: 0,
    };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(transaction, account);
    expect(transaction.balance).toBe(0);
    expect(account.balance).toBe(0);
  });
  it("should throw an error if there are insufficient funds", () => {
    const account = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      transactions: [],
      balance: 0,
    };
    const transaction = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      error: null,
      type: "withdrawal",
      amount: 100,
      balance: 0,
    };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    transaction.setBalance(transaction, account);
    expect(transaction.balance).toBe(0);
    expect(account.balance).toBe(0);
    expect(transaction.error).toBeInstanceOf(Error);
    expect(transaction.error.message).toEqual("Insufficient funds");
  });
  it("should add the transaction to the account", () => {
    const account = {
      addTransaction: (transaction) => {
        account.transactions.push(transaction);
      },
      transactions: [],
      balance: 0,
    };
    const transaction = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      type: "deposit",
      amount: 100,
      balance: 0,
    };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    account.addTransaction(transaction);
    expect(account.transactions).toEqual([transaction]);
  });
  it("should throw an error if the transaction type is not recognised", () => {
    const account = {
      addTransaction: (transaction) => {
        account.transactions.push(transaction);
      },
      transactions: [],
      balance: 0,
    };
    const transaction = {
      setBalance: (transaction, account) =>
        (transaction.balance += account.balance),
      type: "not a transaction type",
      amount: 100,
      balance: 0,
    };
    const transactionLayer = new TransactionLayer();
    transactionLayer.makeTransaction(account, transaction);
    account.addTransaction(transaction);
    transaction.setBalance(transaction, account);
    expect(account.transactions).toEqual([transaction]);
    expect(transaction.balance).toBe(0);
    expect(transaction.error).toBeInstanceOf(Error);
    expect(transaction.error.message).toEqual("Invalid transaction type");
  });
});
