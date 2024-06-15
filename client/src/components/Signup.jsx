import React, { useState } from 'react';
import { Container, Box, useTheme, TextField, Button, Typography, Link, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useAuth } from '../contexts/AuthContext'; 
import { db } from '../firebase'; 
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../theme";

const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth(); // Adjust according to your Auth context
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !password || !role) {
      setError('Please fill in all fields');
      return;
    }
    try {
      const userCredential = await signup(email, password); // Implement signup in your Auth context
      const uid = userCredential.user.uid;
      // Use setDoc to create a document with the user's UID as the document ID
      await setDoc(doc(db, "users", uid), {
        fullName,
        email,
        role,
      });
      
      navigate('/login'); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
          boxShadow={3}
          borderRadius={2}
          width="100%"
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Create your account
          </Typography>
          <TextField label="Full Name" variant="outlined" margin="normal" fullWidth value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <TextField label="Email" variant="outlined" margin="normal" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextField label="Password" type="password" variant="outlined" margin="normal" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="user">Paravet</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              {/* Add more roles as needed */}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSignup}>
            Sign up
          </Button>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account? <Link href="/login">Log in</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;