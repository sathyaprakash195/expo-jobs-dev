import { IUser } from "@/interfaces";
import { create } from "zustand";

export const useUsersStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}));

export interface IUsersStore {
  user: IUser | null;
  setUser: (user: IUser) => void;
}
