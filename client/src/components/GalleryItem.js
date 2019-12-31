import React from 'react';
import './GalleryItem.css';

const GalleryItem = ({header, paragraph, url_img}) => {
  return (
    <div className='gallery-item'>
      <img src={url_img} alt="{url_img}"/>
      <h1>{header}</h1>
      <p>{paragraph}</p>
    </div>
  );
};

export default GalleryItem;