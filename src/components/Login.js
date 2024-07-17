import React from 'react';
import { Box, Button, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#e0f7fa', // Light blue background
      }}
    >
      <Box
        sx={{
          width: '30%',
          backgroundColor: '#1e3c72',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          borderRadius: '0 15px 15px 0',
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 80, color: '#00bcd4' }} />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="Email"
          InputProps={{
            startAdornment: <AccountCircleIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
          }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          placeholder="Password"
          type="password"
          InputProps={{
            startAdornment: <LockIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
          }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
          sx={{ alignSelf: 'flex-start', color: '#fff' }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            backgroundColor: '#ff4081',
            color: '#fff',
            borderRadius: 2,
            marginTop: 2,
          }}
        >
          Login
        </Button>
        <Typography sx={{ marginTop: 2, color: '#fff' }}>
          Are you a new user?{' '}
          <Link to="/signup" style={{ color: '#ff4081', textDecoration: 'none' }}>
            Sign up
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0f7fa', // Light blue background
          borderRadius: '15px 0 0 15px',
          padding: 4,
        }}
      >
        <Typography variant="h2" sx={{ color: '#1e3c72', fontWeight: 'bold' }}>
          Welcome.
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;
