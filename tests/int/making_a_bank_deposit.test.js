const Bank = require("../../src/bank");
const User = require("../../src/user");
const Account = require("../../src/account");
const Transaction = require("../../src/transaction");
const TransactionLayer = require("../../src/transactionLayer");

describe("Bank", () => {
  let bank = new Bank();
  const transactionLayer = new TransactionLayer();
  const user = new User("John", "Doe", "01/01/2022", "john@doe.com");
  let account = new Account("debit", 100);
  it("should be an instance of Bank", () => {
    expect(bank).toBeInstanceOf(Bank);
  });
  it("should add a user to the users hash", () => {
    bank.addUser(user);
    expect(bank.users).toEqual({ 1: user });
  });
  it("should add an account to the accounts hash", () => {
    bank.addAccount(account, user);
    expect(bank.accounts).toEqual({ 1: account });
  });
  it("should update an account balance with a deposit", () => {
    const transaction = new Transaction("deposit", 100);
    let currentAccount = bank.findAccount(1);
    transactionLayer.makeTransaction(currentAccount, transaction);
    transaction.setBalance(currentAccount.balance);
    account.addTransaction(transaction);
    bank.updateAccount(currentAccount);
    expect(bank.accounts[1].balance).toEqual(200);
  });
  it("should update an account balance with a withdrawal", () => {
    const transaction = new Transaction("withdrawal", 100);
    let currentAccount = bank.findAccount(1);
    transactionLayer.makeTransaction(currentAccount, transaction);
    transaction.setBalance(currentAccount.balance);
    account.addTransaction(transaction);
    bank.updateAccount(currentAccount);
    expect(bank.accounts[1].balance).toEqual(100);
  });
  it("should not make a withdrawal if there are insufficient funds", () => {
    const transaction = new Transaction("withdrawal", 101);
    let currentAccount = bank.findAccount(1);
    transactionLayer.makeTransaction(currentAccount, transaction);
    transaction.setBalance(currentAccount.balance);
    account.addTransaction(transaction);
    bank.updateAccount(currentAccount);
    expect(bank.accounts[1].balance).toEqual(100);
    // test the 3rd transaction in the account's transaction history for the error
    expect(bank.findAccount(1).transactions[2].error).toEqual(
      new Error("Insufficient funds")
    );
  });
  it("should not change the balance if the transaction is invalid", () => {
    const transaction = new Transaction("fake transaction", 100);
    let currentAccount = bank.findAccount(1);
    transactionLayer.makeTransaction(currentAccount, transaction);
    transaction.setBalance(currentAccount.balance);
    account.addTransaction(transaction);
    bank.updateAccount(currentAccount);
    expect(bank.accounts[1].balance).toEqual(100);
  });
});
