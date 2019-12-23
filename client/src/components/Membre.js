import React, { Fragment } from 'react'

const Membre = ({name, children}) => {
    return (
      <Fragment>
        <h2>Membre de ma famille: {name}</h2>
        { children ? <p>{children}</p> : <Fragment /> }
      </Fragment>
    )
}

export default Membre