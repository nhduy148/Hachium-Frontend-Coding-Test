import { CircularProgress, Paper, Stack } from '@mui/material';

type Props = {};

export default function Loader({}: Props) {
  return (
    <Paper component={Stack} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <CircularProgress />
    </Paper>
  );
}
