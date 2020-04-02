import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import {withRouter} from 'react-router-dom';
import child from '../img/child.jpg';

import './ProfilePicture.css';
import axios from 'axios';

class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      profile_picture: null,
      selected_picture: null,
      show: false,
      isButtonDisabled: true
    };
  }

  componentDidMount() {
    axios.get(`/profile_picture/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        console.log(res.data.url)
        this.setState({
          profile_picture: res.data.url
        })
      }
    })
    .catch(err => {
      console.log("Upload data error: ", err);
    });
  }

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  selectedPictureHandler = event => {
    //console.log(event.target.files[0])
    this.setState({
      selected_picture: event.target.files[0],
      isButtonDisabled : false
    })
  }

  pictureHandler = () => {
    console.log(this.state.selected_picture)

    const data = new FormData()
    data.append('profile_picture', this.state.selected_picture)

    axios.post(`/profile_picture/${this.state.username}`, data)
    .then(res => {
      if (res.data.success === true) {
        this.setState({
          profile_picture: res.data.url,
          show: false
        })
      }
    })
    .catch(err => {
      console.log("Upload data error: ", err);
    });
}

deletePictureHandler = () => {

  const data = new FormData()
  data.append('profile_picture', this.state.profile_picture)

  axios.post(`/delete_profile_picture/${this.state.username}`, data)
  .then(res => {
    if (res.data.success === true) {
      this.setState({
        profile_picture: null,
        selected_picture: null,
        show: false
      })
    }
  })
  .catch(err => {
    console.log("delete picture error: ", err);
  });

}



  // uploadedImageHandler = () => {
  //   console.log(this.state.selected_picture)

  //   const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/gooder/image/upload'
  //   const CLOUDINARY_UPLOAD_PRESET = 'upload'

  //   const data = new FormData()
  //   data.append('file', this.state.selected_picture)
  //   data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

  //   const config = {
  //     header: {
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //   }

  //   axios
  //   .post(CLOUDINARY_URL, data, config)
  //   .then(res => {console.log(res)})
  //   .catch(err => {console.error(err)})

  // }

  render() {

    const profile_picture = this.state.profile_picture
    let button
    const del_modal_button = (<Button onClick={this.deletePictureHandler} className='mr-auto' style={{backgroundColor: '#5bbdef', border: 'none'}}>Delete picture</Button>)

    if(profile_picture) {
      button = (<button className='btn-picture' onClick={this.handleShow} style={{backgroundImage: `url(${profile_picture})`}}> </button>)

      //button = (<button className='btn-picture' onClick={this.handleShow} style={{backgroundImage: `url(${profile_picture})`}}>

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
            <input type="file" name="profile_picture" accept="image/*" onChange={this.selectedPictureHandler}/>
            <Button disabled = {this.state.isButtonDisabled} onClick={this.pictureHandler} style={{backgroundColor: '#5bbdef', border: 'none'}}>{profile_picture ? 'Modify ' : 'Add '} picture</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ProfilePicture);