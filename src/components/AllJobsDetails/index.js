import './index.css';
import Header from '../Header';
import JobItem from '../JobItem';
import FiltersGroup from '../FiltersGroup';
import { Component } from 'react';
import Cookies from 'js-cookie';
import { FaSearch } from 'react-icons/fa';
import Loader from 'react-loader-spinner';

const statusConstants = {
	initial: 'INITIAL',
	success: 'SUCCESS',
	failure: 'FAILURE',
	loading: 'LOADING',
};

class AllJobsDetails extends Component {
	state = {
		profileDetails: {},
		profileStatus: statusConstants.initial,
		productsStatus: statusConstants.initial,
		searchInput: '',
		allJobs: [],
		employmentTypeList: [],
		salaryRange: '',
	};

	componentDidMount() {
		this.getProfileDetails();
		this.getJobs();
	}

	getJobs = async () => {
		this.setState({ productsStatus: statusConstants.loading });
		const { searchInput, employmentTypeList, salaryRange } = this.state;
		const employmentType = employmentTypeList.join(',');
		const token = Cookies.get('jwt_token');
		const url = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`;
		const options = {
			method: 'GET',
			headers: {
				Authorization: `bearer ${token}`,
			},
		};
		const response = await fetch(url, options);
		// console.log(response);
		if (response.ok === true) {
			const data = await response.json();
			const updatedData = data.jobs.map((each) => ({
				companyLogoUrl: each.company_logo_url,
				employmentType: each.employment_type,
				id: each.id,
				jobDescription: each.job_description,
				location: each.location,
				packagePerAnnum: each.package_per_annum,
				rating: each.rating,
				title: each.title,
			}));
			console.log(updatedData);
			this.setState({
				allJobs: updatedData,
				productsStatus: statusConstants.success,
			});
		} else {
			this.setState({ productsStatus: statusConstants.failure });
		}
	};

	getProfileDetails = async () => {
		this.setState({ profileStatus: statusConstants.loading });
		const token = Cookies.get('jwt_token');
		const url = 'https://apis.ccbp.in/profile';
		const options = {
			method: 'GET',
			headers: {
				Authorization: `bearer ${token}`,
			},
		};
		const response = await fetch(url, options);
		if (response.ok === true) {
			const data = await response.json();
			const updatedData = {
				name: data.profile_details.name,
				profileImageUrl: data.profile_details.profile_image_url,
				shortBio: data.profile_details.short_bio,
			};
			this.setState({
				profileDetails: updatedData,
				profileStatus: statusConstants.success,
			});
		}
	};

	renderProfileItem = () => {
		const { profileDetails } = this.state;
		const { name, profileImageUrl, shortBio } = profileDetails;
		return (
			<div className="profile-container">
				<img
					src={profileImageUrl}
					className="profile-image"
					alt="profile"
				/>
				<h1 className="profile-name">{name}</h1>
				<p className="profile-bio">{shortBio}</p>
			</div>
		);
	};

	updateSearchInput = (e) => {
		this.setState({ searchInput: e.target.value });
	};

	renderJobsInputContainer = () => (
		<div className="jobs-input-container">
			<input
				className="job-name-input"
				type="search"
				placeholder="Search"
				onChange={this.updateSearchInput}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						this.getJobs();
					}
				}}
			/>
			<button
				className="jobs-input-search-button"
				type="button"
				onClick={this.getJobs}
				// data-testid:"searchButton"
			>
				<FaSearch className="jobs-input-search-icon" />
			</button>
		</div>
	);

	renderProductsSuccessView = () => {
		const { allJobs } = this.state;
		if (allJobs.length === 0) {
			return this.renderProductsNoJobsView();
		}
		return (
			<ul className="jobs-items-list">
				{allJobs.map((each) => (
					<JobItem
						jobDetails={each}
						key={each.id}
					/>
				))}
			</ul>
		);
	};

	renderProductsNoJobsView = () => (
		<img
			src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
			alt="no jobs"
			className="no-jobs-image"
		/>
	);

	reloadTheProductsComponent = () => {
		this.getJobs();
	};

	renderProductsFailureView = () => (
		<>
			<img
				src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
				alt="failure view"
				className="failure-view-image"
			/>
			<h1>Oops! Something Went Wrong</h1>
			<p>We cannot seem to find the page you are looking for.</p>
			<button
				type="button"
				className="retry-button"
				onClick={this.reloadTheProductsComponent()}
			>
				Retry
			</button>
		</>
	);

	renderProductsViews = () => {
		const { productsStatus } = this.state;
		switch (productsStatus) {
			case statusConstants.success:
				return this.renderProductsSuccessView();
			case statusConstants.failure:
				return this.renderProductsFailureView();
			case statusConstants.loading:
				return this.loaderView();
			default:
				return null;
		}
	};

	loaderView = () => (
		<div
			className="loader-container"
			data-testid="loader"
		>
			<Loader
				type="ThreeDots"
				color="#ffffff"
				height="50"
				width="50"
			/>
		</div>
	);

	reloadTheProfileComponent = () => {
		this.getProfileDetails();
	};

	renderProfileFailureView = () => (
		<button
			className="retry-button"
			type="button"
			onClick={this.reloadTheProfileComponent}
		>
			Retry
		</button>
	);

	renderProfileViews = () => {
		const { profileStatus } = this.state;
		switch (profileStatus) {
			case statusConstants.success:
				return this.renderProfileItem();
			case statusConstants.failure:
				return this.renderProfileFailureView();
			case statusConstants.loading:
				return this.loaderView();
			default:
				return null;
		}
	};

	updateEmployementType = (id) => {
		const { employmentTypeList } = this.state;
		if (employmentTypeList.includes(id)) {
			this.setState(
				{
					employmentTypeList: employmentTypeList.filter((item) => item !== id),
				},
				this.getJobs
			);
		} else {
			this.setState(
				{ employmentTypeList: [...employmentTypeList, id] },
				this.getJobs
			);
		}
	};

	updateSalaryRange = (id) => {
		this.setState({ salaryRange: id }, this.getJobs);
	};

	render() {
		const { employmentTypeList, salaryRange } = this.state;
		return (
			<div className="jobs-page">
				<Header />
				<div className="jobs-page-container">
					<div className="profile-and-filter-container">
						<div className="profile-view-container">
							{this.renderProfileViews()}
						</div>
						<FiltersGroup
							employmentTypeList={employmentTypeList}
							updateEmployementType={this.updateEmployementType}
							salaryRange={salaryRange}
							updateSalaryRange={this.updateSalaryRange}
						/>
					</div>
					<div className="all-jobs-container">
						{this.renderJobsInputContainer()}
						{this.renderProductsViews()}
					</div>
				</div>
			</div>
		);
	}
}
export default AllJobsDetails;
