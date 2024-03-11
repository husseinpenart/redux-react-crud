import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const postEstate = {
  updateState: false,
  loading: false,
  postList: [],
  message: ""
};

export const fetchPost = createAsyncThunk("post/fetchPost", async () => {
  const result = await axios.get("http://localhost:3000/post");
  console.log(result.data);
  return result.data;
});
export const addPost = createAsyncThunk("post/addPost", async (data) => {
  const result = await axios.post("http://localhost:3000/post/add", {
    title: data.title,
    body: data.body
  });
  console.log(result.data.message);
  return result.data;
});
export const removePost = createAsyncThunk("post/removePost", async (data) => {
  const result = await axios.delete(
    `http://localhost:3000/post/delete/${data}`
  );
  return result.data;
});
export const updatePost = createAsyncThunk("post/updatePost", async (data) => {
  const response = await axios.put(
    `http://localhost:3000/post/update/${data.id}`,
    {
      title: data.title,
      body: data.body
    }
  );
  return response.data;
});
const postSlice = createSlice({
  name: "post",
  initialState: postEstate,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.postList.push(action.payload);
        state.response = "add";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.postList = action.payload;
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.error = action.error.message;
      });

    builder.addCase(removePost.fulfilled, (state, action) => {
      state.postList = state.postList.filter(
        (item) => item._id != action.payload
      );
      state.response = "delete";
    });

    builder.addCase(updatePost.fulfilled, (state, action) => {
      const updateItem = action.payload;
      console.log(updateItem);
      const index = state.postList.findIndex(
        (item) => item._id === updateItem._id
      );
      if (index !== -1) {
        state.postList[index] = updateItem;
      }
      state.response = "update";
    });
  }
});

export default postSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  postSlice.actions;
