import React, { useState } from 'react';
import {
  Box, TextField, Paper, Grid, Button, Avatar, Link,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { deepPurple } from '@mui/material/colors';
import './style.css';
import { getClient } from '../../services/user';
import api from '../../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const authenticated = await api.post('/login', { email, password });
    if (authenticated) {
      const roles = await api.get(`/clients/getroles/${email}`);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('token', authenticated.headers.authorization.substring(7));
      localStorage.setItem('profiles', [roles.data]);
      console.log(roles);
      alert('cliente logado');
    }
  };

  return (
    <Grid container className="container">
      <Grid item xs={12} md={12}>
        <Box className="loginBox">
          <Box
            minHeight="100vh"
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Paper className="loginPaper">
              <form className="loginForm" onSubmit={handleLogin}>
                <Box display="flex" justifyContent="center">
                  <Avatar sx={{ width: 56, height: 56, bgcolor: deepPurple[500] }}>
                    <LockIcon />
                  </Avatar>
                </Box>
                <span className="subtitle">
                  Faça login para ter acesso ao sistema.
                </span>
                <Box my={4} />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  required
                  variant="outlined"
                  id="password"
                  label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                // defaultValue="Hello World"
                />
                <Button variant="contained" type="submit" fullWidth> Sign In </Button>
                <Box display="flex" justifyContent="center">
                  <Link href="/"> esqueceu a senha? </Link>
                </Box>
              </form>
            </Paper>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
