import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import FriendsResults from './FriendsResults'
import WallManagerResults from './WallManagerResults'

const SearchResults = (props) => {

  useEffect(() => {
    document.title = 'Dashboard - search'
  }, [])
  
  return (
    <FriendsResults data={props.location.state.data} />
    //<WallManagerResults data={props.location.state.data} />
  );
};

export default withRouter(SearchResults);