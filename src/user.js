class User {
  constructor(firstName, lastName, birthday, email) {
    this.accountId = 0;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.birthday = new Date(birthday);
    this.accountKeys = {};
  }
}

module.exports = User;
