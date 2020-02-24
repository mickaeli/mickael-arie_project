import React, { Component } from 'react';

class Profile extends Component {

	componentDidMount() {
    document.title = 'Dashboard - profile'
	}
	
	render() {
		return (
			<div className='profile'> 
				<h1>profile</h1>
			</div>
		);
	}
}

export default Profile;