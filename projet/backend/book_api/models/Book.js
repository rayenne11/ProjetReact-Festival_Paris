import { model, Schema } from "mongoose";

const BookSchema = new Schema({
  code: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  author: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  
});

export default model("book", BookSchema);
