import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';



const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth" });
  };
  

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          You have logged in as:
        </Typography>
        <Typography variant="h5" component="div">
         Associate name
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Admin/Manager/Associate
        </Typography>
      </CardContent>
      <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Manually Select" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Auto Select" />
    </FormGroup>
    <Button variant="contained" onClick={()=>{scrollToSection("booking-details")}}>Booking details</Button>
    </Card>
  );
}