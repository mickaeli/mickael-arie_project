import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import child from '../img/child.jpg';

import './ProfilePicture.css';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      profile_picture: '',
      selected_picture: '',
      show: false
    };
  }

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  selectedImageHandler = event => {
    console.log(event.target.files[0])
    this.setState({
      selected_picture: event.target.files[0]
    })
  }

  render() {
    const profile_picture = this.state.profile_picture
    let button
    const del_modal_button = (<Button className='mr-auto' style={{backgroundColor: '#5bbdef', border: 'none'}}>Delete picture</Button>)

    if(profile_picture) {
      button = (<button className='btn-picture' onClick={this.handleShow} style={{backgroundImage: `url(${profile_picture})`}}></button>)

    } else {
      button = (<button className='btn-picture' onClick={this.handleShow}>
                  <FontAwesomeIcon className='icon-picture' icon={faCamera} size='3x' aria-hidden="true" />
                </button>)
    }

    return (

      <div className='profile-picture'>
        {button}
        <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{profile_picture ? 'Edit picture' : 'Add picture'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{profile_picture ? 'You can edit your picture' : 'Add picture of you'}</Modal.Body>
          <Modal.Footer>
            {profile_picture ? del_modal_button : null}
            <input type="file" name="file" onChange={this.selectedImageHandler}/>
            <Button style={{backgroundColor: '#5bbdef', border: 'none'}}>{profile_picture ? 'Modify ' : 'Add '} picture</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProfilePicture;