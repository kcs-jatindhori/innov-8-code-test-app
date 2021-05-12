import { combineReducers } from "redux";
import user from "./authReducer";
import ticket from "./ticketReducer";

export default combineReducers({
  user,
  ticket
});
