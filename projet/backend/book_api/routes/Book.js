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
