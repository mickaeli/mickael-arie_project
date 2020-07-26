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
      post_text: '',
      posts: [],
      friends: []
    }

  }

  componentDidMount() {
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

    axios.get(`/friends/myfriends/${this.context.username}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          friends: res.data.friends
        })
      }
    })
    .catch(err => {
      console.log("Get friends error: ", err);
    })
  }
  

  onChange = (event) => {
    this.setState({
      post_text: event.target.value
    });
  }

  addPost = () => {

    let post_text = this.state.post_text.trim();

    if(post_text !== "") {

      const params = { post_text: post_text, post_author: this.context.username }
      
      axios.post('/post/', params)
      .then(res => {
        if (res.data.success === true) {
          
          //add the new post at end of this.state.posts array
          let posts = this.state.posts
          const new_post = {
            id: res.data.post_id,
            text: post_text,
            profilePicture: this.context.profilePicture,
            author: this.context.fullname,
            edited: false,
            date: res.data.post_date
          }
          posts.push(new_post);
          this.setState({posts});
        }
      })
      .catch(err => {
        console.log("Upload post error: ", err);
      })
    }

    this.setState({post_text:''})
  }


  editPost = (post_id, post_text) => {

    const params = { post_text: post_text, post_author: this.context.username }

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
        
        this.setState({posts});
      }
    })
    .catch(err => {
      console.log("Edit post error: ", err);
    })
  }


  deletePost = (post_id) => {
    
    //delete post and its comments
    axios.delete(`/post/${post_id}`)
    .then(res => {
      if (res.data.success === true) {

        const post_to_delete = this.state.posts.filter(post => {
          return (post.id === post_id)
        })

        let posts = this.state.posts

        const index = posts.indexOf(post_to_delete[0])
        posts.splice(index,1);
        this.setState({posts})
      }
    })
    .catch(err => {
      console.log("Delete post error: ", err);
    });
  }


  render() {

    return (
      <div className='wall-manager'>
        <PostInput postText={this.state.post_text} setPostText={this.onChange} sendPost={this.addPost} />
        <div className='walls-container'>
          <Wall
            posts={this.state.posts}
            showFriendsPosts={true}
            friends={this.state.friends}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />
          <Wall
            posts={this.state.posts}
            showFriendsPosts={false}
            friends={this.state.friends}
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