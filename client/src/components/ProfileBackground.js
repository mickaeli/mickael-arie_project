import React, { Component } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';

import {withRouter} from 'react-router-dom';

import './ProfileBackground.css';
import axios from 'axios';

class ProfileBackground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      profile_background: "",
      selected_background: "",
      show: false,
      isButtonDisabled: true,
      loading: false,
      hovered: false
    };
  }

  componentDidMount() {
    axios.get(`/profile_background/${this.state.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          profile_background: res.data.url
        })
      }
    })
    .catch(err => {
      console.log("Get data error: ", err);
    });
  }

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  onMouseEnter = e => {
    this.setState({ hovered: true });
  };

  onMouseLeave = e => {
    this.setState({ hovered: false });
  };

  selectedBackgroundHandler = event => {
    this.setState({
      selected_background: event.target.files[0],
      isButtonDisabled : false
    })
  }

  addBackgroundHandler = () => {
    this.setState({
      loading: true
    })
    const data = new FormData()
    data.append('profile_background', this.state.selected_background)

    axios.put(`/profile_background/${this.state.username}`, data)
    .then(res => {
      if (res.data.success === true) {
        this.setState({
          profile_background: res.data.url,
          show: false,
          loading: false
        })

      } else {
        this.setState({
          show: false,
          loading: false
        })
        alert("Background upload failed. Please try again")
      }
    })
    .catch(err => {
      console.log("Upload data error: ", err);
    });

    this.setState({
      isButtonDisabled : true
    })
}

  deleteBackgroundHandler = () => {

      this.setState({
        loading: true
      })
      const data = new FormData()
      data.append('profile_background', this.state.profile_background)
    
      axios.delete(`/profile_background/${this.state.username}`, { data: { data: data } })
      .then(res => {
        if (res.data.success === true) {
          this.setState({
            profile_background: 'https://res.cloudinary.com/gooder/image/upload/v1588001427/default_profile_background.jpg',
            selected_background: null,
            show: false,
            loading: false
          })
        }
      })
      .catch(err => {
        console.log("delete background error: ", err);
      });
    
    }

  render() {

    const profile_background = this.state.profile_background
    const url_profile_background = 'https://res.cloudinary.com/gooder/image/upload/v1588001427/default_profile_background.jpg'
    const del_modal_button = (<Button onClick={this.deleteBackgroundHandler} className='mr-auto' style={{backgroundColor: '#5bbdef', border: 'none'}}>Delete background</Button>)
    const { hovered } = this.state;
    const style = hovered ? { border: '1px solid' } : null;

    return (

      <div className='profile-background'>
	<button className='btn-background' onClick={this.handleShow} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={ profile_background !== '' ? {backgroundImage: `url(${profile_background})`} : {} }> 
          {profile_background === url_profile_background &&
          <span className='info' style={style}>
            add your personal background
          </span>}
        </button>
        <Modal show={this.state.show} onHide={this.handleClose} size='lg'>
          <Modal.Header closeButton>
            <Modal.Title>{profile_background && profile_background !== url_profile_background ? 'Edit background' : 'Add background'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {profile_background &&  profile_background !== url_profile_background ? 'You can edit your background' : 'Add background you wish'}
            {
              this.state.loading &&
              <Spinner animation="border" role="status" className='spinner'>
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
          </Modal.Body>
          <Modal.Footer>
            {profile_background &&  profile_background !== url_profile_background ? del_modal_button : null}
            <input type="file" name="profile_background" accept="image/*" onChange={this.selectedBackgroundHandler}/>
            <Button disabled = {this.state.isButtonDisabled} onClick={this.addBackgroundHandler} style={{backgroundColor: '#5bbdef', border: 'none'}}>
              {profile_background &&  profile_background !== url_profile_background
              ? 'Modify ' : 'Add '} background
              </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

export default withRouter(ProfileBackground);
