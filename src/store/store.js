import { create } from 'zustand';

// Zustand store
export const useStore = create((set) => ({
  token: localStorage.getItem('token') || null, // Initialize token from localStorage
  events: [],

  // Action to set token
  setToken: (token) => {
    localStorage.setItem('token', token); // Persist token to localStorage
    set({ token });
  },

  // Action to clear token
  clearToken: () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    set({ token: null });
  },

  // Action to set events
  setEvents: (events) => set({ events }),

  // Action to clear events
  clearEvents: () => set({ events: [] }),
}));
