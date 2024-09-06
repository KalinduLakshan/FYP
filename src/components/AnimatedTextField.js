// AnimatedTextField.js
import React from 'react';
import { TextField } from '@mui/material';
import styled, { css, keyframes } from 'styled-components';

const flow = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const StyledTextField = styled(TextField)`
  &.Mui-focused {
    background: linear-gradient(90deg, #00bcd4, #1e3c72, #00bcd4);
    background-size: 200%;
    animation: ${flow} 2s infinite linear;
  }
`;

const AnimatedTextField = (props) => {
  return <StyledTextField {...props} />;
};

export default AnimatedTextField;
