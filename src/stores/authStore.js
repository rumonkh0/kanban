import { create } from "zustand";

const TOKEN_KEY = "token";
const USER_KEY = "user_data";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem(TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),

  // hasRole: (requiredRoles) => {
  //   const role = useAuthStore.getState().user.role;
  //   if (!role) return false;
  //   const rolesArray = Array.isArray(requiredRoles)
  //     ? requiredRoles
  //     : [requiredRoles];
  //   return rolesArray.includes(role);
  // },

  login: (token) => {
    // Store token
    localStorage.setItem(TOKEN_KEY, token);
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      token: null,
      isAuthenticated: false,
      user: null, // Clear user state
    });
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
}));
