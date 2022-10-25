const Print = require("./print");

describe("Print", () => {
  it("should be an instance of Print", () => {
    expect(new Print()).toBeInstanceOf(Print);
  });
  it("should have a method to print a bank statement", () => {
    const print = new Print();
    expect(print.bankStatement).toBeInstanceOf(Function);
  });
  it("should print a bank statement", () => {
    const account = {
      transactions: [
        {
          date: new Date(),
          type: "deposit",
          amount: 100,
          balance: 100,
          error: null,
        },
      ],
      balance: 100,
    };
    const print = new Print();
    expect(print.bankStatement(account)).toEqual(
      `date || credit || debit || balance || success\n${account.transactions[0].date.toLocaleString()} || 100 ||  || 100 || true`
    );
  });
  it("should print a bank statement with multiple transactions", () => {
    const account = {
      transactions: [
        {
          date: new Date(),
          type: "deposit",
          amount: 100,
          balance: 100,
          error: null,
        },
        {
          date: new Date(),
          type: "withdrawal",
          amount: 50,
          balance: 50,
          error: null,
        },
      ],
      balance: 50,
    };
    const print = new Print();
    expect(print.bankStatement(account)).toEqual(
      `date || credit || debit || balance || success\n${account.transactions[1].date.toLocaleString()} ||  || 50 || 50 || true\n${account.transactions[0].date.toLocaleString()} || 100 ||  || 100 || true`
    );
  });
  it("should print a bank statement with multiple transactions and errors", () => {
    const account = {
      transactions: [
        {
          date: new Date(),
          type: "deposit",
          amount: 100,
          balance: 100,
          error: null,
        },
        {
          date: new Date(),
          type: "withdrawal",
          amount: 50,
          balance: 50,
          error: null,
        },
        {
          date: new Date(),
          type: "withdrawal",
          amount: 100,
          balance: 50,
          error: new Error("Insufficient funds"),
        },
      ],
      balance: 50,
    };
    const print = new Print();
    expect(print.bankStatement(account)).toEqual(
      `date || credit || debit || balance || success\n${account.transactions[2].date.toLocaleString()} ||  || 100 || 50 || false\n${account.transactions[1].date.toLocaleString()} ||  || 50 || 50 || true\n${account.transactions[0].date.toLocaleString()} || 100 ||  || 100 || true`
    );
  });
});
