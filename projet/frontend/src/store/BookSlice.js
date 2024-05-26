import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:3000/api/v1/book";

export const getFavoriteBooks = createAsyncThunk(
  "books/getFavoriteBooks",
  async () => {
    const user = JSON.parse(localStorage.getItem("login"));
    try {
      const res = await fetch(url + "/favorites/" + user._id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok) throw new Error("Could not fetch data from book service");
      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getBooks = createAsyncThunk("books/getBooks", async () => {
  const user = JSON.parse(localStorage.getItem("login"));
  try {
    const res = await fetch(url + "/");
    if (!res.ok) throw new Error("Could not fetch data from book service");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
});

export const getBook = createAsyncThunk("books/getBook", async (id) => {
  const user = JSON.parse(localStorage.getItem("login"));
  try {
    const res = await fetch(url + `/${id}`);
    if (!res.ok) throw new Error("Could not fetch the book from book service");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
});
const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    favoritesBooks: [],
    book: {},
    booksIsLoading: false,
    favBooksIsloading: false,
    bookIslaading: false,
  },
  reducers: {
    updateBook: (state, action) => {
      state.book = action.payload;
    },
    addFavorite: (state, action) => {
      state.favoritesBooks.push(action.payload);
    },
    removeFavorite: (state, action) => {
      const bookId = action.payload;

      state.favoritesBooks = state.favoritesBooks.filter(
        (f) => f._id !== bookId
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBooks.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.books = action.payload;
    });
    builder.addCase(getFavoriteBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFavoriteBooks.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getFavoriteBooks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.favoritesBooks = action.payload;
    });
    builder.addCase(getBook.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBook.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.isLoading = false;
      state.book = action.payload;
    });
  },
});

export const { updateBook, addFavorite, removeFavorite } = bookSlice.actions;
export default bookSlice;
