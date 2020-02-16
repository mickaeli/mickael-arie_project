import React from 'react';
import './List.css';

const List = ({
  listItem
}) => {
  const list = Object.keys(listItem)
    .map(item => (
      <li>
        {listItem[item].logo}
        <div className='container-wrapper'>
          {listItem[item].header}
          {listItem[item].paragraph}
        </div>
      </li>
    ))
  return (
    <div className='list'>
      <ul>
        {list}
      </ul>
        </div>
  );
};

export default List;