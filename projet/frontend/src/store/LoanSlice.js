import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:3002/api/v1/loan";

export const getClientLoans = createAsyncThunk(
  "loans/getClientLoans",
  async () => {
    const user = JSON.parse(localStorage.getItem("login"));
    try {
      const res = await fetch(url + `/${user._id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (!res.ok)
        throw new Error("Could not fetch client loans from loan service");
      const data = await res.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const loanSlice = createSlice({
  name: "loans",
  initialState: {
    clientLoans: [],
    isLoading: false,
  },
  reducers: {
    addClientLoan: (state, action) => {
      state.clientLoans.push({
        ...action.payload,
        loanDate: action.payload.returnDate.toString(),
      });
    },
    removeClienrLoan: (state, action) => {
      const id = action.payload;
      state.clientLoans = state.clientLoans.filter((l) => l._id !== id);
    },
    removeClienrLoanByBookId: (state, action) => {
      const id = action.payload;
      state.clientLoans = state.clientLoans.filter((l) => l.bookId !== id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getClientLoans.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientLoans.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClientLoans.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clientLoans = action.payload;
    });
  },
});

export const { addClientLoan, removeClienrLoan, removeClienrLoanByBookId } =
  loanSlice.actions;
export default loanSlice;
