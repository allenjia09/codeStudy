import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, ExperimentOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import type { MenuProps } from 'antd';
import styles from './MainLayout.module.css';
import logo from '../assets/react.svg';

const { Header, Content } = Layout;

const menuItems: MenuProps['items'] = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: <Link to="/">Home</Link>,
  },
  {
    key: '/practice',
    icon: <ExperimentOutlined />,
    label: <Link to="/practice">Practice</Link>,
  },
];

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.headerLeft}>
          <img src={logo} alt="Logo" className={styles.logo} />
          <Link to="/" className={styles.title}>Hello React</Link>
        </div>
        <Menu 
          theme="dark" 
          mode="horizontal" 
          items={menuItems} 
          className={styles.menu}
          selectedKeys={[location.pathname]}
        />
      </Header>
      <Content className={styles.content}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default MainLayout;