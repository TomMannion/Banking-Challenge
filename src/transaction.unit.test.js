const Transaction = require("./transaction");

describe("Transaction", () => {
  it("should be an instance of Transaction", () => {
    expect(new Transaction()).toBeInstanceOf(Transaction);
  });
  it("should have a error property", () => {
    expect(new Transaction().error).toBe(null);
  });
  it("should have a date property", () => {
    const transaction = new Transaction("add", 100);
    expect(transaction.date).toBeInstanceOf(Date);
  });
  it("should have a type property", () => {
    const transaction = new Transaction("add", 100);
    expect(transaction.type).toBe("add");
  });
  it("should have an amount property", () => {
    const transaction = new Transaction("add", 100);
    expect(transaction.amount).toBe(100);
  });
  it("should have a balance property", () => {
    const transaction = new Transaction("add", 100);
    expect(transaction.balance).toBe(0);
  });
});
