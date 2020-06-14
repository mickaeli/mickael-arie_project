import React, { Fragment, useContext } from 'react';

import { SocketContext } from '../Context'

import { Button } from 'react-bootstrap'

import './FriendsButton.css'

const FriendsButton = (props) => {

  const socketContext = useContext(SocketContext)

  const handleSubmit = e => {
    
    e.preventDefault()

    props.acceptRequest(props.otherUser, props.me)
    socketContext.socket.emit('connectToNewFriend', { sender: props.otherUser, receiver: props.me } )
  }

  let content

  switch (props.userType) {
    case 'senderRequest':
    content = ( <div className='buttons-manage-users'>
                  <div >
                    <form onSubmit= {handleSubmit}>
                      <Button
                        className='button'
                        variant="outline-info"
                        type='submit'
                        >Accept
                      </Button>
                    </form>
                  </div>
                  <div>
                    <form onSubmit={ e => {e.preventDefault(); props.rejectRequest(props.otherUser, props.me)} }>
                      <Button
                        className='button'
                        variant="outline-secondary"
                        type='submit'
                        >Ignore
                      </Button>
                    </form>
                  </div>
                </div>)
      break;
    case 'receiverRequest':
      content = (<Button
                  className='button buttons-manage-users'
                  variant="light"
                  disabled
                  >Pending
                </Button>)
      break;
    case 'friend':
      content = null
      break;
    case 'otherUser':
      content = (<form className='buttons-manage-users' onSubmit={ e => {e.preventDefault(); props.sendRequest(props.me, props.otherUser)} }>
                    <Button
                    className='button'
                    variant="info"
                    type='submit'
                    >Connect
                  </Button>
                </form>)
      break;
    default:
      break;
  }

  return (
    <Fragment>
      {content}
    </Fragment>
    
  );
};

export default FriendsButton;