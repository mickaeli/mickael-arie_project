import React from 'react';

import { getDateAndTime } from '../utils';

import './PostHeader.css'

const PostHeader = (props) => {
  return (
    <div className='post-header'>
      <h1>{ props.data.author }</h1>
      <p className='float-right'>{
        props.data.post_edited ? [ <strong key={'edited'}>edited</strong>, ' - ', getDateAndTime(new Date(props.data.date)) ] : getDateAndTime(new Date(props.data.date))
      }</p>
    </div>
  );
};

export default PostHeader;