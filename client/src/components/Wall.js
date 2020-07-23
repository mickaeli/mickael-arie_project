import React, {useContext} from 'react';

import Post from './Post';

import './Wall.css'

import { AccountContext } from '../Context'

const Wall = ({posts, showFriendsPosts, friends, deletePost, editPost}) => {

  const accountContext = useContext(AccountContext)

  let wallPosts = []
  if(showFriendsPosts) {
    wallPosts = posts.slice().reverse().filter(post => friends.includes(post.author) || post.author === accountContext.fullname)
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
    wallPosts = posts.slice().reverse().filter(post => !friends.includes(post.author) && post.author !== accountContext.fullname)
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
      {wallPosts.length === 0 ? 'No posts yet' : wallPosts }
    </div>
  );
};

export default Wall;