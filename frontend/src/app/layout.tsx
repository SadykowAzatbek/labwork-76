import type { Metadata } from 'next';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: 'Shop Frontend',
  description: 'Educational project for Attractor School React courses',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
