import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  CalculatorOutlined, 
  ClockCircleOutlined, 
  CoffeeOutlined, 
  FieldTimeOutlined, 
  UnorderedListOutlined 
} from '@ant-design/icons';
import styles from './Home.module.css';

const { Title, Paragraph } = Typography;

const features = [
  { icon: <CalculatorOutlined />, title: 'BMI Calculator', description: '快速计算体质指数', route: '/practice/bmi' },
  { icon: <ClockCircleOutlined />, title: 'Counter', description: '简单的计数器工具', route: '/practice/counter' },
  { icon: <CoffeeOutlined />, title: 'Drink Time', description: '随机选择饮酒人员', route: '/practice/drinktime' },
  { icon: <FieldTimeOutlined />, title: 'Countdown', description: '精确的倒计时器', route: '/practice/countdown' },
  { icon: <UnorderedListOutlined />, title: 'Todo List', description: '管理你的待办事项', route: '/practice/todolist' },
];

const Home: React.FC = () => {
  return (
    <div className={styles.homeContainer}>
      <Typography className={styles.header}>
        <Title>Hello React 👋</Title>
        <Paragraph className={styles.subtitle}>
          🚀 This Site Coded by Cursor AI in 1h! 💻✨
        </Paragraph>
      </Typography>

      <Row gutter={[16, 16]} className={styles.featureList}>
        {features.map((feature, index) => (
          <Col xs={24} sm={12} md={8} key={index}>
            <Card 
              hoverable 
              className={styles.featureCard}
            >
              <div className={styles.iconWrapper}>{feature.icon}</div>
              <Title level={4}>{feature.title}</Title>
              <Paragraph>{feature.description}</Paragraph>
              <Link to={feature.route}>
                <Button type="primary">Try Now</Button>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;