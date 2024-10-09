import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AllJobsDetails from './components/AllJobsDetails';
import JobItemDetails from './components/JobItemDetails';
import NotFound from './components/NotFound';
import { Redirect } from 'react-router-dom';

// These are the lists used in the application. You can move them to any component needed.

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
			<ProtectedRoute
				path="/jobs/:id"
				exact
				component={JobItemDetails}
			/>
			<Route
				path="/not-found"
				exact
				component={NotFound}
			/>
			<Redirect to="/not-found" />
		</Switch>
	</BrowserRouter>
);

export default App;
