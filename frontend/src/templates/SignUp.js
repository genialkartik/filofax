import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, withRouter, Redirect } from 'react-router-dom';
import {
	Paper, TextField, Button, makeStyles, Snackbar, CircularProgress
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	signRestPage: {
		display: 'flex',
		justifyContent: 'center',
		padding: '2rem 0'
	},
	input: {
		marginBottom: theme.spacing(3),
		width: '90%'
	}
}))
function SignUp(props) {
	const classes = useStyles();
	const [fullname, setName] = useState('')
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [pin, setPin] = useState('');
	const [snackOpen, setSnackOpen] = useState(false)
	const [msg, setMsg] = useState('')
	const [login, setLogin] = useState(false)
	const [loginClicked, setLoginClicked] = useState(false)

	useEffect(() => {
		axios.get('/auth/login')
			.then(res => {
				if (res.data.loggedin) {
					setLoginClicked(false)
					setSnackOpen(true);
					setMsg('Already Logged In');
					setLogin(true);
				}
			})
	}, [props])

	const signUp = async (e) => {
		e.preventDefault();
		setLoginClicked(true);
		await axios.post('/auth/signup', {
			fullname, email, password, pin
		})
			.then(res => {
				console.log(res.data)
				setSnackOpen(true)
				if (res.data.created) {
					setMsg('Signed Up successfully');
					setLogin(true);
				} else
					setMsg('Please, enter correct inputs!');
				setTimeout(() => setSnackOpen(false), 2000);
			})
			.catch(error => {
				setMsg('Something went wrong');
				setTimeout(() => setSnackOpen(false), 2000);
			})
	}

	return (
		<>
			{(login) ?
				<Redirect to='/' /> :
				<>
					<header className="App-header">
						<div className="nav-container">
							<div className="app-brand">
								<Link to="/home" className="app-brand-link">passManager</Link>
							</div>
							<div className="app-links">
								<ul className="nav-lists">
									<li className="nav-link">
										<Link to="/" className="nav-item">Login</Link>
									</li>
									<li className="nav-link">
										<Link to="/register" className="nav-item">Singup</Link>
									</li>
								</ul>
							</div>
						</div>
					</header>
					<div className={`SignUp restpage ${classes.signRestPage}`}>
						<Paper style={{
							maxWidth: '350px',
							margin: '0 auto',
							padding: '1rem',
							textAlign: 'center',
							height: '100%'
						}}>
							<h2>SignUp</h2>
							<TextField className={classes.input}
								onChange={(e) => setName(e.target.value)}
								size="small" variant="outlined" placeholder="Enter Name" />
							<TextField className={classes.input}
								type="email"
								onChange={(e) => setEmail(e.target.value)}
								size="small" variant="outlined" placeholder="Enter Email" />
							<TextField className={classes.input}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								size="small" variant="outlined" placeholder="Enter Password" />
							<TextField className={classes.input}
								type="password"
								onChange={(e) => setPin(e.target.value)}
								size="small" variant="outlined" placeholder="Enter Secure Pin" />
							<Button style={{ marginBottom: '2rem' }} variant="outlined" color="primary"
								onClick={(e) => signUp(e)}>
								{loginClicked ?
									<CircularProgress size={25} color="#fff" /> :
									'Sign Up'
								}
							</Button>
						</Paper>
					</div>

					{/* snack bar */}
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={snackOpen}
						message={msg}
						autoHideDuration={6000}
					/>
				</>
			}
		</>
	)
}
export default withRouter(SignUp);