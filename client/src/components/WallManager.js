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

    this.context.socket.on("addPost", ({post}) => {
      this.setState({
        posts: [...this.state.posts, post]
      })
    });

    if(this.props.personalWall) {

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
      
    }else {

      this.setSocketEvents()

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
    
  }

  setSocketEvents = () => {

    this.context.socket.on("editPost", ({postId, newFields}) => {

      let posts = this.state.posts

      posts.forEach(post => {
        if(post.id === postId) {
          post.id = newFields.id
          post.text = newFields.text
          post.edited = newFields.edited
          post.date = newFields.date
        }

      });

      this.setState({
          posts
        })
    })

    this.context.socket.on("deletePost", ({postId}) => {

      this.setState({
        posts: this.state.posts.filter(post => {
                return post.id !== postId
              })
      })
      
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
      <div className='wall-manager' style={{width: this.props.personalWall ? '70%' : '90%'}}>
        {
          this.props.personalWall ?
          <h1 className='text-center green-color' style={{fontSize: '1.8rem', marginTop: '3rem'}}>My Posts</h1> : ''
        }
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
        {
          this.props.personalWall ? 
            (<Wall
            posts={this.state.posts}
            showAll={true}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />) 
          :
          (<div className='walls-container'>
          <Wall
            posts={this.state.posts}
            showAll={false}
            showFriendsPosts={true}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />
          <Wall
            posts={this.state.posts}
            showAll={false}
            showFriendsPosts={false}
            deletePost={this.deletePost} 
            editPost = {this.editPost} 
          />
        </div>)
        }
        
      </div>
    );
  }
}

WallManager.contextType = AccountContext;

export default WallManager;