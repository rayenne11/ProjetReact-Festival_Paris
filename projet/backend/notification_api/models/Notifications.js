import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  from: {
    type: String,
    default: "BooksHub",
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
