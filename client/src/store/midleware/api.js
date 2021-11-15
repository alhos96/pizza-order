import axios from "axios";
import { apiRequestStarted } from "../apiActions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiRequestStarted.type) {
      return next(action);
    }

    const { user, name, email, password, confirmPassword, url, onSuccess, setError, pizzas, adress, floor, order } = action.payload;

    try {
      const response = await axios.request({
        baseURL: "http://localhost:5000",
        url,
        headers: user ? { Authorization: `Bearer ${user}` } : {},
        data: {
          pizzas: pizzas,
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
          adress: adress,
          floor: floor,
          order: order,
        },
        method: "POST",
      });
      if (onSuccess) {
        dispatch({ type: onSuccess, payload: { data: response.data } });
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.message);
    }
  };

export default api;
