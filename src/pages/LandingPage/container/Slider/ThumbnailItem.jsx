import React from 'react';
import './Slider.css';

const ThumbnailItem = ({ image, title, description, onClick }) => {
  return (
    <div className="item" onClick={onClick}>
      <img src={image} alt="" />
      <div className="content">
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
};

export default ThumbnailItem;