import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FieldProps } from './types';
import {
  VisibilityOffRounded as VisibilityOffRoundedIcon,
  VisibilityRounded as VisibilityRoundedIcon,
} from '@mui/icons-material';

const Field: React.FC<FieldProps> = (props) => {
  const { name, type } = props;
  const [showPassword, setShowPassword] = useState(false);

  const { register, formState } = useFormContext();

  const handleTogglePassword = () => setShowPassword((state) => !state);

  const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

  const endAdornment =
    type === 'password' ? (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
          onClick={handleTogglePassword}
          onMouseDown={(e) => e.preventDefault()}
          edge="end"
          size='small'
        >
          {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
        </IconButton>
      </InputAdornment>
    ) : null;

  return (
    <TextField
      {...props}
      type={inputType}
      {...register(name)}
      error={Boolean(formState.errors[name]?.message)}
      helperText={formState.errors[name]?.message as string}
      InputProps={{ endAdornment }}
    />
  );
};

export default Field;
