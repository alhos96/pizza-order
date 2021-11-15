import { createSlice, createAction } from "@reduxjs/toolkit";

export const modalRequested = createAction("modalRequested");

const slice = createSlice({
  initialState: {
    showLogin: false,
    showRegister: false,
    showIngredients: false,
  },
  name: "modals",
  reducers: {
    loginDisplayed: (modals, { payload }) => {
      modals.showLogin = payload.showLogin;
      modals.showRegister = payload.showRegister;
    },
    registerDisplayed: (modals, { payload }) => {
      modals.showRegister = payload.showRegister;
      modals.showLogin = payload.showLogin;
    },
    loginClosed: (modals, { payload }) => {
      modals.showLogin = payload.showLogin;
    },
    registerClosed: (modals, { payload }) => {
      modals.showRegister = payload.showRegister;
    },
    ingredientsDisplayed: (modals, { payload }) => {
      modals.showIngredients = payload.showIngredients;
    },
    ingredientsClosed: (modals, { payload }) => {
      modals.showIngredients = payload.showIngredients;
    },
  },
});

export const { loginDisplayed, loginClosed, registerDisplayed, registerClosed, ingredientsDisplayed, ingredientsClosed } = slice.actions;

export default slice.reducer;
