import React from 'react'

const AccountContext = React.createContext({
  socket: {},
  username: '',
  fullname: ''
})

export { AccountContext } 