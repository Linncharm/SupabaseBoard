import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Supabase Board',
  description: 'Supabase 数据可视化后台管理系统',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
