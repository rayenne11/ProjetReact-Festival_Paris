import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://localhost:3001/api/v1/client";

export const getClient = createAsyncThunk("clients/getClient", async () => {
  const user = JSON.parse(localStorage.getItem("login"));
  try {
    const res = await fetch(url + `/${user._id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    if (!res.ok) throw new Error("Could not fetch client from client service");
    const data = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
});

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    client: {},
    isLoading: false,
  },
  reducers: {
    addClient: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(getClient.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClient.rejected, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getClient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.client = action.payload;
    });
  },
});

export const { addClient } = clientSlice.actions;
export default clientSlice;
