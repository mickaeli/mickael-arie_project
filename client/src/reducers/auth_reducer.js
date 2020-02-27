import { AUTH_LOGIN } from '../actions/auth_action'

const initialState = false

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN:
      return action.payload
    default:
      return state
  }
}

export default authReducer;