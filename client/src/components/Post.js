import React, { Component } from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'

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
  
  moveCursortAtEnd = (event) => {
    var temp_value = event.target.value
    event.target.value = ''
    event.target.value = temp_value
  }

  deletePost = () => {
    this.props.deletePost(this.props.data.id)
  }

  editPost = (event) => {

    //press on enter key
    if(event.which === 13) {
      event.preventDefault();

      let post_text = event.target.value.trim();

      if(post_text !== "") {
        this.setState({
          edit_mode: false,
          post_text
        })
        
        this.props.editPost(this.props.data.id, post_text)
      }

      //press on escape key
    } else if(event.which === 27) {
        this.setState({
          edit_mode : false,
          textarea_value: this.state.post_text
        });
    }
  }

  

  render() {

    let content
    if(this.state.edit_mode) {
      content = (
        <textarea 
          className='box'
          value={ this.state.textarea_value } 
          onChange={this.onChange} 
          onKeyDown={this.editPost}
          name="post-text" 
          rows="10"
          autoFocus
          onFocus={this.moveCursortAtEnd}
          >
        </textarea>
      )
    } else {
      content = (<p className='post-text' >{ this.state.post_text } </p>)
    }

    return (
      <div className='post box'>
        <h1 className='post-author' >{ this.props.data.author }</h1>
        { content }

        {/* check whether author of the post is the user logged in now */}
        { this.props.data.author === this.props.username ? 

          <div className='float-right'>
            <Button
            className='button'
            variant='info'
            onClick={this.deletePost}
            >Delete </Button>
            <Button
              className='button'
              variant='light'
              onClick={this.editOn}
            >Edit </Button>
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