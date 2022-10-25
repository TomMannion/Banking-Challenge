const Bank = require("./src/bank");
const User = require("./src/user");
const Account = require("./src/account");
const Transaction = require("./src/transaction");
const TransactionLayer = require("./src/transactionLayer");
const Print = require("./src/print");

let bank = new Bank();
const transactionLayer = new TransactionLayer();
const user = new User("John", "Doe", "01/01/2022", "john@does.com");
let account = new Account("debit", 100);

// John signs up for a bank account
bank.addUser(user);

// John opens a debit account
bank.addAccount(account, user);

// access the user
let johnsAccount = bank.findUser(1);
// access johns debit account
let debitAccount = bank.findAccount(johnsAccount.accountKeys["debit"]);

// John makes a deposit
// initialize a transaction
const transactionOne = new Transaction("deposit", 100);
// make the transaction and reflect that in the account
bank.updateAccount(
  johnsAccount.accoundId,
  transactionLayer.makeTransaction(debitAccount, transactionOne)
);

if (debitAccount.balance === 200) {
  console.log("Test passed");
}

// access johns debit account
debitAccount = bank.findAccount(johnsAccount.accountKeys["debit"]);

// John makes a withdrawal
// initialize a transaction
const transactionTwo = new Transaction("withdrawal", 100);
// make the transaction and reflect that in the account
bank.updateAccount(
  johnsAccount.accoundId,
  transactionLayer.makeTransaction(debitAccount, transactionTwo)
);

if (debitAccount.balance === 100) {
  console.log("Test passed");
}

// access johns debit account
debitAccount = bank.findAccount(johnsAccount.accountKeys["debit"]);

// John makes a withdrawal that exceeds his balance
// initialize a transaction
const transactionThree = new Transaction("withdrawal", 201);
// make the transaction and reflect that in the account
bank.updateAccount(
  johnsAccount.accoundId,
  transactionLayer.makeTransaction(debitAccount, transactionThree)
);

if (debitAccount.balance === 100) {
  console.log("Test passed");
}

// access johns debit account
debitAccount = bank.findAccount(johnsAccount.accountKeys["debit"]);

// print the account statement
const print = new Print();
console.log(print.bankStatement(debitAccount));
