import React from 'react';
import './List.css';

const List = ({
  listItems
}) => {
  const list = Object.keys(listItems)
    .map(item => (
      <li key={item}>
        {listItems[item].logo}
        <div className='container-wrapper'>
          {listItems[item].header}
          {listItems[item].paragraph}
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