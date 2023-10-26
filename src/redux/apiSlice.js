import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to get user data
export const getUserData = createAsyncThunk("api/getUser", async (id) => {
  const response = await axios.get(`https://trelloapp.onrender.com/getUser/${id}`);
  return response.data.user;
});

// Async thunk to add a task
export const addTask = createAsyncThunk("api/addTask", async (values, userToken) => {
  const response = await axios.post("https://trelloapp.onrender.com/addTask", values, {
    headers: { Authorization: `Bearer ${userToken}` },
  });
  return response.data.message;
});

const initialState = { userData: [], addTaskMessage: "" };

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userData = action.payload;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.addTaskMessage = action.payload;
    });
  },
});

export const apiReducer = apiSlice.reducer;
