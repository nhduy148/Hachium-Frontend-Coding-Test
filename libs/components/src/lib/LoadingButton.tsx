import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

type IProps = ButtonProps & {
  isLoading: boolean;
  children: React.ReactNode;
};

export const LoadingButton: FC<IProps> = ({ isLoading, children, ...props }) => {
  return (
    <Button
      {...props}
      startIcon={isLoading ? <CircularProgress color="inherit" size={16} /> : props?.startIcon}
      disabled={props?.disabled ?? isLoading}
    >
      {children}
    </Button>
  );
};
