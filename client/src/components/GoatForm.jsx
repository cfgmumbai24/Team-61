import React, { useState } from 'react';
import { TextField, Button, FormControl, useTheme, InputLabel, Select, MenuItem, FormHelperText, Box } from '@mui/material';
import Header from './Header';
import { tokens } from "../theme";
const GoatForm = () => {
  const [formData, setFormData] = useState({
    weight: '',
    breed: '',
    gender: '',
    colour: '',
    beneficiary_id: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Here you would usually send the data to a server or handle it according to your needs
  };

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, display: 'flex', flexDirection: 'column', alignItems: 'center' , width: '50%'}}>
      <Header title="Assign A Goat"/>
      <TextField
        required
        id="weight"
        name="weight"
        label="Weight (in kg)"
        value={formData.weight}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
        type='number'
      />
      <TextField
        required
        id="breed"
        name="breed"
        label="Breed"
        value={formData.breed}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
        <InputLabel id="gender-label">Gender</InputLabel>
        <Select
          labelId="gender-label"
          id="gender"
          name="gender"
          value={formData.gender}
          label="Gender"
          onChange={handleChange}
          
        >
          <MenuItem value={'Male'}>Male</MenuItem>
          <MenuItem value={'Female'}>Female</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      <TextField
        required
        id="colour"
        name="colour"
        label="Colour"
        value={formData.colour}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <TextField
        required
        id="beneficiary_id"
        name="beneficiary_id"
        label="Beneficiary ID"
        value={formData.beneficiary_id}
        onChange={handleChange}
        sx={{ width: '100%!important' }}
      />
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, backgroundColor: colors.greenAccent[300], color:colors.blueAccent[700]}}>
        Submit
      </Button>
    </Box>
  );
};

export default GoatForm;