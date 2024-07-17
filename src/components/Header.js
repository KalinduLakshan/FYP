import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins, sans-serif' }}>
          NetMaster
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            component={Link} 
            to="/login" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textTransform: 'capitalize' 
            }}
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
          <Button 
            color="inherit" 
            component={Link} 
            to="/signup" 
            sx={{ 
              fontFamily: 'Poppins, sans-serif', 
              textTransform: 'capitalize' 
            }}
            startIcon={<PersonAddIcon />}
          >
            Signup
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
