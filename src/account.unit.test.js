const Account = require("./account");

describe("Account", () => {
  const account = new Account("debit", 0);
  it("should be an instance of Account", () => {
    expect(account).toBeInstanceOf(Account);
  });
  it("should have a type", () => {
    expect(account.type).toEqual("debit");
  });
  it("should have a balance property", () => {
    expect(account.balance).toBe(0);
  });
  it("should have a transaction property", () => {
    expect(account.transactions).toEqual([]);
  });
});
