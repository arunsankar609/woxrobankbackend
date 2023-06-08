import mongoose from "mongoose";

const statementSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  transferedTO: {
    type: String,
    required: false,
  },
});

const Statement = mongoose.model("Statement", statementSchema);

export default Statement
