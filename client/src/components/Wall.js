import React, { Component } from 'react';

import Post from './Post';
import {withRouter} from 'react-router-dom';
import { Button } from 'react-bootstrap'
import axios from 'axios';

import './Wall.css';

class Wall extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      post_text: '',
      posts: []
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
  }
  

  onChange = (event) => {
    this.setState({
      post_text: event.target.value
    });
  }

  addPost = () => {

    let post_text = this.state.post_text.trim();

    if(post_text !== "") {

      const params = { post_text: post_text, post_author: this.state.username }
      
      axios.post('/post/', params)
      .then(res => {
        if (res.data.success === true) {
          
          //add the new post at end of this.state.posts array
          let posts = this.state.posts
          const new_post = {
            id: res.data.post_id,
            text: post_text,
            author: this.props.fullname,
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

    const params = { post_text: post_text, post_author: this.state.username }

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

    const posts = this.state.posts.slice().reverse().map(post => {
      return <Post 
        key={post.id} 
        username={this.state.username}
        fullname={this.props.fullname}
        data={post} 
        deletePost={this.deletePost} 
        editPost = {this.editPost} 
      />
    })

    return (
      <div className='wall'>
        <textarea 
        className='box' 
        placeholder="Post something"
        value={this.state.post_text} 
        onChange={this.onChange} 
        name="post-text" 
        rows="10"
        />
        <div className='wrapper-button'>
          <Button
            className='button'
            variant="primary"
            onClick={this.addPost}
            >Publish 
          </Button>
        </div>
        
        <div className='posts'>
          { posts }
        </div>
        
      </div>
    );
  }
}

export default withRouter(Wall);