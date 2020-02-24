import { combineReducers } from "redux";
import authReducer from "./auth_reducer";

const rootReducer = combineReducers({
  isLoggedIn: authReducer,
});

export default rootReducer;

