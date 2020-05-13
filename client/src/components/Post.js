import React, { Component } from 'react';

import { Button } from 'react-bootstrap'
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import axios from 'axios';

// import { getDateAndTime } from '../utils';

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
      comments: []
    }

  }

  componentDidMount() {
    axios.get(`/comment/${this.props.data.comments_id}`)
    .then(res => {
      if(res.data.success === true) {
        this.setState({
          comments: res.data.comments
        })
      }
    })
    .catch(err => {
      console.log("Get comments error: ", err);
    });
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

    this.setState({ comments: [] })

    //delete post and its comment
    this.props.deletePost(this.props.data.id)
  }

  // editPost = (event) => {

  //   let post_text = event.target.value.trim();

  //   //press on enter key
  //   if(event.which === 13 && post_text !== "") {
  //     event.preventDefault();

  //       this.setState({
  //         edit_mode: false,
  //         post_text
  //       })
        
  //       this.props.editPost(this.props.data.id, post_text)
      

  //     //press on escape key
  //   } else if(event.which === 27) {
  //       this.editOff()
  //   }
  // }

  editPost = () => {

    let post_text = this.state.post_text_value.trim();

    if(post_text !== "") {

      this.setState({
        edit_mode: false
      })

      //the post is edited
      if(post_text !== this.state.post_text) {

      this.setState({
        post_edited: true,
        post_text
      })
      
      this.props.editPost(this.props.data.id, post_text)

    }
  }
}

addComment = () => {

  let comment_text = this.state.comment_text.trim();

    if(comment_text !== "") {

      //'post_id' indicates the id of the post for which we want add a comment.
      const params = { post_id: this.props.data.id, comment_text: comment_text, comment_author: this.props.username }
      
      axios.post('/comment/', params)
      .then(res => {
        if (res.data.success === true) {

          //set state of Wall component and add the new comment id to the post attached it
          this.props.addComment(this.props.data.id, res.data.comment_id)
          
          //add the new comment at end of this.state.comments array
          let comments = this.state.comments
          const new_comment = {
            id: res.data.comment_id,
            text: comment_text,
            author: this.props.username,
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
        <div className="wrapper-button">
          <textarea 
            className='box'
            value={ this.state.post_text_value } 
            onChange={this.onChange} 
            // onKeyDown={this.editPost}
            name="post_text_value" 
            rows="10"
            autoFocus
            onFocus={this.moveCursortAtEnd}
            // onBlur={this.editOff}
            >
          </textarea>
          <Button
            className='button'
            variant="primary"
            onClick={this.editPost}
            >Edit
          </Button>
        </div>
      )
    } else {
      content = ( <PostBody post_text={this.state.post_text} />

          // <div className='post-text'>
          //   {this.state.post_text.split('\n').map((line, i) => {
          //     if(line) {
          //       return (<p className='post-text' key={i}>{line}</p>)
          //     } else {
          //       return (<br key={i}/>)
          //     }
              
          //   }) }
          // </div>
        )
      }

    const comments = this.state.comments.slice().reverse().map(comment => {
      return <Comment
        key={comment.id}
        data={comment}
      />
    })

    return (

      <div className='post box'>
        <PostHeader data={ { author: this.props.data.author, post_edited: this.state.post_edited, date: this.props.data.date } } />
        {/* <div className='post-author-date'>
          <h1>{ this.props.data.author }</h1>
          <p className='float-right'>{
            this.state.post_edited ? [ <strong key={'edited'}>edited</strong>, ' - ', getDateAndTime(new Date(this.props.data.date)) ] : getDateAndTime(new Date(this.props.data.date))
          }</p>
        </div> */}

        { content }

        {/* check whether author of the post is the user logged in now */}
        { this.props.data.author === this.props.username ? 

          <div className='float-right'>
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
        <h2 className='comment-header'><span>Comments</span></h2>
        {comments}
      </div>
    );
  };

}

export default Post;