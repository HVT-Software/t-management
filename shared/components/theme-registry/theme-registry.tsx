import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../../../config/theme/theme';

const ThemeRegistry: React.FC<WrappedComponentProps> = ({ children }) => (
  <AppRouterCacheProvider options={{ key: 'fms', enableCssLayer: true }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </AppRouterCacheProvider>
);
export default ThemeRegistry;
