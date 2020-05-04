import React, { Component } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import './ProfilePicture.css';
import axios from 'axios';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      profile_picture: "",
      selected_picture: "",
      show: false,
      isButtonDisabled: true,
      loading: false
    };
  }

  componentDidMount() {
    axios.get(`/profile_picture/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          profile_picture: res.data.url
        })
      }
    })
    .catch(err => {
      console.log("Get data error: ", err);
    });
  }

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  selectedPictureHandler = event => {
    this.setState({
      selected_picture: event.target.files[0],
      isButtonDisabled : false
    })
  }

  addPictureHandler = () => {
    this.setState({
      loading: true
    })
    const data = new FormData()
    data.append('profile_picture', this.state.selected_picture)

    axios.put(`/profile_picture/${this.state.username}`, data)
    .then(res => {
      if (res.data.success === true) {
        this.setState({
          profile_picture: res.data.url,
          show: false,
          loading: false
        })
      } else {
        this.setState({
          show: false,
          loading: false
        })
        alert("Picture upload failed. Please try again")
      }
    })
    .catch(err => {
      console.log("Upload data error: ", err);
    });

    this.setState({
      isButtonDisabled : true
    })
}

deletePictureHandler = () => {

  this.setState({
    loading: true
  })

  axios.delete(`/profile_picture/${this.state.username}`)
  .then(res => {
      if (res.data.success === true) {
        this.setState({
          profile_picture: 'https://res.cloudinary.com/gooder/image/upload/v1588001434/default_profile_picture.png',
          selected_picture: null,
          show: false,
          loading: false
        })
      }
    })
  .catch(err => {
    console.log("Delete picture error: ", err);
  });

}

  render() {

    const profile_picture = this.state.profile_picture
    const url_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1588001434/default_profile_picture.png'
    const del_modal_button = (<Button onClick={this.deletePictureHandler} className='mr-auto' style={{backgroundColor: '#5bbdef', border: 'none'}}>Delete picture</Button>)
    let button

    if(profile_picture && profile_picture !== url_profile_picture) {
      button = (<button className='btn-picture' onClick={this.handleShow} style={{backgroundImage: `url(${profile_picture})`}}> </button>)

    } else {
      button = (<button className='btn-picture' onClick={this.handleShow}>
                  <img className='icon-picture' src={profile_picture} alt="default_profile_picture"/>
                </button>)
    }

    return (

      <div className='profile-picture'>
        {button}
        <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{profile_picture && profile_picture !== url_profile_picture ? 'Edit picture' : 'Add picture'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {profile_picture && profile_picture !== url_profile_picture ? 'You can edit your picture' : 'Add picture of you'}
            {
              this.state.loading &&
              <Spinner animation="border" role="status" className='spinner'>
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
          </Modal.Body>
          <Modal.Footer>
            {profile_picture && profile_picture !== url_profile_picture ? del_modal_button : null}
            <input type="file" name="profile_picture" accept="image/*" onChange={this.selectedPictureHandler}/>
            <Button disabled = {this.state.isButtonDisabled} onClick={this.addPictureHandler} style={{backgroundColor: '#5bbdef', border: 'none'}}>
              {profile_picture && profile_picture !== url_profile_picture ? 'Modify ' : 'Add '} picture</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ProfilePicture);