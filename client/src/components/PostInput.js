import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const PostInput = ({placeHolder, rows, postText, isAnonymous, onChangePostText, onChangeIsAnonymous, sendPost, tooltipText, sendText}) => {

  return (
    <form onSubmit={sendPost} className='post-input'>
      <textarea 
      className='box' 
      placeholder={placeHolder}
      value={postText} 
      onChange={onChangePostText} 
      name="post_text" 
      rows={rows}
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
            >{sendText}
          </Button>
      </div>
    </form>
  );
};

export default PostInput;