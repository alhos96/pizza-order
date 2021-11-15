import { createSlice } from "@reduxjs/toolkit";
import { apiRequestStarted } from "./apiActions";

const slice = createSlice({
  initialState: {
    addedAdress: false,
  },
  name: "adress",
  reducers: {
    adressAdded: (adress, { payload }) => {
      adress.addedAdress = !adress.addedAdress;
    },
  },
});

export const addAdress = (user, newAdress, setError, url) => (dispatch, getState) => {
  dispatch(
    apiRequestStarted({
      user,
      url,
      adress: newAdress.adress,
      floor: newAdress.floor,
      setError,
      onSuccess: adressAdded.type,
    })
  );
};

export const { adressAdded } = slice.actions;
export default slice.reducer;
