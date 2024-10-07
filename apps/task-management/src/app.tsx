import { ThemeProvider } from '@libs/contexts';
import { datetimeConfig, numerConfig } from '@libs/utils';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes';

datetimeConfig('en');
numerConfig();

function App() {
  return (
    <ThemeProvider initialAppTheme="light">
      <CssBaseline />
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
