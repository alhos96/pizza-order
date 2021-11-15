import { combineReducers } from "redux";
import modalsReducer from "./modalHandlers";
import usersReducer from "./usersSlice";
import ordersReducer from "./ordersSlice";
import adressReducer from "./adressHandlers";

const reducers = combineReducers({
  modals: modalsReducer,
  users: usersReducer,
  orders: ordersReducer,
  adress: adressReducer,
});

export { reducers };
