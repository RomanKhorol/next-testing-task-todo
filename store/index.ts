import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReduser from "../store/slices/AuthSlice";
const rootReduser = combineReducers({
  user: userReduser,
});
const store = configureStore({
  reducer: rootReduser,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
