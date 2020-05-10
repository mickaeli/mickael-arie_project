import React, { Component } from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'

import { getDateAndTime } from '../utils';

import './Post.css'

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      edit_mode: false,
      textarea_value: props.data.text,
      post_text: props.data.text
    }

  }

  onChange = (event) => {
    this.setState({
      textarea_value: event.target.value
    });
  }
  
  editOn = () => this.setState({ edit_mode: true })

  editOff = () => {
    this.setState({
      edit_mode : false,
      textarea_value: this.state.post_text
    });
  }
  
  //move the cursor in textarea at end of the text
  moveCursortAtEnd = (event) => {
    var temp_value = event.target.value
    event.target.value = ''
    event.target.value = temp_value
  }

  deletePost = () => {
    this.props.deletePost(this.props.data.id)
  }

  // editPost = (event) => {

  //   let post_text = event.target.value.trim();

  //   //press on enter key
  //   if(event.which === 13 && post_text !== "") {
  //     event.preventDefault();

  //       this.setState({
  //         edit_mode: false,
  //         post_text
  //       })
        
  //       this.props.editPost(this.props.data.id, post_text)
      

  //     //press on escape key
  //   } else if(event.which === 27) {
  //       this.editOff()
  //   }
  // }

  editPost = () => {

    let post_text = this.state.textarea_value.trim();

    if(post_text !== "") {
      this.setState({
        edit_mode: false,
        post_text
      })
      
      this.props.editPost(this.props.data.id, post_text)

    }
  }

  render() {

    let content
    if(this.state.edit_mode) {
      content = (
        <div className="wrapper-button">
          <textarea 
            className='box'
            value={ this.state.textarea_value } 
            onChange={this.onChange} 
            // onKeyDown={this.editPost}
            name="post-text" 
            rows="10"
            autoFocus
            onFocus={this.moveCursortAtEnd}
            // onBlur={this.editOff}
            >
          </textarea>
          <Button
            className='button'
            variant="primary"
            onClick={this.editPost}
            >Edit
          </Button>
        </div>
      )
    } else {
      content = (
          <div className='post-text'>
            {this.state.post_text.split('\n').map((line, i) => {
              if(line) {
                return (<p className='post-text' key={i}>{line}</p>)
              } else {
                return (<br key={i}/>)
              }
              
            }) }
          </div>
        )
      }

    return (

      <div className='post box'>
        <div className='post-author-date'>
          <h1>{ this.props.data.author }</h1>
          <p className='float-right'>{ getDateAndTime(new Date(this.props.data.date)) }</p>
        </div>

        { content }

        {/* check whether author of the post is the user logged in now */}
        { this.props.data.author === this.props.username ? 

          <div className='float-right'>
            <Button
              className='button'
              variant='info'
              onClick={this.deletePost}
              >Delete 
            </Button>
            <Button
              className='button'
              variant='light'
              onClick={ this.state.edit_mode ? this.editOff : this.editOn}
              >{ this.state.edit_mode ? 'Close' : 'Edit' }
            </Button>
          </div>
          : null
        }

        <textarea className='box' placeholder="Reply"></textarea>
        <h2 className='comment-header'><span>Comments</span></h2>
        {/* <Comment /> */}
      </div>
    );
  };

}

export default Post;