import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AllJobsDetails from './components/AllJobsDetails';

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
	{
		label: 'Full Time',
		employmentTypeId: 'FULLTIME',
	},
	{
		label: 'Part Time',
		employmentTypeId: 'PARTTIME',
	},
	{
		label: 'Freelance',
		employmentTypeId: 'FREELANCE',
	},
	{
		label: 'Internship',
		employmentTypeId: 'INTERNSHIP',
	},
];

const salaryRangesList = [
	{
		salaryRangeId: '1000000',
		label: '10 LPA and above',
	},
	{
		salaryRangeId: '2000000',
		label: '20 LPA and above',
	},
	{
		salaryRangeId: '3000000',
		label: '30 LPA and above',
	},
	{
		salaryRangeId: '4000000',
		label: '40 LPA and above',
	},
];

// Replace your code here
const App = () => (
	<BrowserRouter>
		<Switch>
			<Route
				path="/login"
				exact
				component={LoginForm}
			/>
			<ProtectedRoute
				path="/"
				exact
				component={HomePage}
			/>
			<ProtectedRoute
				path="/jobs"
				exact
				component={AllJobsDetails}
			/>
		</Switch>
	</BrowserRouter>
);

export default App;
