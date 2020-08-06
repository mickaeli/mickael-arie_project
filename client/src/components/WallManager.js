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
      posts: [],
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }

  }

  componentDidMount() {

    this.context.socket.on("addPost", ({post}) => {
        this.setState({
          posts: [...this.state.posts, post],
          postInputs: {post_text: '', isAnonymous: false}
        })
    });

    this.context.socket.on("editPost", ({posts}) => {
        this.setState({posts})
    });

    this.context.socket.on("deletePost", ({postId}) => {

      this.setState({
        posts: this.state.posts.filter(post => {
                return post.id !== postId
              })
      })
      
    });

    axios.get('/post/')
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

      const params = { post_text: post_text, isAnonymous: this.state.postInputs.isAnonymous, post_author: this.state.userDetails.username }
      
      axios.post('/post/', params)
      .then(res => {
        if (res.data.success === true) {
          
          //add the new post at end of this.state.posts array
          const new_post = {
            id: res.data.post_id,
            text: post_text,
            profilePicture: this.state.userDetails.profilePicture,
            authorUsername: this.state.userDetails.username,
            authorFullname: this.state.userDetails.fullname,
            edited: false,
            isAnonymous: this.state.postInputs.isAnonymous,
            date: res.data.post_date
          }

          this.context.socket.emit('addPost', { post: new_post });
        }
      })
      .catch(err => {
        console.log("Upload post error: ", err);
        this.setState({postInputs: {post_text: '', isAnonymous: false}})
      })
    } else{
      this.setState({postInputs: {post_text: '', isAnonymous: false}})
    }
    
  }


  editPost = (post_id, post_text) => {

    const params = { post_text: post_text, post_author: this.state.userDetails.username }

    axios.put(`/post/${post_id}`, params)
    .then(res => {
      if (res.data.success === true) {
        
        let posts = this.state.posts

        posts.forEach(post => {
          if(post.id === post_id) {
            post.id = res.data.post_id
            post.text = post_text
            post.edited = true
            post.date = res.data.post_date
          }
        })

        this.context.socket.emit('editPost', { posts });
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
      <div className='wall-manager'>
        <PostInput 
          postText={this.state.postInputs.post_text} 
          isAnonymous={this.state.postInputs.isAnonymous} 
          onChangePostText={this.onChangePostText} 
          onChangeIsAnonymous={this.onChangeIsAnonymous} 
          sendPost={this.addPost} 
        />
        <div className='walls-container'>
          <Wall
            posts={this.state.posts}
            showFriendsPosts={true}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />
          <Wall
            posts={this.state.posts}
            showFriendsPosts={false}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />
        </div>
      </div>
    );
  }
}

WallManager.contextType = AccountContext;

export default WallManager;