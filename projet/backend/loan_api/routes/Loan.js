import { Router } from "express";
import mongoose from "mongoose";
import Loan from "../models/Loan.js";
import axios from "axios";
import FailedLoans from "../models/FailedLoans.js";
import requireAuth from "../middleware/requireAuth.js";
const router = Router();

router.get("/:clientId", requireAuth, async (req, res) => {
  const { clientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });
  const loans = await Loan.find({ clientId: clientId });
  if (!loans) return res.status(500).json({ error: "Client loans not found " });
  return res.status(200).json(loans);
});

router.post("/remindeMe", requireAuth, async (req, res) => {
  const failedLoan = req.body;
  try {
    const result = await FailedLoans.create(failedLoan);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong try again!" });
  }
});

router.post("/addloan", requireAuth, async (req, res) => {
  const { clientId, bookId, returnDate, loanDate } = req.body;

  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });

  if (!mongoose.Types.ObjectId.isValid(bookId))
    return res.status(400).json({ error: "Book id is not valid" });

  const isLoaned = await Loan.findOne({ bookId });
  if (isLoaned) {
    const failedLoan = await FailedLoans.create({ clientId, bookId });
    if (!failedLoan) res.status(500).json({ error: "Falied loan not created" });
    return res
      .status(200)
      .json({ error: "Book is already loaned wait for updates" });
  }

  const bookRes = await fetch("http://book_service:3000/api/v1/book/" + bookId);
  if (!bookRes.ok)
    return res
      .status(500)
      .json({ error: "could not get the client from client service" });
  const book = await bookRes.json();
  if (!book) res.status(500).json({ error: "Book not found" });

  const clientRes = await fetch(
    "http://client_service:3001/api/v1/client/" + clientId
  );
  if (!clientRes.ok)
    return res
      .status(500)
      .json({ error: "could not get the book from book service" });
  const client = await clientRes.json();
  if (!client) res.status(500).json({ error: "Client not found" });

  const bookUpdate = await fetch(
    "http://book_service:3000/api/v1/book/toggleLoaned/" + bookId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
    }
  );
  const updatedBook = await bookUpdate.json();
  if (!bookUpdate.ok)
    return res
      .status(500)
      .json({ error: `could not toggle loaned : ${data.error}` });

  const loan = await Loan.create(req.body);
  if (!loan) res.status(500).json({ error: "Could not create loan" });
  return res.status(200).json({ loan, book: updatedBook });
});

router.post("/returnbook/:bookId/:clientId", requireAuth, async (req, res) => {
  let { bookId, clientId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(clientId))
    return res.status(400).json({ error: "Client id is not valid" });

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    const codeRes = await fetch(
      "http://book_service:3000/api/v1/book/code/" + bookId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${req.token}`,
        },
      }
    );
    const codeBookId = await codeRes.json();
    if (!codeBookId) {
      return res.status(500).json({ error: "Book id not found from code" });
    }
    bookId = codeBookId._id;
  }

  const failedLoans = await FailedLoans.find({ bookId });
  const bookRes = await axios.get(
    "http://book_service:3000/api/v1/book/" + bookId
  );
  const book = bookRes.data;
  if (!book) {
    return res.status(500).json({ error: "Book not found" });
  }
  const bookUpdate = await fetch(
    "http://book_service:3000/api/v1/book/toggleLoaned/" + bookId,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.token}`,
      },
    }
  );
  const updatedBook = await bookUpdate.json();
  if (!bookUpdate.ok)
    return res
      .status(500)
      .json({ error: `could not toggle loaned : ${updatedBook.error}` });

  if (failedLoans.length > 0) {
    const notificationPromises = failedLoans.map(async (failedloan) => {
      try {
        const failedLoanRes = await axios.get(
          "http://client_service:3001/api/v1/client/" + failedloan.clientId
        );
        const failedLoan = failedLoanRes.data;
        if (!failedLoan) {
          return res.status(500).json({ error: "Failed loan not found" });
        }
        if (!failedLoan.email) {
          return res.status(500).json({
            error: `Error sending notification: No email found for client ${failedLoan._id}`,
          });
        }

        const emailData = {
          to: failedLoan.email,
          subject: " Great news",
          text: `The book ${book.title} is available again`,
        };

        await axios.post(
          "http://notification_service:3003/api/v1/sendNotification",
          emailData
        );
      } catch (error) {
        return res
          .status(500)
          .json({ error: `Error sending notification: ${error.message}` });
      }
    });

    await Promise.all(notificationPromises);

    const { deletedCount } = await FailedLoans.deleteMany({ bookId });
  }

  const loan = await Loan.deleteOne({ clientId, bookId });
  if (!loan.deletedCount == 1) {
    return res.status(500).json({ error: "Could not delete client Loan" });
  }

  return res.status(200).json({ book: updatedBook });
});
export default router;
