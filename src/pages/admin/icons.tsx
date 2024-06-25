import React, { ReactElement } from 'react';
import {
  HomeOutlined,
  UserOutlined,
  BankOutlined,
  AuditOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  ApiOutlined,
  PieChartOutlined,
  SettingOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
  SnippetsOutlined,

  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  CloseOutlined,
  CheckOutlined,
  StarOutlined,
  StarFilled,
  LikeOutlined,
  CalendarOutlined,
  FileTextOutlined,

} from '@ant-design/icons'

// 动态图标映射,用字符串索引图标组件
interface IconMap {
  [key: string]: ReactElement;
}

export const IconMaps: IconMap = {
  "PieChartOutlined": <PieChartOutlined />,
  "UserOutlined": <UserOutlined />,
  "HomeOutlined": <HomeOutlined />,
  "BankOutlined": <BankOutlined />,
  "AuditOutlined": <AuditOutlined />,
  "DashboardOutlined": <DashboardOutlined />,
  "InfoCircleOutlined": <InfoCircleOutlined />,
  "ApiOutlined": <ApiOutlined />,
  "SettingOutlined": <SettingOutlined />,
  "BellOutlined": <BellOutlined />,
  "MenuOutlined": <MenuOutlined />,
  "SnippetsOutlined": <SnippetsOutlined />,
  "MenuFoldOutlined": <MenuFoldOutlined />,
  "MenuUnfoldOutlined": <MenuUnfoldOutlined />,

  "SearchOutlined": <SearchOutlined />,
  "PlusOutlined": <PlusOutlined />,
  "EditOutlined": <EditOutlined />,
  "DeleteOutlined": <DeleteOutlined />,
  "EllipsisOutlined": <EllipsisOutlined />,
  "CloseOutlined": <CloseOutlined />,
  "CheckOutlined": <CheckOutlined />,
  "StarOutlined": <StarOutlined />,
  "StarFilled": <StarFilled />,
  "LikeOutlined": <LikeOutlined />,
  "CalendarOutlined": <CalendarOutlined />,
  "FileTextOutlined": <FileTextOutlined />,

};

type Props = {
  iconName: string; // 图标名称，对应 iconMaps 中的键
};

const DynamicIcon: React.FC<Props> = ({ iconName }): ReactElement => {
  // 通过 iconName 从映射中获取对应的图标组件
  const iconComponent = IconMaps[iconName] || <PieChartOutlined />;  // 默认使用PieChartOutlined

  return iconComponent;
  
};

export default DynamicIcon;
