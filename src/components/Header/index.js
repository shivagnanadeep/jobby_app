import './index.css';
import { withRouter, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const Header = (props) => {
	const clickedLogout = () => {
		const { history } = props;
		Cookies.remove('jwt_token');
		history.replace('/');
	};
	return (
		<nav className="header">
			<img
				src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
				alt="website logo"
				className="nav-website-logo"
			/>
			<ul className="nav-link-items-list">
				<li className="nav-link-item">
					<Link to="/">Home</Link>
				</li>
				<li className="nav-link-item">
					<Link to="/jobs">jobs</Link>
				</li>
			</ul>
			<button
				type="button"
				className="logout-button"
				onClick={clickedLogout}
			>
				Logout
			</button>
		</nav>
	);
};
export default withRouter(Header);
