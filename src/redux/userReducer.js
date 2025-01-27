import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://localhost:7255/api/v1/";
// let msj = localStorage.getItem("token");
// msj = JSON.parse(msj);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ( userCred ) => {
    const request = await axios.post(`${URL}auth/login`, userCred, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("lO QUE ME DEVUELVE", request.data);
    const response = request.data;
    sessionStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  sessionStorage.removeItem("user");
  return null;
});



// export const fetchUserData = createAsyncThunk(
//   "user/fetchUserData",
//   async () => {
//     const request = await axios.get(`${URL}account/data${msj.nameid}`);
//     const response = request.data;
//     localStorage.setItem("fetchData", JSON.stringify(response));
//     return response;
//   }
// );

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: null,
    error: null,
    isLoggedIn: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        // if (action.payload.message === "User logged in successfully") {}
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        console.log("mi respuesta ", action.error);
        if (action.error.message === "Request failed with status code 401")
          state.error = "Incorrect credentials! Wrong Password.";
        else if (action.error.message === "Request failed with status code 404")
          state.error = "Incorrect credentials! User not found.";
        else state.error = "Unknown error. Please try again later.";
      }).addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      })

    //   .addCase(registerUser.pending, (state) => {
    //     state.isLoading = true;
    //     state.user = null;
    //     state.error = null;
    //   })
    //   .addCase(registerUser.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload;
    //     state.error = null;
    //   })
    //   .addCase(registerUser.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.user = null;

    //     //console.log("mi respuesta ", action.error);
    //     if (action.error.message === "Request failed with status code 400") {
    //       state.error = "The email format is invalid.";
    //     } else if (
    //       action.error.message === "Request failed with status code 409"
    //     ) {
    //       state.error = "A user with that email already exists.";
    //     } else {
    //       state.error = "Unknown error. Please try again later.";
    //     }
    //   })
    //   .addCase(fetchUserData.pending, (state) => {
    //     state.isLoading = true;
    //     state.error = null;
    //   })
    //   .addCase(fetchUserData.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.user = action.payload; // Los datos del usuario después de fetch
    //     state.error = null;
    //   })
    //   .addCase(fetchUserData.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.user = null;
    //     state.error =
    //       action.payload?.message || "Unknown error. Please try again later.";
    //   });
  },
});

export default userSlice.reducer;
