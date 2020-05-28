import React, {Fragment, Component} from 'react';
import { Button } from 'react-bootstrap'
import axios from 'axios'

import Avatar from './Avatar'

import './User.css'

class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      userDetails: {
        fullname: '',
        profilePicture: '',
        description: ''
      }
    }
  }

  componentDidMount() {
    
    axios.get(`/profile_details/${this.props.otherUser}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          userDetails: Object.assign({}, res.data.userDetails )
        })
      }
    })
    .catch(err => {
      console.log('get profile_details error: ', err);
    })
  }


  render() {

    const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'

    let content

    switch (this.props.userType) {
      case 'senderRequest':
      content = ( <div className='buttons-manage-users'>
                    <div >
                      <form onSubmit={ e => {e.preventDefault(); this.props.acceptRequest(this.props.otherUser, this.props.me)} }>
                        <Button
                          className='button'
                          variant="outline-info"
                          type='submit'
                          >Accept
                        </Button>
                      </form>
                    </div>
                    <div>
                      <form onSubmit={ e => {e.preventDefault(); this.props.rejectRequest(this.props.otherUser, this.props.me)} }>
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
        content = (<form className='buttons-manage-users' onSubmit={ e => {e.preventDefault(); this.props.sendRequest(this.props.me, this.props.otherUser)} }>
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
      <div className='user'>
        <Avatar 
          profile_picture={ this.state.userDetails.profilePicture } 
          center_image={ this.state.userDetails.profilePicture === default_profile_picture ? true : false } 
          size='sm'
          is_button={false}
        />
        <div>
          <h2 style = {{ marginBottom: '.5rem' }}> { this.state.userDetails.fullname } </h2>
          <p> { this.state.userDetails.description } </p>
        </div>
        {content}
      </div>
    )
  }
};

export default User;