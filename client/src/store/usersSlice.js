import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./apiActions";

const slice = createSlice({
  initialState: {
    user: "",
    loggedIn: false,
    registrationSuccessfull: false,
    loginError: "",
  },
  name: "users",
  reducers: {
    userLoggedIn: (users, action) => {
      users.loggedIn = true;
      users.registrationSuccessfull = false;
      users.user = action.payload.data.token;
      users.registrationSuccessfull = false;
    },

    userRegistered: (users, action) => {
      users.registrationSuccessfull = true;
    },
    logOut: (users, action) => {
      users.user = action.payload.user;
      users.loggedIn = action.payload.loggedIn;
    },
  },
});

export const userLogin = (email, password, url, setError) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      url,
      email,
      password,
      setError,
      onSuccess: userLoggedIn.type,
    })
  );
};

export const userRegister = (name, email, password, confirmPassword, url, setError) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      name,
      email,
      password,
      confirmPassword,
      url,
      setError,
      onSuccess: userRegistered.type,
    })
  );
};

export const { userLoggedIn, userRegistered, logOut } = slice.actions;
export default slice.reducer;
