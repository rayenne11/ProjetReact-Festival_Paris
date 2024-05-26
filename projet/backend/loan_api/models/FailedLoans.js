import { model, Schema } from "mongoose";

const FailedLoanSchema = Schema({
  clientId: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
});

export default model("FailedLoan", FailedLoanSchema);
