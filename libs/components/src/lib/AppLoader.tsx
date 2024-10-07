import { Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import React from 'react';

const AppLoaderComponent = React.forwardRef((_, ref) => {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState<string | undefined>();

  React.useImperativeHandle(
    ref,
    () => ({
      show: (message?: string) => {
        setOpen(true);
        setMessage(message);
      },
      hide: () => {
        setOpen(false);
        setMessage(undefined);
      },
    }),
    [],
  );

  return (
    <Backdrop
      component={Stack}
      spacing={2}
      sx={{ justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}
      open={open}
    >
      <CircularProgress />
      <Typography mt={2} textAlign="center" color="common.white">
        {message}
      </Typography>
    </Backdrop>
  );
});

export const appLoaderRef = React.createRef<AppLoaderRef>();
export const AppLoader = () => <AppLoaderComponent ref={appLoaderRef} />;

export const showAppLoader = (message?: string) => {
  appLoaderRef.current?.show(message);
};

export const hideAppLoader = () => {
  appLoaderRef.current?.hide();
};
export interface AppLoaderRef {
  show(message?: string): void;
  hide(): void;
}
