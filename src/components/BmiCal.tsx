import React, { useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import styles from './BmiCal.module.css';

const BmiCal: React.FC = () => {
  const [bmi, setBmi] = useState<number | null>(null);

  const onFinish = (values: { height: string; weight: string }) => {
    const height = parseFloat(values.height) / 100; // 转换为米
    const weight = parseFloat(values.weight);
    const calculatedBmi = weight / (height * height);
    setBmi(parseFloat(calculatedBmi.toFixed(2)));
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return '偏瘦';
    if (bmi < 24) return '正常';
    if (bmi < 28) return '偏胖';
    return '肥胖';
  };

  return (
    <Card title="BmiCal" className={styles.bmiCard}>
      <Form name="bmi_calculator" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="height"
          label="身高 (cm)"
          rules={[{ required: true, message: '请输入您的身高' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="weight"
          label="体重 (kg)"
          rules={[{ required: true, message: '请输入您的体重' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            计算 BMI
          </Button>
        </Form.Item>
      </Form>
      {bmi !== null && (
        <div className={styles.result}>
          <p>您的 BMI 是: {bmi}</p>
          <p>体型: {getBmiCategory(bmi)}</p>
        </div>
      )}
    </Card>
  );
};

export default BmiCal;