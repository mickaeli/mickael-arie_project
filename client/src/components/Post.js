import React, { Component, Fragment } from 'react';

import axios from 'axios';

import { Button } from 'react-bootstrap'
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostInput from './PostInput'


import { AccountContext } from '../Context'

import './Post.css'

class Post extends Component {

  constructor(props) {
    super(props);

    this.signal = axios.CancelToken.source();

    this.state = {
      post_text_value: props.data.text,
      post_text: props.data.text,
      edit_mode: false,

      post_edited: props.data.edited,
      commentInputs: {
        comment_text: '',
        isAnonymous:  false 
      },
      comments: []
    }

  }

  componentDidMount() {

    this.context.socket.on("addComment", ({postId, comment}) => {

      if(this.props.data.id === postId){
        this.setState({
          comments: [...this.state.comments, comment]
        })
      }

  });

    axios.get(`/comment/${this.props.data.id}`, {
      cancelToken: this.signal.token
    })
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          comments: res.data.comments
        })
      }
    })
    .catch(err => {
      if(axios.isCancel(err)) {
        console.log('Error: ', err.message); // => prints: Api is being canceled in Post
      } else {
        console.log("Get comments error: ", err);
      }
      
    });
  }

  componentWillUnmount() {
    this.signal.cancel('Api is being canceled in Post');
    this.context.socket.off('addComment');
  }

  onChangePostText = (event) => {
    this.setState({
      post_text_value: event.target.value
    });
  }

  onChangeCommentText = (event) => {
    this.setState({
      commentInputs: {...this.state.commentInputs, comment_text: event.target.value}
    });
  }

  onChangeIsAnonymous = () => {
    this.setState({
      commentInputs: {...this.state.commentInputs, isAnonymous: !this.state.commentInputs.isAnonymous}
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

addComment = (event) => {
  event.preventDefault();

  let comment_text = this.state.commentInputs.comment_text.trim();

    if(comment_text !== "") {

      //'post_id' indicates the id of the post for which we want add a comment.
      const params = { post_id: this.props.data.id, comment_text: comment_text, isAnonymous: this.state.commentInputs.isAnonymous, comment_author: this.context.userDetails.username }
      
      axios.post('/comment/', params, {
        cancelToken: this.signal.token,
      })
      .then(res => {
        if (res.data.success === true) {
          
          const new_comment = {
            id: res.data.comment_id,
            text: comment_text,
            profilePicture: this.context.userDetails.profilePicture,
            authorUsername: this.context.userDetails.username,
            authorFullname: this.context.userDetails.fullname,
            isAnonymous: this.state.commentInputs.isAnonymous,
            date: res.data.comment_date
          }

          this.context.socket.emit('addComment', { postId: this.props.data.id, comment: new_comment }, () => this.setState({ commentInputs: {comment_text: '', isAnonymous: false} }) );

        }
      })
      .catch(err => {
        if(axios.isCancel(err)) {
          console.log('Error: ', err.message); // => prints: Api is being canceled in Post
        } else {
          console.log("Upload comment error: ", err);
        }
        
        this.setState({commentInputs: {comment_text: '', isAnonymous: false}})
      })
    } else {
        this.setState({commentInputs: {comment_text: '', isAnonymous: false}})
    }

    //this.setState({comment_text:''})
}

  render() {

    let content
    if(this.state.edit_mode) {
      content = (
        <Fragment>
          <textarea 
            className='box'
            value={ this.state.post_text_value } 
            onChange={this.onChangePostText} 
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
        <PostHeader data={ 
          { username: this.props.data.authorUsername, 
            profilePicture: this.props.data.profilePicture, 
            author: this.props.data.authorFullname, 
            post_edited: this.state.post_edited, 
            date: this.props.data.date, 
            isAnonymous: this.props.data.isAnonymous } } />

        { content }

        {/* check whether author of the post is the user logged in now */}
        { this.props.data.authorUsername === this.context.userDetails.username ? 

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

        <PostInput 
          placeHolder="Reply"
          rows={5}
          postText={this.state.commentInputs.comment_text} 
          isAnonymous={this.state.commentInputs.isAnonymous} 
          onChangePostText={this.onChangeCommentText} 
          onChangeIsAnonymous={this.onChangeIsAnonymous} 
          sendPost={this.addComment} 
          tooltipText = 'If you choose this option your comment will be published anonymously. If you still want people to be able to reach you - you should fill a contact method within the comment'
          sendText='Send'
        />
        
        <h2 className='comment-header' style= { { fontSize: '0.9rem' } }><span>Comments</span></h2>
        {comments}
      </div>
    );
  };

}

Post.contextType = AccountContext;

export default Post;