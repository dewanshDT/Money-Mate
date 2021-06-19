const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema([
  {
    username: String,
    data: [
      {
        description: String,
        amount: Number,
      },
    ],
  },
]);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
