import { create } from "zustand";

const TOKEN_KEY = "token";
const USER_KEY = "user_data";

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem(TOKEN_KEY) || null,
  isAuthenticated: !!localStorage.getItem(TOKEN_KEY),
  user: localStorage.getItem(USER_KEY)
    ? JSON.parse(localStorage.getItem(USER_KEY))
    : null,

  login: (token, user) => {
    // Store token
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user)); // stringify object

    set({
      token,
      user,
      isAuthenticated: true,
    });
  },

  // State management only. Navigation is handled by the calling component.
  logout: () => {
    console.log("logging out...");
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);

    set({
      token: null,
      isAuthenticated: false,
      user: null,
    });
  },

  hasRole: (roles) => {
    const user = get().user;
    if (!user) return false;

    const userRoles = Array.isArray(user.role) ? user.role : [user.role];

    if (Array.isArray(roles)) {
      return roles.some((r) => userRoles.includes(r)); // ✅ match any role
    }

    return userRoles.includes(roles); // single role string
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
}));
