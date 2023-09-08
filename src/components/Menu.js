import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Path from '../777.png'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* Replace "class" with "className" */}
          <img src={Path} alt="Logo" className="rotate-circle" style={{ width: '70px', height: '70px' }} />
          
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 3,
              textAlign: 'center', // Add this property to center the text
            }}
          >
            Table patients
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
