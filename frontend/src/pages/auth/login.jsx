import React, { useState } from 'react'
import axiosInstance from '../../components/auth/apientrypoints'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import { BASEURL } from '../../components/constants'

import ProjectLogo from '../../static/projectlogo.png'
import authStyles from '../../styles/auth/auth.module.css'

export default function SignIn() {
  const navigate = useNavigate()
  const initialFormData = Object.freeze({
    email: '',
    password: ''
  })

  const [formData, updateFormData] = useState(initialFormData)

  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleRegister = () => {
    navigate('/register');
  };

  const handleSubmit = e => {
    e.preventDefault()
    axiosInstance
      .post(BASEURL + "/api/token/", {
        user_name: formData.username,
        password: formData.password
      })
      .then(res => {
        navigate('/')
        localStorage.setItem('pilot_access_token', res.data.access)
        localStorage.setItem('pilot_refresh_token', res.data.refresh) // Get the refresh and access token
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('pilot_access_token')
      })
      .catch(
        function (error) {
          if (error.response.status === 401) {
            alert("Login Credentials are invalid. Check your username and password and try again.")
          }
        }
      )
  }



  return (
    <Grid container spacing={0} direction="column" alignItems="center">
      <Grid container className={authStyles.main}>
        <Grid container spacing={0} direction="column" alignItems="center">
          <Grid container direction="column" alignItems="center">
            <img src={ProjectLogo} alt="" style={{ width: '35vw' }} />
          </Grid>
          <Grid container direction="column" alignItems="center" style={{ color: "black" }}>
            <h1> Your One-Stop Acad Paper System. </h1>
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
              style={{ backgroundColor: 'primary', width: '15%' }}
              onClick={handleSubmit}>
              Sign In
            </Button>

            <Button

              variant="contained"
              color="primary"
              style={{ backgroundColor: '#FF007F', width: '15%' }}
              onClick={handleRegister}>
              Register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
