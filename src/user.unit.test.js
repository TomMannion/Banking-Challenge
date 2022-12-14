const User = require("./user");

describe("User", () => {
  const user = new User("John", "Doe", "01/01/2022", "john@does.com");
  it("should be an instance of User", () => {
    expect(user).toBeInstanceOf(User);
  });
  it("should have a account id property", () => {
    expect(user.accountId).toBe(0);
  });
  it("should set an id", () => {
    user.accountId = 1;
    expect(user.accountId).toBe(1);
  });
  it("should have a firstName property", () => {
    expect(user.firstName).toBe("John");
  });
  it("should have a lastName property", () => {
    expect(user.lastName).toBe("Doe");
  });
  it("should convert the date into a date object", () => {
    expect(user.birthday).toBeInstanceOf(Date);
  });
  it("should have a birthday property", () => {
    expect(user.birthday).toEqual(new Date("01/01/2022"));
  });
  it("should have an email property", () => {
    expect(user.email).toBe("john@does.com");
  });
  it("should contain an accounts hash", () => {
    expect(user.accountKeys).toEqual({});
  });
});
