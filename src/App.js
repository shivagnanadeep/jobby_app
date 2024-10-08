import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import AllJobsDetails from './components/AllJobsDetails';

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
		</Switch>
	</BrowserRouter>
);

export default App;
