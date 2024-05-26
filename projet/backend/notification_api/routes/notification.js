import { Router } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import Notification from "../models/Notifications.js";
import requireAuth from "../middleware/requireAuth.js";

dotenv.config();
const router = Router();

router.get("/", requireAuth, async (req, res) => {
  try {
    const notifs = await Notification.find({ to: req.client.email });

    // if (notifs.length == 0)
    //   return res
    //     .status(500)
    //     .json({ error: "could not find client notifications" });

    return res.status(200).json(notifs);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    auth: {
      user: process.env.NOTI_USER,
      pass: process.env.NOTI_PASS,
    },
  });

  const mailOptions = {
    from: "BooksHub",
    to: to,
    subject: subject,
    text: text,
  };

  // Send email
  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);

      // Save notification to database
      try {
        const notification = new Notification({
          from: "BooksHub",
          to: to,
          subject: subject,
          message: text,
          timestamp: new Date(),
        });
        await notification.save();
        res.status(200).json({ message: "Email sent successfully" });
      } catch (err) {
        res.status(500).json({ error: "Failed to save notification" });
      }
    }
  });
});

router.put("/seen/all", requireAuth, async (req, res) => {
  try {
    const updatedNotifications = await Notification.updateMany(
      { seen: false },
      { $set: { seen: true } },
      { multi: true }
    );

    if (updatedNotifications.nModified === 0) {
      return res.status(404).json({ error: "No unseen notifications found" });
    }

    return res
      .status(200)
      .json({ message: "All notifications marked as seen" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update notifications" });
  }
});

router.put("/seen/:notifId", requireAuth, async (req, res) => {
  const { notifId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(notifId)) {
    return res.status(400).json({ error: "notif id is not valid" });
  }

  try {
    const updatedNotif = await Notification.findByIdAndUpdate(
      notifId,
      { seen: true },
      { new: true }
    );

    if (!updatedNotif) {
      return res.status(404).json({ error: "Notification not found" });
    }

    return res.status(200).json(updatedNotif);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update notification" });
  }
});

router.delete("/all", requireAuth, async (req, res) => {
  try {
    const result = await Notification.deleteMany({ to: req.client.email });

    return res.status(200).json(result);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not delete client notifications" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const res = await Notification.findByIdAndDelete(id);
    return res.status(200).json(res);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Could not delete client notification" });
  }
});

export default router;
