export const AUTH_LOGIN = 'AUTH_LOGIN'

export const userLogin = (isLoggedIn) => {
  //console.log(`the user is logged in: ${isLoggedIn}`)

  return {
    type: AUTH_LOGIN,
    payload: isLoggedIn,
  }
}