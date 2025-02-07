import { toast } from "@/hooks/use-toast";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload.data;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      toast({ title: "Logout successfully" });
    },
    register: (state, action) => {
      const user = action.payload.data;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export default userSlice.reducer;
