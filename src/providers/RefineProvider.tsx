'use client';

import { Refine } from '@refinedev/core';
import { RefineThemes, RefineSnackbarProvider, ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/mui';
import routerProvider from '@refinedev/nextjs-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { dataProvider } from '@/providers/dataProvider';
import { authProvider } from '@/providers/authProvider';
import { resources } from '@/config/resources';
import StorageIcon from '@mui/icons-material/Storage';

export default function RefineProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <RefineSnackbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          resources={resources.map((r) => ({
            name: r.name,
            list: r.list,
            show: r.show,
            edit: r.edit,
            create: r.create,
            meta: {
              label: r.label,
              icon: r.icon,
            },
          }))}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
            useNewQueryKeys: true,
            projectId: 'supabase-board',
          }}
        >
          <ThemedLayoutV2
            Title={({ collapsed }) => (
              <ThemedTitleV2
                collapsed={collapsed}
                text="Supabase Board"
                icon={<StorageIcon />}
              />
            )}
          >
            {children}
          </ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
