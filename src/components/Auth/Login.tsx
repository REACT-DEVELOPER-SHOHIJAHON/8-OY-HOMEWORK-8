import React from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useLoginMutation } from '../../api/authApi';
import { useNotification } from '../../hooks/useNotification';
import AuthForm from './AuthForm';
import { Container, Box, Typography, TextField, Button, Avatar, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [login] = useLoginMutation();
  const notify = useNotification();

  const handleLogin: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await login(data).unwrap();
      notify('Login successful!', 'success');
    } catch (error: any) {
      notify('Login failed! Please check your credentials.', 'error');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ color: 'primary.main' }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              '& .MuiInputLabel-root': { color: 'primary.main' },
              '& .MuiInputBase-root': { color: 'text.primary' },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            sx={{
              '& .MuiInputLabel-root': { color: 'primary.main' },
              '& .MuiInputBase-root': { color: 'text.primary' },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
