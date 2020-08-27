import React, { Component } from 'react';
import axios from 'axios';

import PostInput from './PostInput'
import Wall from './Wall'

import { AccountContext } from '../Context'

import './WallManager.css';

class WallManager extends Component {

  constructor(props) {
    super(props);

    this.state = {
      postInputs: {
        post_text: '',
        isAnonymous: false
      },
      posts: []
    }

  }

  componentDidMount() {

    axios.get(`/post/personal_post/${this.context.userDetails.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          posts: res.data.posts
        })
      }
    })
    .catch(err => {
      console.log("Get posts error: ", err);
    });
  }

  onChangePostText = (event) => {
    this.setState({
      postInputs: {...this.state.postInputs, post_text: event.target.value}
    });
  }

  onChangeIsAnonymous = () => {
    this.setState({
      postInputs: {...this.state.postInputs, isAnonymous: !this.state.postInputs.isAnonymous}
    });
  }

  addPost = (event) => {
    event.preventDefault();

    let post_text = this.state.postInputs.post_text.trim();

    if(post_text !== "") {

      const params = { post_text: post_text, isAnonymous: this.state.postInputs.isAnonymous, post_author: this.context.userDetails.username }
      
      axios.post('/post/', params)
      .then(res => {
        if (res.data.success === true) {
          
          //add the new post at end of this.state.posts array
          const new_post = {
            id: res.data.post_id,
            text: post_text,
            profilePicture: this.context.userDetails.profilePicture,
            authorUsername: this.context.userDetails.username,
            authorFullname: this.context.userDetails.fullname,
            edited: false,
            isAnonymous: this.state.postInputs.isAnonymous,
            date: res.data.post_date
          }

          this.context.socket.emit('addPost', { post: new_post }, () => this.setState({ postInputs: {post_text: '', isAnonymous: false} }) );
        }
      })
      .catch(err => {
        console.log("Upload post error: ", err);
        this.setState({postInputs: {post_text: '', isAnonymous: false}})
      })
    } else {
      this.setState({postInputs: {post_text: '', isAnonymous: false}})
    }
    
  }


  editPost = (post_id, post_text) => {

    const params = { post_text: post_text, post_author: this.context.userDetails.username }

    axios.put(`/post/${post_id}`, params)
    .then(res => {
      if (res.data.success === true) {

        const newFields = {
          id: res.data.post_id,
          text: post_text,
          edited: true,
          date: res.data.post_date
        }

        this.context.socket.emit('editPost', { postId: post_id, newFields });
      }
    })
    .catch(err => {
      console.log("Edit post error: ", err);
    })
  }


  deletePost = (postId) => {
    
    //delete post and its comments
    axios.delete(`/post/${postId}`)
    .then(res => {
      if (res.data.success === true) {

        this.context.socket.emit('deletePost', { postId });
      }
    })
    .catch(err => {
      console.log("Delete post error: ", err);
    });
  }


  render() {

    return (
      <div className='wall-manager' style={{width: '70%'}}>
        <PostInput 
          placeHolder="Post something"
          rows={10}
          postText={this.state.postInputs.post_text} 
          isAnonymous={this.state.postInputs.isAnonymous} 
          onChangePostText={this.onChangePostText} 
          onChangeIsAnonymous={this.onChangeIsAnonymous} 
          sendPost={this.addPost} 
          tooltipText = 'If you choose this option your post will be published anonymously. If you still want people to be able to reach you - you should fill a contact method within the post'
          sendText='Publish'
        />
        <Wall
          posts={this.state.posts}
          showAll={true}
          deletePost={this.deletePost} 
          editPost = {this.editPost} 
        />
      </div>
    );
  }
}

WallManager.contextType = AccountContext;

export default WallManager;