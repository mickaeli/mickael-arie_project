import React, { Component, Fragment } from 'react';
import axios from 'axios'
import {withRouter} from 'react-router-dom';

import {Form, FormControl, Button} from 'react-bootstrap'

class SearchForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      searchInput: '',
      userDetails: JSON.parse(localStorage.getItem('isLoggedIn'))
    }
  }

  handleSearch = (event) => {
    event.preventDefault()

    if(this.state.searchInput !== ''){
      axios.get('/search', {
        params: {
          username: this.state.userDetails.username,
          search: this.state.searchInput
        }
      })
      .then(res => {
        if(res.data.success){

          this.props.history.push({
          pathname: `${this.props.urlPrefix}/search`,
          state: { users: res.data.users, posts: res.data.posts }
      })
        }

      })
      .catch(err => {
        console.log('search failed', err)
      })
    }

  }

  onChange = event => {
    this.setState({
      searchInput: event.target.value
    })
  }


  render() {
    return (
      <Fragment>
        <Form inline className='mr-4 search-form' onSubmit={this.handleSearch}>
          <FormControl type="text" placeholder="Search" value={this.state.searchInput} onChange={this.onChange} className="mr-2 input-form" />
          <Button variant="info" type='submit'>Search</Button>
        </Form>
      </Fragment>
    );
  }
}

export default withRouter(SearchForm);