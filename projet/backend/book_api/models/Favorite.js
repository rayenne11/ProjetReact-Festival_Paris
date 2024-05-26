import { model, Schema } from "mongoose";

const favoriteBookSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  clientId: {
    type: String,
    required: true,
  },
});

export default model("favoriteBook", favoriteBookSchema);
