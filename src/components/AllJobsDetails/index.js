import './index.css';
import Header from '../Header';
import { Component } from 'react';

class AllJobsDetails extends Component {
	componentDidMount() {}

	renderProfileItem = () => {
		return (
			<div className="profile-container">
				<img
					src={profileImageUrl}
					className="profile-image"
					alt="profile"
				/>
				<h1 className="profile-item">{name}</h1>
				<p className="profile-bio">{shortBio}</p>
			</div>
		);
	};

	render() {
		return (
			<div className="jobs-page">
				<Header />
				<div className="jobs-page-container">
					<div className="profile-and-filter-container">
						<div className="profile-container">{/* <ProfileItem /> */}</div>
						<div className="filters-container">{/* <FiltersGroup /> */}</div>
					</div>
					<div className="all-jobs-container"></div>
				</div>
			</div>
		);
	}
}
export default AllJobsDetails;
