import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  email: string | undefined;
  token: string | undefined;
  id: string | undefined;
}

const initialState: CounterState = {
  email: "",
  token: "",
  id: "",
};

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<CounterState>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = "";
      state.token = "";
      state.id = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
