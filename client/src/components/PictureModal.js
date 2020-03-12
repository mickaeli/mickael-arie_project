import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
//import child from '../img/child.jpg';

import './PictureModal.css';

class PictureModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose = () => this.setState({show: false})
  handleShow = () => this.setState({show: true})

  render() {
    return (
      <div className='picture-modal'>
        {/* <button className='btn-picture' style={{backgroundImage: `url(${child})`}}> */}
        <button className='btn-picture' onClick={this.handleShow}>
          <FontAwesomeIcon className='icon-picture' icon={faCamera} size='3x' aria-hidden="true" />
        </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add picture</Modal.Title>
          </Modal.Header>
          <Modal.Body>Add picture of you</Modal.Body>
          <Modal.Footer>
            <Button style={{backgroundColor: '#5bbdef', border: 'none'}}>
              Add picture
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default PictureModal;