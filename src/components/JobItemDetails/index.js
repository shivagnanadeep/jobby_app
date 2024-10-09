import './index.css';
import Header from '../Header';
import { Component } from 'react';
import SimilarJobs from '../SimilarJobs';
import Cookies from 'js-cookie';
import { FaStar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { PiBagFill } from 'react-icons/pi';
import { FaExternalLinkAlt } from 'react-icons/fa';
import Loader from 'react-loader-spinner';

const statusConstants = {
	initial: 'INITIAL',
	success: 'SUCCESS',
	failure: 'FAILURE',
	loading: 'LOADING',
};

class JobItemDetails extends Component {
	state = {
		jobDetails: {},
		skillsDetails: [],
		lifeAtCompanyDetails: {},
		similarJobs: [],
		status: statusConstants.initial,
	};

	componentDidMount() {
		this.getJobDetails();
	}

	getJobDetails = async () => {
		this.setState({ status: statusConstants.loading });
		const { match } = this.props;
		const { params } = match;
		const { id } = params;
		const url = `https://apis.ccbp.in/jobs/${id}`;
		const token = Cookies.get('jwt_token');
		const options = {
			method: 'GET',
			headers: {
				Authorization: `bearer ${token}`,
			},
		};
		const response = await fetch(url, options);
		const data = await response.json();
		if (response.ok === true) {
			const updatedData = {
				id: data.job_details.id,
				title: data.job_details.title,
				companyLogoUrl: data.job_details.company_logo_url,
				companyWebsiteUrl: data.job_details.company_website_url,
				employmentType: data.job_details.employment_type,
				jobDescription: data.job_details.job_description,
				location: data.job_details.location,
				packagePerAnnum: data.job_details.package_per_annum,
				rating: data.job_details.rating,
			};
			const skillsDetails = data.job_details.skills.map((each) => ({
				imageUrl: each.image_url,
				name: each.name,
			}));
			const lifeAtCompanyDetails = {
				description: data.job_details.life_at_company.description,
				imageUrl: data.job_details.life_at_company.image_url,
				location: data.job_details.life_at_company.location,
				packagePerAnnum: data.job_details.life_at_company.package_per_annum,
				rating: data.job_details.life_at_company.rating,
			};
			const similarJobs = data.similar_jobs.map((each) => ({
				companyLogoUrl: each.company_logo_url,
				employmentType: each.employment_type,
				id: each.id,
				jobDescription: each.job_description,
				location: each.location,
				rating: each.rating,
				title: each.title,
			}));

			// console.log(skillsDetails);
			this.setState({
				jobDetails: updatedData,
				skillsDetails,
				lifeAtCompanyDetails,
				similarJobs,
				status: statusConstants.success,
			});
		} else {
			this.setState({ status: statusConstants.failure });
		}
	};

	renderSimilarJobs = () => {
		const { similarJobs } = this.state;
		return (
			<ul className="similar-jobs-list">
				{similarJobs.map((each) => (
					<SimilarJobs
						key={each.id}
						similarJobDetails={each}
					/>
				))}
			</ul>
		);
	};

	renderLifeAtCompany = () => {
		const { lifeAtCompanyDetails } = this.state;
		const { description, imageUrl } = lifeAtCompanyDetails;
		return (
			<div className="life-at-company-container">
				<p>{description}</p>
				<img
					src={imageUrl}
					alt="life at company"
					className="life-at-company-image"
				/>
			</div>
		);
	};

	renderSkills = () => {
		const { skillsDetails } = this.state;
		return (
			<ul className="skills-list">
				{skillsDetails.map((each) => (
					<li className="skills-list-item">
						<img
							src={each.imageUrl}
							alt={each.name}
							className="skills-list-item-image"
						/>
						<p className="skill-name">{each.name}</p>
					</li>
				))}
			</ul>
		);
	};

	renderJobItemDetails = () => {
		const { jobDetails } = this.state;
		const {
			companyLogoUrl,
			title,
			companyWebsiteUrl,
			employmentType,
			jobDescription,
			location,
			rating,
			packagePerAnnum,
		} = jobDetails;
		return (
			<div className="job-each-item-details-container">
				<div className="logo-and-title-and-rating-container">
					<img
						src={companyLogoUrl}
						alt="job details company logo"
						className="job-item-logo"
					/>
					<div className="title-and-rating-container">
						<h1 className="jobs-title">{title}</h1>
						<div className="rating-container">
							<FaStar className="star" />
							<p className="rating">{rating}</p>
						</div>
					</div>
				</div>
				<div className="job-details">
					<div className="location-and-type-container">
						<div className="details-container">
							<FaLocationDot />
							<p className="type">{location}</p>
						</div>
						<div className="details-container">
							<PiBagFill />
							<p className="type">{employmentType}</p>
						</div>
					</div>
					<p className="package-per-annum">{packagePerAnnum}</p>
				</div>
				<hr className="hr" />
				<div className="description-and-link-container">
					<h1 className="description-heading">Description</h1>
					<a
						href={companyWebsiteUrl}
						className="company-website-url"
					>
						Visit
						<FaExternalLinkAlt className="link-icon" />
					</a>
				</div>
				<p>{jobDescription}</p>
				<h1 className="description-heading">Skills</h1>
				{this.renderSkills()}
				<h1 className="description-heading">Life at Company</h1>
				{this.renderLifeAtCompany()}
			</div>
		);
	};

	renderJobsItemLoadingView = () => (
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

	reloadPage = () => {
		this.getJobDetails();
	};

	renderJobsListFailureView = () => (
		<div className="jobs-details-failure-container">
			<img
				src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
				alt="failure view"
				className="jobs-details-failure-view-image"
			/>
			<h1>Oops! Something Went Wrong</h1>
			<p>We cannot seem to find the page you are looking for.</p>
			<button
				type="button"
				className="retry-button"
				onClick={this.reloadPage}
			>
				Retry
			</button>
		</div>
	);

	renderJobsViews = () => {
		const { status } = this.state;
		switch (status) {
			case statusConstants.success:
				return this.renderJobItemDetails();
			case statusConstants.failure:
				return this.renderJobsListFailureView();
			case statusConstants.loading:
				return this.renderJobsItemLoadingView();
			default:
				return null;
		}
	};

	renderJobsDetailsSuccessView = () => (
		<>
			<div className="job-item-container">{this.renderJobItemDetails()}</div>
			<div className="similar-jobs-container">
				<h1 className="similar-jobs-heading">Similar Jobs</h1>
				{this.renderSimilarJobs()}
			</div>
		</>
	);

	render() {
		return (
			<div className="job-item-details-container">
				<Header />
				{this.renderJobsViews()}
			</div>
		);
	}
}
export default JobItemDetails;
