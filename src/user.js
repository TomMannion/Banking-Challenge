class User {
  constructor(firstName, lastName, birthday, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = new Date(birthday);
    this.accountKeys = {};
  }
  addAccount(accountType, key) {
    this.accountKeys[accountType] = key;
  }
}

module.exports = User;
