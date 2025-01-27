// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   theme: localStorage.getItem("theme") || "light", // Se obtiene el tema guardado en el localStorage
// };

// export const themeSlice = createSlice({
//   name: "theme",
//   initialState: initialState, 
//   reducers: {
//     toggleTheme: (state) => {
//       const newTheme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", newTheme); // Guarda el tema en el localStorage
//       return {...state, theme: newTheme} // Permite establecer un tema específico
//     },
//     setTheme: (state, action) => {
//       localStorage.setItem("theme", action.payload); // Guarda el tema en el localStorage
//       return {...state, theme: action.payload}; // Permite establecer un tema específico
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;

// export default themeSlice.reducer;


// import { createSlice } from "@reduxjs/toolkit";

// const getDefaultTheme = () => {
//   // Obtiene el tema del sistema solo si no hay un tema guardado en localStorage
//   const storedTheme = localStorage.getItem("theme");
//   if (storedTheme) {
//     return storedTheme;
//   }

//   // Si no hay tema guardado, devuelve el tema preferido del sistema
//   const prefersDarkScheme = window.matchMedia(
//     "(prefers-color-scheme: dark)"
//   ).matches;
//   return prefersDarkScheme ? "dark" : "light";
// };

// const initialState = {
//   theme: getDefaultTheme(), // Inicializa el tema con la preferencia del sistema o con lo guardado en localStorage
// };

// export const themeSlice = createSlice({
//   name: "theme",
//   initialState: initialState,
//   reducers: {
//     toggleTheme: (state) => {
//       const newTheme = state.theme === "light" ? "dark" : "light";
//       localStorage.setItem("theme", newTheme); // Guarda el nuevo tema en localStorage
//       return { ...state, theme: newTheme }; // Cambia el tema en el estado
//     },
//     setTheme: (state, action) => {
//       localStorage.setItem("theme", action.payload); // Guarda el tema en localStorage
//       return { ...state, theme: action.payload }; // Cambia el tema en el estado
//     },
//   },
// });

// export const { toggleTheme, setTheme } = themeSlice.actions;

// export default themeSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const getDefaultTheme = () => {
  // Devuelve el tema preferido del sistema cada vez que se necesite
  const prefersDarkScheme = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  return prefersDarkScheme ? "dark" : "light";
};

const initialState = {
  theme: getDefaultTheme(), // Inicializa el tema con la preferencia del sistema
};

export const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    toggleTheme: (state) => {
      // Alterna el tema manualmente (sin guardar en localStorage)
      const newTheme = state.theme === "light" ? "dark" : "light";
      return { ...state, theme: newTheme };
    },
    setTheme: (state, action) => {
      // Establece el tema manualmente (sin guardar en localStorage)
      return { ...state, theme: action.payload };
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;

export default themeSlice.reducer;
