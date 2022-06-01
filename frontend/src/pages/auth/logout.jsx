import React, { useEffect } from 'react'
import axiosInstance from '../../components/auth/apientrypoints'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import ProjectLogo from '../../static/projectlogo.png'

export default function SignUp() {
  const history = useNavigate()

  useEffect(() => {
    axiosInstance.post('/user/logout/blacklist/', {
      refresh_token: localStorage.getItem('pilot_refresh_token')
    })
    localStorage.removeItem('pilot_access_token')
    localStorage.removeItem('pilot_refresh_token')
    axiosInstance.defaults.headers['Authorization'] = null
    setTimeout(() => {
      history('/login')
    }, 1500)
  })

  return (<div>
          <Grid container direction="column" alignItems="center">
            <img src={ProjectLogo} alt="" style={{ width: '35vw' }} />
          </Grid>

          <Grid container direction="column" alignItems="center" style={{ color: "grey" }}>
            <h1> Your one stop Acad Paper System. </h1>
          </Grid>

    <Grid container direction="column" alignItems="center">
    <h1>You have been logged out.</h1>
    <h1> Redirecting you back to Login Page...</h1>
    </Grid>
  </div>)
}
