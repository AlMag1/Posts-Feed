import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import { User } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UsersSliceState {
  users: User[];
}

const initialState: UsersSliceState = {
  users: [],
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: (create) => ({
    update: create.reducer((state) => {
      state.users = [];
    }),
  }),
  selectors: {
    selectUsers: (users) => users.users,
  },
});

export const { update } = usersSlice.actions;

export const { selectUsers } = usersSlice.selectors;
