class Bank {
  constructor() {
    this.users = {};
    this.accounts = {};
  }

  // USER METHODS
  addUser(user) {
    user.accountId = Object.keys(this.users).length + 1;
    this.users[user.accountId] = user;
  }
  findUser(id) {
    return this.users[id];
  }

  // ACCOUNT METHODS
  addAccount(account, user) {
    const key = Object.keys(this.accounts).length + 1;
    this.users[user.accountId].accountKeys[account.type] = key;
    this.accounts[key] = account;
  }
  findAccount(key) {
    return this.accounts[key];
  }
  updateAccount(key, account) {
    this.accounts[key] = account;
  }
}

module.exports = Bank;
