import './index.css';
import Header from '../Header';

const HomePage = (props) => {
	const onClickFindJobs = () => {
		const { history } = props;
		history.push('/jobs');
	};
	return (
		<div className="home-page-container">
			<Header />
			<div className="home-page-details">
				<h1 className="home-page-heading">Find The Job That Fits Your Life</h1>
				<p className="home-page-description">
					Millions of people are searching for jobs, salaryRangeIdinformation,
					company reviews. Find the jobs that fits your abilities and potential
				</p>
				<button
					type="button"
					className="find-jobs-button"
					onClick={onClickFindJobs}
				>
					Find Jobs
				</button>
			</div>
		</div>
	);
};
export default HomePage;
