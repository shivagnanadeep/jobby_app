import './index.css';
import { FaStar } from 'react-icons/fa';

const SimilarJobs = (props) => {
	const { similarJobDetails } = props;
	const { companyLogoUrl, jobDescription, rating, title } = similarJobDetails;

	return (
		<div className="similar-jobs-item-container">
			<div className="logo-title-container">
				<img
					src={companyLogoUrl}
					alt="similar job company logo"
					className="similar-job-company-logo"
				/>
				<div>
					<h1 className="similar-job-title">{title}</h1>
					<div className="star-container">
						<FaStar />
						<p>{rating}</p>
					</div>
				</div>
			</div>
			<h1 className="similar-jobs-description-container">Description</h1>
			<p>{jobDescription}</p>
		</div>
	);
};
export default SimilarJobs;
