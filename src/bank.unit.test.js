const Bank = require("./bank");

describe("Bank", () => {
  it("should be an instance of Bank", () => {
    const bank = new Bank();
    expect(bank).toBeInstanceOf(Bank);
  });
  it("should contain a users hash", () => {
    const bank = new Bank();
    expect(bank.users).toEqual({});
  });
  it("should have a method to add a user", () => {
    const bank = new Bank();
    expect(bank.addUser).toBeInstanceOf(Function);
  });
  it("should add a user to the users hash", () => {
    const bank = new Bank();
    const user = {
      accountId: 0,
      firstName: "John",
    };
    bank.addUser(user);
    expect(bank.users).toEqual({ 1: user });
  });
  it("should have a hash of accounts", () => {
    const bank = new Bank();
    expect(bank.accounts).toEqual({});
  });
  it("should have a method to add an account", () => {
    const bank = new Bank();
    expect(bank.addAccount).toBeInstanceOf(Function);
  });
  it("should add an account to the accounts hash", () => {
    const bank = new Bank();
    const user = { accountId: 0, firstName: "John", accountKeys: {} };
    bank.addUser(user);
    bank.addAccount(
      { type: "debit", balance: 100 },
      { accountId: 1, firstName: "John", accountKeys: {} }
    );
    expect(bank.accounts).toEqual({
      1: { type: "debit", balance: 100 },
    });
  });
  it("should have a method to find a account", () => {
    const bank = new Bank();
    expect(bank.findAccount).toBeInstanceOf(Function);
  });
  it("should find a account", () => {
    const bank = new Bank();
    const user = { accountId: 0, firstName: "John", accountKeys: {} };
    bank.addUser(user);
    bank.addAccount({ type: "debit", balance: 100 }, user);
    expect(bank.findAccount(1)).toEqual({ type: "debit", balance: 100 });
    expect(user.accountKeys).toEqual({ debit: 1 });
  });
  it("should have a method to find a user", () => {
    const bank = new Bank();
    expect(bank.findUser).toBeInstanceOf(Function);
  });
  it("should find a user in the users hash", () => {
    const bank = new Bank();
    bank.addUser({ accountId: 0, firstName: "John" });
    expect(bank.findUser(1)).toEqual({ accountId: 1, firstName: "John" });
  });
  it("should have a method to update the account", () => {
    const bank = new Bank();
    expect(bank.updateAccount).toBeInstanceOf(Function);
  });
  it("should update the account", () => {
    const bank = new Bank();
    const user = { accountId: 0, firstName: "John", accountKeys: {} };
    bank.addUser(user);
    bank.addAccount({ type: "debit", balance: 100 }, user);
    bank.updateAccount(1, { type: "debit", balance: 200 });
    expect(bank.findAccount(1)).toEqual({ type: "debit", balance: 200 });
  });
});
