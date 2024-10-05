import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import './AuthForm.css'; 

interface AuthFormProps {
  onSubmit: SubmitHandler<LoginFormInputs>;
  title: string;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, title }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
      <h2>{title}</h2>
      
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
      
      <button type="submit" className="auth-button">Login</button>
    </form>
  );
};

export default AuthForm;
