import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const PostInput = ({postText, isAnonymous, onChangePostText, onChangeIsAnonymous, sendPost}) => {

  const tooltipText = 'If you choose this option your post will be published anonymously. ' +
   'If you still want people to be able to reach you - you should fill a contact method within the post'

  return (
    <form onSubmit={sendPost} className='post-input'>
      <textarea 
      className='box' 
      placeholder="Post something"
      value={postText} 
      onChange={onChangePostText} 
      name="post_text" 
      rows="10"
      />
      <div className='flex-row-center'>

        <div className='checkbox'>
          <input type="checkbox" id='anonymous' checked={isAnonymous} onChange={onChangeIsAnonymous} className='checkbox-element' />
          <label className='checkbox-element' htmlFor='anonymous'>Anonymize</label>
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip id='tooltip-anonymous'>
                {tooltipText}
              </Tooltip>
            }
          >
            <FontAwesomeIcon icon={faQuestionCircle} size='1x' aria-hidden="true" />
          </OverlayTrigger>
        </div>
          <Button
            className='button'
            variant="primary"
            type='submit'
            >Publish 
          </Button>
      </div>
    </form>
  );
};

export default PostInput;