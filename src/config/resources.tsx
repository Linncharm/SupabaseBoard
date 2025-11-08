import TableChartIcon from '@mui/icons-material/TableChart';
import PeopleIcon from '@mui/icons-material/People';
import MoneyIcon from '@mui/icons-material/AttachMoney';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import LayoutIcon from '@mui/icons-material/DashboardCustomize';
import PaymentIcon from '@mui/icons-material/Payment';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HealthIcon from '@mui/icons-material/HealthAndSafety';
import StarIcon from '@mui/icons-material/Star';

export interface ResourceConfig {
  name: string;
  label: string;
  icon: React.ReactNode;
  list: string;
  show?: string;
  edit?: string;
  create?: string;
}

export const resources: ResourceConfig[] = [
  {
    name: 'user_credits',
    label: '用户积分',
    icon: <PeopleIcon />,
    list: '/user_credits',
    show: '/user_credits/show/:id',
    edit: '/user_credits/edit/:id',
  },
  {
    name: 'credit_transactions',
    label: '积分交易记录',
    icon: <MoneyIcon />,
    list: '/credit_transactions',
    show: '/credit_transactions/show/:id',
  },
  {
    name: 'room_layouts',
    label: '房间布局',
    icon: <LayoutIcon />,
    list: '/room_layouts',
    show: '/room_layouts/show/:id',
  },
  {
    name: 'fengshui_advice',
    label: '风水建议',
    icon: <StarIcon />,
    list: '/fengshui_advice',
    show: '/fengshui_advice/show/:id',
  },
  {
    name: 'subscriptions',
    label: '订阅管理',
    icon: <SubscriptionsIcon />,
    list: '/subscriptions',
    show: '/subscriptions/show/:id',
    edit: '/subscriptions/edit/:id',
  },
  {
    name: 'plans',
    label: '套餐计划',
    icon: <CardMembershipIcon />,
    list: '/plans',
    show: '/plans/show/:id',
    edit: '/plans/edit/:id',
    create: '/plans/create',
  },
  {
    name: 'payment_history',
    label: '支付历史',
    icon: <PaymentIcon />,
    list: '/payment_history',
    show: '/payment_history/show/:id',
  },
  {
    name: 'user_invitations',
    label: '用户邀请',
    icon: <PersonAddIcon />,
    list: '/user_invitations',
    show: '/user_invitations/show/:id',
  },
  {
    name: 'feedback',
    label: '用户反馈',
    icon: <FeedbackIcon />,
    list: '/feedback',
    show: '/feedback/show/:id',
  },
  {
    name: 'feedback_credits',
    label: '反馈积分奖励',
    icon: <MoneyIcon />,
    list: '/feedback_credits',
    show: '/feedback_credits/show/:id',
  },
  {
    name: '_health',
    label: '系统健康检查',
    icon: <HealthIcon />,
    list: '/_health',
    show: '/_health/show/:id',
  },
];

// 表名类型
export type TableName =
  | 'user_credits'
  | 'credit_transactions'
  | 'room_layouts'
  | 'fengshui_advice'
  | 'subscriptions'
  | 'plans'
  | 'payment_history'
  | 'user_invitations'
  | 'feedback'
  | 'feedback_credits'
  | '_health';
