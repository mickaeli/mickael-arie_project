import React from 'react';

import './PostBody.css'

const PostBody = (props) => {

  const content = props.post_text.split('\n').map((line, i) => {
                  if(line) {
                    return (<p key={i}>{line}</p>)
                  } else {
                    return (<br key={i}/>)
                    }
                })


  return (
    <div className='post-body'>
      {content}
    </div>
  );
};

export default PostBody;