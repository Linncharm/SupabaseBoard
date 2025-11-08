'use client';

import { Refine } from '@refinedev/core';
import { RefineThemes, RefineSnackbarProvider, ThemedLayoutV2 } from '@refinedev/mui';
import routerProvider from '@refinedev/nextjs-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { dataProvider } from '@/providers/dataProvider';
import { authProvider } from '@/providers/authProvider';
import { useEffect, useState } from 'react';

// 临时资源配置，后续会从 schema.json 动态生成
const resources = [
  {
    name: 'users',
    list: '/users',
    show: '/users/:id',
    edit: '/users/:id/edit',
    meta: {
      label: '用户管理',
    },
  },
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider theme={RefineThemes.Blue}>
      <CssBaseline />
      <RefineSnackbarProvider>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider}
          authProvider={authProvider}
          resources={resources}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <ThemedLayoutV2>
            <div style={{ padding: '24px' }}>
              <h1>欢迎使用 Supabase Board</h1>
              <p>这是一个用于展示和管理 Supabase 数据的后台管理系统</p>
              <h2>快速开始</h2>
              <ol>
                <li>配置 .env.local 文件中的 Supabase 连接信息</li>
                <li>运行 <code>npm run sync-schema</code> 同步数据库表结构</li>
                <li>运行 <code>npm run prepare-schema</code> 生成类型定义</li>
                <li>刷新页面查看您的数据表</li>
              </ol>
            </div>
          </ThemedLayoutV2>
        </Refine>
      </RefineSnackbarProvider>
    </ThemeProvider>
  );
}
