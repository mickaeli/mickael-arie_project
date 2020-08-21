import React, { useContext } from 'react';

import Post from './Post';

import { AccountContext } from '../Context'

const Wall = ({posts, showAll, showFriendsPosts, deletePost, editPost}) => {

  const accountContext = useContext(AccountContext)

  const userDetails = JSON.parse(localStorage.getItem('isLoggedIn'))
  let wallPosts = []

  if(!showAll){
    if(showFriendsPosts) {
      wallPosts = posts.slice().reverse().filter(post => (accountContext.friends.includes(post.authorUsername) || post.authorUsername === userDetails.username) && !post.isAnonymous)
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
      wallPosts = posts.slice().reverse().filter(post => (!accountContext.friends.includes(post.authorUsername) && post.authorUsername !== userDetails.username) || post.isAnonymous)
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
  } else{
    wallPosts = posts.slice().reverse().map(post => {
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
      { !showAll ? <h1 className='text-center green-color'>{ showFriendsPosts ? 'Friends' : 'Others' }</h1> : '' }
      {wallPosts.length === 0 ? <p className='text-center'>No posts yet</p> : wallPosts }
    </div>
  );
};

export default Wall;