import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light", // Se obtiene el tema guardado en el localStorage
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState, 
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme); // Guarda el tema en el localStorage
      return {...state, theme: newTheme} // Permite establecer un tema específico
    },
    setTheme: (state, action) => {
      localStorage.setItem("theme", action.payload); // Guarda el tema en el localStorage
      return {...state, theme: action.payload}; // Permite establecer un tema específico
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;