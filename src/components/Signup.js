import React from 'react';
import { Box, Button, TextField, Typography, MenuItem, Select, InputLabel, FormControl, Link } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import { Link as RouterLink } from 'react-router-dom';

const SignupPage = () => {
  const [role, setRole] = React.useState('');

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

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
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={handleRoleChange}
            label="Role"
            startAdornment={<AccountCircleIcon sx={{ color: '#00bcd4', marginRight: 1 }} />}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={'Admin'}>Admin</MenuItem>
            <MenuItem value={'User'}>User</MenuItem>
            <MenuItem value={'Viewer'}>Viewer</MenuItem>
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
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
