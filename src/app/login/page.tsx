'use client';

import { AuthPage } from '@refinedev/mui';
import { RefineThemes, RefineSnackbarProvider } from '@refinedev/mui';
import { ThemeProvider, CssBaseline, Box, Paper, Typography } from '@mui/material';
import StorageIcon from '@mui/icons-material/Storage';

export default function LoginPage() {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <RefineSnackbarProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 400,
              width: '100%',
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 3 }}>
              <StorageIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              <Typography variant="h4" component="h1" gutterBottom>
                Supabase Board
              </Typography>
              <Typography variant="body2" color="text.secondary">
                数据管理后台
              </Typography>
            </Box>
            <AuthPage
              type="login"
              formProps={{
                defaultValues: {
                  password: '',
                },
              }}
              hideForm={false}
              contentProps={{
                sx: {
                  boxShadow: 'none',
                },
              }}
            />
          </Paper>
        </Box>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
