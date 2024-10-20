import React from 'react';
import { Layout, Menu } from 'antd';
import { CalculatorOutlined, ClockCircleOutlined, CoffeeOutlined, FieldTimeOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Route, Routes, useNavigate } from 'react-router-dom';
import styles from './Practice.module.css';
import BmiCal from '../components/BmiCal';
import Counter from '../components/Counter';
import DrinkTime from '../components/DrinkTime';
import CountDown from '../components/CountDown';
import TodoList from '../components/TodoList';

const { Content, Sider } = Layout;

const Practice: React.FC = () => {
  const navigate = useNavigate();

  const items = [
    {
      key: 'bmi',
      icon: <CalculatorOutlined />,
      label: 'BmiCal',
    },
    {
      key: 'counter',
      icon: <ClockCircleOutlined />,
      label: 'Counter',
    },
    {
      key: 'drinktime',
      icon: <CoffeeOutlined />,
      label: 'DrinkTime',
    },
    {
      key: 'countdown',
      icon: <FieldTimeOutlined />,
      label: 'CountDown',
    },
    {
      key: 'todolist',
      icon: <UnorderedListOutlined />,
      label: 'TodoList',
    },
  ];

  const handleMenuClick = (info: { key: string }) => {
    navigate(`/practice/${info.key}`);
  };

  return (
    <Layout className={styles.practiceLayout}>
      <Sider width={200} className={styles.sider}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['bmi']}
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content className={styles.content}>
          <Routes>
            <Route path="bmi" element={<BmiCal />} />
            <Route path="counter" element={<Counter />} />
            <Route path="drinktime" element={<DrinkTime />} />
            <Route path="countdown" element={<CountDown />} />
            <Route path="todolist" element={<TodoList />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Practice;