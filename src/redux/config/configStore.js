import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice";

// TO-BE
const store = configureStore({
  reducer: {
    todos,
  },
});

export default store;
