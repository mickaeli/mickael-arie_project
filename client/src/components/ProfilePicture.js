import React, { Component } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

import Avatar from './Avatar'

import { AccountContext } from '../Context'

import './ProfilePicture.css';



class ProfilePicture extends Component {
  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

    this.state = {
      profile_picture: "",
      selected_picture: "",
      show: false,
      isButtonDisabled: true,
      loading: false,
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    };
  }

  componentDidMount() {
    axios.get(`/profile_details/${this.state.userDetails.username}`, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          profile_picture: this.checkUrl(res.data.userDetails.profilePicture)
        })
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in ProfilePicture
      } else {
        console.log("Get data error: ", err);
      }
      
    });
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in ProfilePicture');
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
    //const data = new FormData()
    //data.append('profile_picture', this.state.selected_picture)

    const reader = new FileReader()
    reader.readAsDataURL(this.state.selected_picture)

    reader.onloadend = () => {
      axios.put(`/profile_picture/${this.state.userDetails.username}`, { urlEncoded64: reader.result }, {
        cancelToken: this.signal.token
      })
      .then(res => {
        if (res.data.success === true) {
          this.setState({
            profile_picture: res.data.url,
            show: false,
            loading: false
          })

          let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'))
          isLoggedIn.profilePicture = res.data.url
          localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));

          this.context.socket.emit('profilePictureModified', { user: this.state.userDetails.username, profilePicture: res.data.url } )

        } else {
          this.setState({
            show: false,
            loading: false
          })
          alert("Picture upload failed. Please try again")
        }
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Error: ', err.message); // => prints: Api is being canceled in ProfilePicture
        } else {
          console.log("Upload data error: ", err);
        }
      });
    }

    this.setState({
      isButtonDisabled : true
    })
  }

  deletePictureHandler = () => {

    this.setState({
      loading: true
    })

    axios.delete(`/profile_picture/${this.state.userDetails.username}`, {
      cancelToken: this.signal.token
    })
    .then(res => {
        if (res.data.success === true) {
          this.setState({
            profile_picture: 'https://res.cloudinary.com/gooder/image/upload/v1589817490/default_profile_picture2.png',
            selected_picture: null,
            show: false,
            loading: false
          })

          this.context.socket.emit('profilePictureModified', { user: this.state.userDetails.username, profilePicture: 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png' } )
        }
      })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in ProfilePicture
      } else {
        console.log("Delete picture error: ", err);
      }
      
    });

  }

  checkUrl = (url) => {
    const default_profile_picture1 = 'https://res.cloudinary.com/gooder/image/upload/v1589799979/default_profile_picture.png'
    const default_profile_picture2 = 'https://res.cloudinary.com/gooder/image/upload/v1589817490/default_profile_picture2.png'

    return (url === default_profile_picture1) ? default_profile_picture2 : url

  }

  render() {

    const profile_picture = this.state.profile_picture
    const default_profile_picture = 'https://res.cloudinary.com/gooder/image/upload/v1589817490/default_profile_picture2.png'
    
    const del_modal_button = (<Button onClick={this.deletePictureHandler} className='mr-auto' style={{backgroundColor: '#5bbdef', border: 'none'}}>Delete picture</Button>)

    const center_image = (profile_picture !== default_profile_picture) ? false : true

    return (

      <div className='profile-picture'>
        {
          profile_picture &&
          <div className='btn-picture' onClick={this.handleShow}>
            <Avatar 
            profile_picture={profile_picture} 
            center_image={center_image}
            size='lg'
            is_button={true}
            />
          </div>
        }
        
        
        <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{profile_picture && profile_picture !== default_profile_picture ? 'Edit picture' : 'Add picture'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {profile_picture && profile_picture !== default_profile_picture ? 'You can edit your picture' : 'Add picture of you'}
            {
              this.state.loading &&
              <Spinner animation="border" role="status" className='spinner'>
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
          </Modal.Body>
          <Modal.Footer>
            {profile_picture && profile_picture !== default_profile_picture ? del_modal_button : null}
            <input type="file" name="profile_picture" accept="image/*" onChange={this.selectedPictureHandler}/>
            <Button disabled = {this.state.isButtonDisabled} onClick={this.addPictureHandler} style={{backgroundColor: '#5bbdef', border: 'none'}}>
              {profile_picture && profile_picture !== default_profile_picture ? 'Modify ' : 'Add '} picture</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ProfilePicture.contextType = AccountContext;

export default ProfilePicture;
