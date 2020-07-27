import React from 'react';

import Post from './Post';

import './Wall.css'

const Wall = ({posts, showFriendsPosts, friends, deletePost, editPost}) => {

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))
  let wallPosts = []

  if(showFriendsPosts) {
    wallPosts = posts.slice().reverse().filter(post => friends.includes(post.author) || post.author === userDetails.fullname)
                                     .map(post => {
                                        return <div key={post.id}>
                                        <Post 
                                          data={post} 
                                          deletePost={deletePost} 
                                          editPost = {editPost} 
                                          />
                                      </div>
                                     })
  } else {
    wallPosts = posts.slice().reverse().filter(post => !friends.includes(post.author) && post.author !== userDetails.fullname)
                                     .map(post => {
                                        return <div key={post.id}>
                                        <Post 
                                          data={post} 
                                          deletePost={deletePost} 
                                          editPost = {editPost} 
                                          />
                                      </div>
                                     })
  }
  
  return (
    
    <div className='wall'>
      <h1 className='text-center'>{ showFriendsPosts ? 'Friends' : 'Others' }</h1>
      {wallPosts.length === 0 ? <p className='text-center'>No posts yet</p> : wallPosts }
    </div>
  );
};

export default Wall;