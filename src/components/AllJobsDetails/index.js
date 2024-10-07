import './index.css';
import Header from '../Header';
import { Component } from 'react';

class AllJobsDetails extends Component {
	render() {
		return (
			<div className="jobs-page-container">
				<Header />
				<div className="profile-and-filter-container">
					<div className="profile-container">
						<ProfileItem />
					</div>
					<div className="filters-container">
						<FiltersGroup />
					</div>
				</div>
				<div className="all-jobs-container"></div>
			</div>
		);
	}
}
export default AllJobsDetails;
