import React, { useState } from 'react';
import { TextField, Button, Box, useTheme } from '@mui/material';
import { tokens } from "../theme";
import Header from './Header';

const BeneficiaryForm = () => {
    const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [formData, setFormData] = useState({
    name: '',
    latitude: '',
    longitude: '', // Add longitude to the state
    village: '',
    district: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Here you would usually send the data to a server or handle it according to your needs
  };

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '70%' }}>
      <Header title="Add a Beneficiary"/>
      <TextField
        required
        id="name"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="latitude"
        name="latitude"
        label="Latitude"
        value={formData.latitude}
        onChange={handleChange}
        type="number"
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="longitude"
        name="longitude" // Add longitude input field
        label="Longitude"
        value={formData.longitude}
        onChange={handleChange}
        type="number"
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="village"
        name="village"
        label="Village"
        value={formData.village}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="district"
        name="district"
        label="District"
        value={formData.district}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
     <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color:colors.blueAccent[700]}}>
        Submit
      </Button>
    </Box>
  );
};

export default BeneficiaryForm;