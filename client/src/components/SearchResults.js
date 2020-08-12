import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom'

import FriendsResults from './FriendsResults'

const SearchResults = (props) => {

  useEffect(() => {
    document.title = 'Dashboard - search'
  }, [])
  
  return (
    <FriendsResults data={props.location.state.data} />
  );
};

export default withRouter(SearchResults);