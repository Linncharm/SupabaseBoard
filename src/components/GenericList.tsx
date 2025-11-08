'use client';

import { useList, useNavigation } from '@refinedev/core';
import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  List,
  ShowButton,
  EditButton,
  DeleteButton,
} from '@refinedev/mui';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import dayjs from 'dayjs';

interface GenericListProps {
  resource: string;
  enableEdit?: boolean;
  enableDelete?: boolean;
}

export function GenericList({ resource, enableEdit = true, enableDelete = false }: GenericListProps) {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 25,
  });

  const { data, isLoading } = useList({
    resource,
    pagination: {
      current: paginationModel.page + 1,
      pageSize: paginationModel.pageSize,
    },
  });

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const renderCellValue = (value: any, field: string): React.ReactNode => {
    if (value === null || value === undefined) {
      return <span style={{ color: '#999' }}>-</span>;
    }

    // ID 字段 - 显示前8位 + 复制按钮
    if (field === 'id' || field.endsWith('_id')) {
      const displayValue = typeof value === 'string' && value.length > 16
        ? `${value.substring(0, 8)}...${value.substring(value.length - 4)}`
        : value;

      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <span>{displayValue}</span>
          <Tooltip title="复制完整 ID">
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
    if (field.includes('_at') || field.includes('created') || field.includes('updated')) {
      if (typeof value === 'number') {
        // Unix timestamp (秒或毫秒)
        const timestamp = value > 10000000000 ? value : value * 1000;
        return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss');
      }
      if (typeof value === 'string') {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
      }
    }

    // URL 字段 - 图片预览
    if ((field.includes('url') || field.includes('image')) && typeof value === 'string') {
      if (value.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
        return (
          <Tooltip title={<img src={value} alt="preview" style={{ maxWidth: '300px' }} />}>
            <Chip icon={<ImageIcon />} label="查看图片" size="small" />
          </Tooltip>
        );
      }
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>
          {value.length > 30 ? `${value.substring(0, 30)}...` : value}
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

    // JSON 对象
    if (typeof value === 'object') {
      return (
        <Tooltip title={<pre>{JSON.stringify(value, null, 2)}</pre>}>
          <Chip label="查看 JSON" size="small" variant="outlined" />
        </Tooltip>
      );
    }

    // 长文本
    if (typeof value === 'string' && value.length > 50) {
      return (
        <Tooltip title={value}>
          <span>{value.substring(0, 50)}...</span>
        </Tooltip>
      );
    }

    return value;
  };

  const columns: GridColDef[] = data?.data?.[0]
    ? Object.keys(data.data[0]).map((key) => ({
        field: key,
        headerName: key
          .split('_')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' '),
        flex: 1,
        minWidth: 150,
        renderCell: (params) => renderCellValue(params.value, key),
      }))
    : [];

  // 添加操作列
  if (columns.length > 0) {
    columns.push({
      field: 'actions',
      headerName: '操作',
      sortable: false,
      filterable: false,
      minWidth: 150,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ShowButton hideText recordItemId={params.row.id} />
          {enableEdit && <EditButton hideText recordItemId={params.row.id} />}
          {enableDelete && <DeleteButton hideText recordItemId={params.row.id} />}
        </Box>
      ),
    });
  }

  return (
    <List>
      <DataGrid
        rows={data?.data || []}
        columns={columns}
        loading={isLoading}
        pageSizeOptions={[10, 25, 50, 100]}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={data?.total || 0}
        paginationMode="server"
        slots={{
          toolbar: GridToolbar,
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        autoHeight
        disableRowSelectionOnClick
      />
    </List>
  );
}
