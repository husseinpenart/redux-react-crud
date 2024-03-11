import { configureStore } from "@reduxjs/toolkit";
import postSlice from './crud'
export default configureStore({
  reducer: {
    post:postSlice
  }
});
