import './index.css';
import { FaStar } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { PiBagFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const JobItem = (props) => {
	const { jobDetails } = props;
	const {
		id,
		companyLogoUrl,
		employmentType,
		jobDescription,
		location,
		packagePerAnnum,
		rating,
		title,
	} = jobDetails;
	return (
		<li>
			<Link
				to={`/jobs/${id}`}
				className="job-item-container"
			>
				<div className="logo-and-title-and-rating-container">
					<img
						src={companyLogoUrl}
						alt="company logo"
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
				<h1 className="description-heading">Description</h1>
				<p>{jobDescription}</p>
			</Link>
		</li>
	);
};
export default JobItem;
