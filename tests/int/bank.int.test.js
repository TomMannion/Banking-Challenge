const Bank = require("../../src/bank");
const Account = require("../../src/account");
const User = require("../../src/user");

describe("Bank", () => {
  const bank = new Bank();
  const user = new User("John", "Doe", "01/01/2022", "john@doe.com");
  const account = new Account("debit", 100);
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
  it("should find a user in the users hash", () => {
    expect(bank.findUser(1)).toEqual(user);
  });
  it("should find a account in the accounts hash", () => {
    const currentUser = bank.findUser(1);
    expect(bank.findAccount(currentUser.accountKeys["debit"])).toEqual(account);
  });
});
