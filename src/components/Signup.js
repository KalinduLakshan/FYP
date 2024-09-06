import React, { useState } from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, FormControl, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      console.log('User registered:', response.data);
    } catch (error) {
      console.error('There was an error registering the user:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#e0f7fa',
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0f7fa',
          borderRadius: '15px 0 0 15px',
          padding: 4,
        }}
      >
        <Typography variant="h2" sx={{ color: '#1e3c72', fontWeight: 'bold' }}>
          Welcome.
        </Typography>
      </Box>
      <Box
        sx={{
          width: '40%',
          backgroundColor: '#1e3c72',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
          borderRadius: '0 15px 15px 0',
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        <PersonIcon sx={{ fontSize: 80, color: '#00bcd4' }} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
            }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              marginRight: 1,
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            InputProps={{
              startAdornment: <PersonIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
            }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: 1,
              marginLeft: 1,
            }}
          />
        </Box>
        <FormControl
          variant="outlined"
          margin="normal"
          fullWidth
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
            marginBottom: 2,
          }}
        >
          <Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            displayEmpty
            startAdornment={<AccountCircleIcon sx={{ color: '#00bcd4', marginRight: 1 }} />}
          >
            <MenuItem value=""><em>Role</em></MenuItem>
            <MenuItem value={'Admin'}>Admin</MenuItem>
            <MenuItem value={'User'}>User</MenuItem>
            <MenuItem value={'Viewer'}>Viewer</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          InputProps={{
            startAdornment: <EmailIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
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
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          InputProps={{
            startAdornment: <LockIcon sx={{ color: '#00bcd4', marginRight: 1 }} />,
          }}
          sx={{
            backgroundColor: '#fff',
            borderRadius: 1,
          }}
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
          type="submit"
        >
          Signup
        </Button>
        <Typography
          sx={{
            marginTop: 2,
            color: '#fff',
          }}
        >
          Do you have an account?{' '}
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              color: '#ff4081',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupPage;
