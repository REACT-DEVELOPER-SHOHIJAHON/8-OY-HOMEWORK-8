import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './AuthForm.css'; 
import { useRegisterMutation } from '../../api/authApi';
import { useNotification } from '../../hooks/useNotification';

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
}

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const notify = useNotification();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        name: {
          firstname: data.firstName,
          lastname: data.lastName,
        },
        avatar: data.avatar,
      }).unwrap();
      notify('Registration successful!', 'success');
    
    } catch (error: any) {
      const errorMessage = error?.data?.message || 'Registration failed! Please try again.';
      notify(errorMessage, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>Register</h2>
      
      <div className="input-group">
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          {...register('firstName', { required: 'First name is required' })}
          className="auth-input"
        />
        {errors.firstName && <span className="error">{errors.firstName.message}</span>}
      </div>
      
      <div className="input-group">
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          {...register('lastName', { required: 'Last name is required' })}
          className="auth-input"
        />
        {errors.lastName && <span className="error">{errors.lastName.message}</span>}
      </div>
      
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Invalid email address'
            }
          })}
          className="auth-input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>
      
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          className="auth-input"
        />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>
      
      <div className="input-group">
        <label htmlFor="avatar">Avatar URL</label>
        <input
          type="url"
          id="avatar"
          {...register('avatar', { 
            required: 'Avatar URL is required',
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'Invalid URL'
            }
          })}
          className="auth-input"
        />
        {errors.avatar && <span className="error">{errors.avatar.message}</span>}
      </div>
      
      <button type="submit" className="auth-button" disabled={isLoading}>
        {isLoading ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

export default RegisterForm;
