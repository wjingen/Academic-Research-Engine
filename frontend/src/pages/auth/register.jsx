import React, { useState } from 'react';
import axiosInstance from '../../components/auth/apientrypoints'
import { useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProjectLogo from '../../static/projectlogo.png'


const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const navigate = useNavigate();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
		password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim(),
		});
	};

  const handleLogin = () => {
    navigate('/login');
  };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance
			.post("http://localhost:8000/user/create/", 
      {
				email: formData.email,
				user_name: formData.username,
				password: formData.password,
        }
			)
			.then((res) => {
				navigate('/login');
				console.log(res);
				console.log(res.data);
			})
      .catch(
        alert("Something went wrong. Ensure a valid email address was given.")
      );
	};

	const classes = useStyles();

	return (<div>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid container direction="column" alignItems="center">
            <img src={ProjectLogo} alt="" style={{ width: '35vw' }} />
          </Grid>
          <Grid container direction="column" alignItems="center" style={{ color: "grey" }}>
            <h1> Your one stop Acad Paper System. </h1>
          </Grid>
        </Grid>

		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="username"
								label="Username"
								name="username"
								autoComplete="username"
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link href="#" variant="body2" onClick={handleLogin}>
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
    </div>
	);
}