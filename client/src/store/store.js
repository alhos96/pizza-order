import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./combinedReducers";
import api from "./middleware/api";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api),
});

export default store;
