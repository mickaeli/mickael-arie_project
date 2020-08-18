import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import FriendsResults from './FriendsResults'
import WallManagerResults from './WallManagerResults'

import './SearchResults.css'

const SearchResults = (props) => {

  useEffect(() => {
    document.title = 'Dashboard - search'
  }, [])
  
  return (
    <div className='search-results'>
      <div className='search-part'>
        <FriendsResults users={props.location.state.users} />
      </div>
      <div className='search-part'>
        <WallManagerResults posts={props.location.state.posts} />
      </div>
    </div>
          
  );
};

export default withRouter(SearchResults);