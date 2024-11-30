import {create} from "zustand";
import {Permission, User} from "../types";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  permissions: Permission[];
  setPermissions: (permission: Permission[]) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  permissions: [],
  setUser: (user) => set({user, isAuthenticated: !!user}),
  setPermissions: (permission: Permission[]) => set({permissions: permission}),
}));
