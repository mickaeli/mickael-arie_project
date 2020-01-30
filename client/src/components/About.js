import React, { Component } from 'react';

class About extends Component {

  componentDidMount() {
    document.title = 'About Gooder'
  }

  render() {
    return (
      <div className='about'>
        <p>About</p>
      </div>
    );
  }
}

export default About;