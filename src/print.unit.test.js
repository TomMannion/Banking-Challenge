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
});
