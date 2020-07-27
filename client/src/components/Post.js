import React, { Component, Fragment } from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import axios from 'axios';

import './Post.css'

class Post extends Component {

  constructor(props) {
    super(props);

    this.state = {
      post_text_value: props.data.text,
      post_text: props.data.text,
      edit_mode: false,

      post_edited: props.data.edited,
      comment_text: '',
      comments: [],
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }

  }

  componentDidMount() {
    this._isMounted = true

    axios.get(`/comment/${this.props.data.id}`)
    .then(res => {
      if(res.data.success === true && this._isMounted) {
        this.setState({
          comments: res.data.comments
        })
      }
    })
    .catch(err => {
      console.log("Get comments error: ", err);
    });
  }

  componentWillUnmount() {
    this._isMounted = false
  }
  

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  
  editOn = () => this.setState({ edit_mode: true })

  editOff = () => {
    this.setState({
      edit_mode : false,
      post_text_value: this.state.post_text
    });
  }
  
  //move the cursor in textarea at end of the text
  moveCursortAtEnd = (event) => {
    var temp_value = event.target.value
    event.target.value = ''
    event.target.value = temp_value
  }

  deletePost = () => {

    //delete post and its comment
    this.props.deletePost(this.props.data.id)

    this.setState({ comments: [] })
  }

  editPost = () => {

    let post_text = this.state.post_text_value.trim();

    if(post_text !== "") {

      this.setState({
        edit_mode: false
      })

      //the post is edited
      if(post_text !== this.state.post_text) {
        this.props.editPost(this.props.data.id, post_text)
      }
    }
}

addComment = () => {

  let comment_text = this.state.comment_text.trim();

    if(comment_text !== "") {

      //'post_id' indicates the id of the post for which we want add a comment.
      const params = { post_id: this.props.data.id, comment_text: comment_text, comment_author: this.state.userDetails.username }
      
      axios.post('/comment/', params)
      .then(res => {
        if (res.data.success === true) {
          
          //add the new comment at end of this.state.comments array
          let comments = this.state.comments
          const new_comment = {
            id: res.data.comment_id,
            text: comment_text,
            profilePicture: this.state.userDetails.profilePicture,
            author: this.state.userDetails.fullname,
            date: res.data.comment_date
          }
          comments.push(new_comment);
          this.setState({comments});
        }
      })
      .catch(err => {
        console.log("Upload post error: ", err);
      })
    }

    this.setState({comment_text:''})
}

  render() {

    let content
    if(this.state.edit_mode) {
      content = (
        <Fragment>
          <textarea 
            className='box'
            value={ this.state.post_text_value } 
            onChange={this.onChange} 
            name="post_text_value" 
            rows="10"
            autoFocus
            onFocus={this.moveCursortAtEnd}
            >
          </textarea>
          <div className='wrapper-button'>
            <Button
              className='button'
              variant="primary"
              onClick={this.editPost}
              >Edit
            </Button>
          </div>
        </Fragment>
          
      )
    } else {
        content = ( <PostBody post_text={this.state.post_text} />)
      }

    const comments = this.state.comments.slice().reverse().map(comment => {
      return <Comment
        key={comment.id}
        data={comment}
      />
    })

    return (

      <div className='post box'>
        <PostHeader data={ { profilePicture: this.props.data.profilePicture, author: this.props.data.author, post_edited: this.state.post_edited, date: this.props.data.date } } />

        { content }

        {/* check whether author of the post is the user logged in now */}
        { this.props.data.author === this.state.userDetails.fullname ? 

          <div className='buttons-edition'>
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

        <div>
          <textarea 
          className='box' 
          placeholder="Reply"
          value={this.state.comment_text} 
          onChange={this.onChange}
          name="comment_text" 
          rows="5"
          />
          <div className='wrapper-button'>
            <Button
              className='button'
              variant="primary"
              onClick={this.addComment}
              >Send
            </Button>
          </div> 
        </div>
        
        <h2 className='comment-header' style= { { fontSize: '0.9rem' } }><span>Comments</span></h2>
        {comments}
      </div>
    );
  };

}

export default Post;