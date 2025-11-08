'use client';

import { useShow } from '@refinedev/core';
import { Show, NumberField, TextFieldComponent as TextField, BooleanField, DateField } from '@refinedev/mui';
import { Stack, Typography, Box, Chip, IconButton, Tooltip, Card, CardContent } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/zh-cn';

dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

interface GenericShowProps {
  resource: string;
  id: string;
}

export function GenericShow({ resource, id }: GenericShowProps) {
  const { queryResult } = useShow({
    resource,
    id,
  });

  const { data, isLoading } = queryResult;
  const record = data?.data;

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderFieldValue = (key: string, value: any): React.ReactNode => {
    if (value === null || value === undefined) {
      return <Typography color="text.secondary">-</Typography>;
    }

    // ID 字段
    if (key === 'id' || key.endsWith('_id')) {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              wordBreak: 'break-all',
            }}
          >
            {value}
          </Typography>
          <Tooltip title="复制">
            <IconButton
              size="small"
              onClick={() => handleCopyToClipboard(String(value))}
            >
              <ContentCopyIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      );
    }

    // 时间戳字段
    if (key.includes('_at') || key.includes('created') || key.includes('updated')) {
      if (typeof value === 'number') {
        const timestamp = value > 10000000000 ? value : value * 1000;
        return (
          <Box>
            <Typography>{dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(timestamp).fromNow()}
            </Typography>
          </Box>
        );
      }
      if (typeof value === 'string') {
        return (
          <Box>
            <Typography>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            <Typography variant="caption" color="text.secondary">
              {dayjs(value).fromNow()}
            </Typography>
          </Box>
        );
      }
    }

    // URL/图片字段
    if ((key.includes('url') || key.includes('image')) && typeof value === 'string') {
      if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return (
          <Box>
            <img
              src={value}
              alt={key}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                wordBreak: 'break-all',
                color: 'text.secondary',
              }}
            >
              {value}
            </Typography>
          </Box>
        );
      }
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1976d2', wordBreak: 'break-all' }}
        >
          {value}
        </a>
      );
    }

    // 布尔值
    if (typeof value === 'boolean') {
      return (
        <Chip
          label={value ? '是' : '否'}
          color={value ? 'success' : 'default'}
          size="small"
        />
      );
    }

    // JSON 对象/数组
    if (typeof value === 'object') {
      return (
        <Card variant="outlined">
          <CardContent>
            <pre
              style={{
                margin: 0,
                overflow: 'auto',
                fontSize: '0.85rem',
                maxHeight: '400px',
              }}
            >
              {JSON.stringify(value, null, 2)}
            </pre>
          </CardContent>
        </Card>
      );
    }

    // 数字
    if (typeof value === 'number') {
      return <Typography>{value.toLocaleString()}</Typography>;
    }

    // 长文本
    if (typeof value === 'string' && value.length > 200) {
      return (
        <Typography
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxHeight: '300px',
            overflow: 'auto',
            padding: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          {value}
        </Typography>
      );
    }

    return <Typography>{value}</Typography>;
  };

  const formatFieldName = (key: string): string => {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Show isLoading={isLoading}>
      <Stack spacing={3}>
        {record &&
          Object.entries(record).map(([key, value]) => (
            <Box key={key}>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                {formatFieldName(key)}
              </Typography>
              {renderFieldValue(key, value)}
            </Box>
          ))}
      </Stack>
    </Show>
  );
}
