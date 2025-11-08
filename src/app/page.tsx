'use client';

import RefineProvider from '@/providers/RefineProvider';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { resources } from '@/config/resources';

export default function Home() {
  return (
    <RefineProvider>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          欢迎使用 Supabase Board
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          这是一个用于展示和管理 Supabase 数据的后台管理系统
        </Typography>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  可用数据表
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  当前系统已识别 {resources.length} 个数据表，请从左侧菜单中选择查看
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 400, overflow: 'auto' }}>
                  <List dense>
                    {resources.map((resource) => (
                      <ListItem key={resource.name}>
                        <ListItemIcon>{resource.icon}</ListItemIcon>
                        <ListItemText
                          primary={resource.label}
                          secondary={resource.name}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  功能特性
                </Typography>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="自动识别数据库表结构" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="支持数据查看、搜索、筛选" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="智能字段类型识别和展示" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="图片预览和 JSON 格式化" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="时间戳自动格式化" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircleIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary="ID 字段快速复制" />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </RefineProvider>
  );
}
