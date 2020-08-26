import React, { Fragment } from 'react';

import { Button, Dropdown } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import './FriendsButton.css'

const FriendsButton = (props) => {

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))

  let content

  switch (props.userType) {
    case 'senderRequest':
    content = ( <div className='buttons-manage-users'>
                  <div >
                    <form onSubmit= {e => {e.preventDefault(); props.acceptRequest(props.otherUser, userDetails.username)}}>
                      <Button
                        className='button'
                        variant="outline-info"
                        type='submit'
                        >Accept
                      </Button>
                    </form>
                  </div>
                  <div>
                    <form onSubmit={ e => {e.preventDefault(); props.rejectRequest(props.otherUser, userDetails.username)} }>
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
      content = (<Dropdown className='buttons-manage-users' >
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic" className='dropDown'>
                    <FontAwesomeIcon icon={faEllipsisV} size='1x' aria-hidden="true" />
                  </Dropdown.Toggle>
                
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={ e => {e.preventDefault(); props.deleteFriend(props.otherUser)} }> Delete</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>)
      break;
    case 'otherUser':
      content = (<form className='buttons-manage-users' onSubmit={ e => {e.preventDefault(); props.sendRequest(userDetails.username, props.otherUser)} }>
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