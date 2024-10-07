import './index.css';
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom';

import { Component } from 'react';

class LoginForm extends Component {
	state = {
		username: '',
		password: '',
		showLoginError: false,
		loginErrorMsg: '',
	};

	updateUsername = (e) => {
		this.setState({ username: e.target.value });
	};

	updatePassword = (e) => {
		this.setState({ password: e.target.value });
	};

	checkCredentials = async (e) => {
		e.preventDefault();
		const { username, password } = this.state;
		const userDetails = { username, password };
		const url = 'https://apis.ccbp.in/login';
		const options = {
			method: 'POST',
			body: JSON.stringify(userDetails),
		};
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(response, data);
		if (response.ok === true) {
			this.onSubmitSuccess(data.jwt_token);
		} else {
			this.onSubmitFailure(data.error_msg);
		}
	};

	onSubmitSuccess = (jwtToken) => {
		const { history } = this.props;
		Cookies.set('jwt_token', jwtToken, {
			expires: 30,
		});
		history.replace('/');
	};

	onSubmitFailure = (errorMsg) => {
		this.setState({
			loginErrorMsg: errorMsg,
			showLoginError: true,
		});
	};

	render() {
		const { loginErrorMsg, showLoginError, username, password } = this.state;
		const jwtToken = Cookies.get('jwt_token');
		if (jwtToken !== undefined) {
			return <Redirect to="/" />;
		}
		return (
			<div className="login-form-main-container">
				<form
					className="login-form"
					onSubmit={this.checkCredentials}
				>
					<img
						src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
						alt="website logo"
						className="login-form-website-logo"
					/>
					<div className="login-form-input-container">
						<label
							className="login-form-input-label"
							htmlFor="login-form-username-input"
						>
							USERNAME
						</label>
						<input
							className="login-form-input"
							id="login-form-username-input"
							placeholder="Username"
							value={username}
							onChange={this.updateUsername}
						/>
					</div>
					<div className="login-form-input-container">
						<label
							className="login-form-input-label"
							htmlFor="login-form-password-input"
						>
							PASSWORD
						</label>
						<input
							className="login-form-input"
							id="login-form-password-input"
							placeholder="Password"
							type="password"
							value={password}
							onChange={this.updatePassword}
						/>
					</div>
					<button
						type="submit"
						className="login-button"
					>
						Login
					</button>
					{showLoginError && (
						<p className="login-error-msg">*{loginErrorMsg}</p>
					)}
				</form>
			</div>
		);
	}
}
export default LoginForm;
