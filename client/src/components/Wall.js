import React, { Component } from 'react';

import Post from './Post';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

import './Wall.css';

class Wall extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: props.match.params.username,
      // post_text: '',
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
  

  // onChange = (event) => {
  //   this.setState({
  //     post_text: event.target.value
  //   });
  // }

  addPost = (event) => {

    //press on enter key
    if(event.charCode === 13) {
      event.preventDefault();

      let post_text = event.target.value.trim();

      if(post_text !== "") {

        const params = { post_author: this.state.username, post_text: post_text }
        
        axios.post('/post/', params)
        .then(res => {
          if (res.data.success === true) {
            
            //add the new post at end of this.state.posts array
            let posts = this.state.posts
            const new_post = {
              id: res.data.post_id,
              text: post_text,
              author: this.state.username
            }
            posts.push(new_post);
            this.setState({posts});
          }
        })
        .catch(err => {
          console.log("Upload post error: ", err);
        })
      }

      //empty the textarea
      event.target.value = ''

      // this.setState({
      //   post_text: ''
      // })
    }
  }

  deletePost = (post_id) => {
    
    axios.delete(`/post/${post_id}`)
    .then(res => {
      if (res.data.success === true) {
        
        let posts = this.state.posts
        const post_to_delete = posts.filter(post => {
          return (post.id === post_id)
        })

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

    var posts = this.state.posts.slice().reverse().map(post => {
      return <Post key={post.id} username={this.state.username} data={post} deletePost={this.deletePost} />
    })

    return (
      <div className='wall'>
        <textarea 
        className='box' 
        placeholder="Post something" 
        // value={this.state.post_text} 
        // onChange={this.onChange} 
        onKeyPress={this.addPost}
        name="post-text" 
        rows="10"
        />
        { posts }
      </div>
    );
  }
}

export default withRouter(Wall);