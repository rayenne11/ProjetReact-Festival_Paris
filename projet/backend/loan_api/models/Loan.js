import { model, Schema } from "mongoose";

const LoanSchema = Schema({
  clientId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  loanDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  returnDate: {
    type: Date,
    default: null,
    required: true,
  },
});

export default model("loan", LoanSchema);
