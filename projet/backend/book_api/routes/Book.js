// import { Router } from "express";
// import Book from "../models/Book.js";
// import Favorite from "../models/Favorite.js";
// import mongoose from "mongoose";
// import axios from "axios";
// import requireAuth from "../middleware/requireAuth.js";

// const router = Router();

// router.get("/", async (req, res) => {
//   try {
//     const books = await Book.find();
//     return res.status(200).json(books);
//   } catch (error) {
//     return res.status(500).json({ error: "Books not found" });
//   }
// });

// router.get("/favorites/:id", requireAuth, async (req, res) => {
//   const { id } = req.params;
//   try {
//     const books = await Favorite.find({ clientId: id });
//     return res.status(200).json(books);
//   } catch (error) {
//     return res.status(500).json({ error: "Books not found" });
//   }
// });

// router.get("/code/:code", requireAuth, async (req, res) => {
//   const { code } = req.params;
//   try {
//     const book = await Book.findOne({ code });
//     return res.status(200).json(book);
//   } catch (error) {
//     return res.status(500).json({ error: "book not found" });
//   }
// });

// router.get("/search", async (req, res) => {
//   const query = req.query.q;
//   try {
//     const books = await Book.find({
//       $or: [
//         { id: { $regex: query, $options: "i" } },
//         { code: { $regex: query, $options: "i" } },
//         { title: { $regex: query, $options: "i" } },
//       ],
//     });
//     res.json({ books });
//   } catch (error) {
//     console.error("Error searching books:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.get("/:id", async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(400).json({ error: "Book id is not valid" });

//   const book = await Book.findOne({ _id: id });
//   if (!book) return res.status(404).json({ error: "Book not found" });

//   return res.status(200).json(book);
// });

// router.post("/addFav", requireAuth, async (req, res) => {
//   const fav = req.body;
//   if (!fav) return res.status(400).json({ error: "Request body is empty" });

//   try {
//     const newFav = await Favorite.create(fav);
//     return res.status(201).json(newFav);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ error: "Could not add book to favorites" });
//   }
// });

// router.post("/", requireAuth, async (req, res) => {
//   const newBook = req.body;

//   if (!newBook) {
//     return res.status(400).json({ error: "Request Body is empty" });
//   }

//   try {
//     const book = await Book.create(newBook);
//     const clientsResponse = await axios.get(
//       "http://client_service:3001/api/v1/client"
//     );
//     const clients = clientsResponse.data;

//     const notificationPromises = clients.map(async (clt) => {
//       const emailData = {
//         to: clt.email,
//         subject: `${book.title} available in our platform`,
//         text: book.description,
//       };

//       try {
//         await axios.post(
//           "http://notification_service:3003/api/v1/sendNotification",
//           emailData
//         );
//         console.log(`Notification sent to ${clt.email}`);
//       } catch (error) {
//         console.error(
//           `Error sending notification to ${clt.email}:`,
//           error.message
//         );
//       }
//     });

//     await Promise.all(notificationPromises);

//     res.status(201).json({
//       message: "Book added successfully and notifications sent to clients.",
//       book: book,
//     });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .json({ error: "Error creating book or sending notifications" });
//   }
// });

// router.put("/:id", requireAuth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedBook = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid book ID" });
//     const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
//     if (!book) return res.status(404).json({ error: "Book not found" });
//     res.status(200).json(book);
//   } catch (error) {
//     res.status(500).json({ error: "Could not update book" });
//   }
// });

// router.put("/toggleLoaned/:id", requireAuth, async (req, res) => {
//   const { id } = req.params;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(500).json({ error: "Book id is not valid" });
//     // Find the book by ID
//     const book = await Book.findById(id);
//     if (!book) {
//       return res.status(500).json({ error: "Book not found" });
//     }
//     // Toggle the 'loaned' field
//     book.loaned = !book.loaned;

//     // Save the updated book
//     await book.save();

//     return res.status(200).json(book);
//   } catch (error) {
//     return res
//       .status(500)
//       .json({ error: `Error toggling loaned field: ${error}` });
//   }
// });

// router.delete("/removeFav/:id", requireAuth, async (req, res) => {
//   try {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid favoriteBook ID" });

//     const existingFavorite = await Favorite.findOneAndDelete({
//       _id: id,
//     });

//     if (!existingFavorite) {
//       return res
//         .status(200)
//         .json({ error: "book deletion failed from favorites" });
//     }

//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Could not delete book" });
//   }
// });

// router.delete("/:id", requireAuth, async (req, res) => {
//   try {
//     const id = req.params.id;

//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(400).json({ error: "Invalid book ID" });
//     const book = await Book.findByIdAndDelete(id);
//     if (!book) return res.status(404).json({ error: "Book not found" });
//     res.status(200).json({ message: "Book deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Could not delete book" });
//   }
// });

// export default router;



// routes.js

import express from "express";
import BookSchema from "../models/Book.js"; // Note the '.js' extension
import requireAuth from "../middleware/requireAuth.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const books = await BookSchema.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const book = await BookSchema.findById(req.params.id);
    console.log(book);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/',async (req, res) => {
  for (const key of Object.keys(req.body)){
    if(req.body[key] ==""){
        return res.status(400).json({message:"verify blog content one or more elements are empty"})
    }
}
try{
    let newBook = await BookSchema.create(req.body)
    res.status(201).json(newBook)

}catch(e){
    console.log(e)
    res.status(500).json({message:"error while creating Blog"})
}
});





// Delete a book by ID
router.delete('/:id', async (req, res) => {
  try {
    const book = await BookSchema.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a book by ID
router.put('/:id', async (req, res) => {
  const { title, author, description, cover, loaned, code } = req.body;
  try {
    const book = await BookSchema.findByIdAndUpdate(req.params.id, {
      title, author, cover, code,
    }, { new: true });

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
