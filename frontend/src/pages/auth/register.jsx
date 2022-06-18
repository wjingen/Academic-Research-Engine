import React, { useState } from 'react';
import axiosInstance from '../../components/auth/apientrypoints'
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import ProjectLogo from '../../static/projectlogo.png'
import authStyles from '../../styles/auth/auth.module.css'

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

	const handleRegister = (e) => {
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
				alert("Registered successfully. Redirecting to Login Page:")
				navigate('/login');
				console.log(res);
				console.log(res.data);
			})
			// .catch(function (error) {
			// 	console.log(error.toJSON());
			//   });
			.catch((error) => {
				console.log(error);
				console.log(`Cannot register. ${error.message}`)
				console.log(error.request);
				alert("Could not register. Check that your email address is valid and try again.")
			})
	};

	return (
		<Grid container spacing={0} direction="column" alignItems="center">
		  <Grid container className={authStyles.main}>
			<Grid container spacing={0} direction="column" alignItems="center">
			  <Grid container direction="column" alignItems="center">
				<img src={ProjectLogo} alt="" style={{ width: '35vw' }} />
			  </Grid>
			  <Grid container direction="column" alignItems="center" style={{ color: "black" }}>
				<h1> Your One-Stop Acad Paper System. </h1>
			  	<h3> Sign Up For A New Pilot Account. </h3>
			  </Grid>
			</Grid>
	
			<Grid
			  container
			  spacing={0}
			  direction="column"
			  alignItems="center"
			  className={authStyles.textfieldcontainer}>
				<Grid container spacing={0} direction="column" alignItems="center">
					<input
					className={authStyles.textfield}
					autoComplete="off"
					type="email"
					maxLength="30"
					name="email"
					onChange={handleChange}
					placeholder="Email: "
					/>
				</Grid>
				<Grid container spacing={0} direction="column" alignItems="center">
					<input
					className={authStyles.textfield}
					autoComplete="off"
					type="username"
					maxLength="30"
					name="username"
					onChange={handleChange}
					placeholder="Username: "
					/>
				</Grid>
				<Grid container spacing={0} direction="column" alignItems="center">
					<input
					className={authStyles.textfield}
					autoComplete="off"
					type="password"
					maxLength="30"
					name="password"
					onChange={handleChange}
					placeholder="Password: "
					/>
				</Grid>
			  <Grid container spacing={0} direction="row" alignItems="center" justifyContent="center">
				<Button
				  type="submit"
				  
				  variant="contained"
				  color="primary"
				  style={{ backgroundColor: 'primary', width: '15%'}}
				  onClick={handleRegister}>
				  Register
				</Button>
				<Button
	
				  variant="contained"
				  color="primary"
				  style={{ backgroundColor: '#FF007F', width: '15%' }}
				  onClick={handleLogin}>
				  Back to Login
				</Button>
			  </Grid>
			</Grid>
		  </Grid>
		</Grid>
	  )
}