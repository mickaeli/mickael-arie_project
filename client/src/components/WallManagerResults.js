import React, { Component } from 'react';

import axios from 'axios'

import Wall from './Wall'

import { AccountContext } from '../Context'

import './WallManager.css';

class WallManagerResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      posts: props.posts
    }

  }

  componentDidMount() {

    this.context.socket.on("deletePost", ({postId}) => {

      this.setState({
        posts: this.state.posts.filter(post => {
                return post.id !== postId
              })
      })
      
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props){
      this.setState({
        posts: this.props.posts,
      })
    }
  }


  editPost = (post_id, post_text) => {

    const params = { post_text: post_text, post_author: this.context.userDetails.username }

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
      <div className='account wall-manager'>
        <h1 className='text-center green-color'>Posts</h1>
        {
          this.state.posts.length === 0 ?
          <p style={ {textAlign: 'center', fontSize: '1.1rem' } }>No results</p>
        :
        <Wall
          posts={this.state.posts}
          showAll={true}
          deletePost={this.deletePost} 
          editPost = {this.editPost} 
        />
        }
      </div>
    );
  }
}

WallManagerResults.contextType = AccountContext;

export default WallManagerResults;