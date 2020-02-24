import { AUTH_LOGIN } from '../actions/auth_action'

// import * as types from "../actions/types";

// const initialState = {
//   username: "",
//   isLoggedIn: false
// };

// const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case types.AUTH_LOGIN:
//       return {
//         ...state,
//         username: action.username,
//         isLoggedIn: true
//       };
//     case types.AUTH_LOGOUT:
//       return initialState;
//     default:
//       return state;
//   }
// };

const initialState = false

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return action.payload
    default:
      return state
  }
}

// const authReducer = () => {
//   return false
// }

export default authReducer;