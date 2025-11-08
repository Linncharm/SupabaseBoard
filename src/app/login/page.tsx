'use client';

import { AuthPage } from '@refinedev/mui';
import { RefineThemes, RefineSnackbarProvider } from '@refinedev/mui';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function LoginPage() {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <RefineSnackbarProvider>
        <AuthPage
          type="login"
          title={
            <div style={{ textAlign: 'center' }}>
              <h1>Supabase Board</h1>
              <p>数据管理后台</p>
            </div>
          }
          formProps={{
            defaultValues: {
              password: '',
            },
          }}
          renderContent={(content) => {
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {content}
              </div>
            );
          }}
        />
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
