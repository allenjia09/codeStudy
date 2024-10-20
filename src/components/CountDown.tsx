import React, { useState, useRef, useEffect } from 'react';
import { Card, DatePicker, Button, Typography } from 'antd';
import dayjs from 'dayjs';
import styles from './CountDown.module.css';

const { Title } = Typography;

const CountDown: React.FC = () => {
  const [targetDate, setTargetDate] = useState<number | undefined>();
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning && targetDate) {
      intervalRef.current = window.setInterval(() => {
        const now = Date.now();
        const difference = targetDate - now;
        if (difference <= 0) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          setRemainingTime(0);
        } else {
          setRemainingTime(difference);
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, targetDate]);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    if (date) {
      setTargetDate(date.valueOf());
      setRemainingTime(date.valueOf() - Date.now());
    } else {
      setTargetDate(undefined);
      setRemainingTime(0);
    }
    setIsRunning(false);
  };

  const handleStartPause = () => {
    if (!isRunning && !targetDate) {
      // If not running and no target date, do nothing
      return;
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTargetDate(undefined);
    setRemainingTime(0);
    setIsRunning(false);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  return (
    <Card title="CountDown" className={styles.countdownCard}>
      <div className={styles.inputSection}>
        <DatePicker
          showTime
          onChange={handleDateChange}
          disabled={isRunning}
          className={styles.datePicker}
        />
      </div>
      <div className={styles.countdownDisplay}>
        <Title level={2}>
          {days}天 {hours}时 {minutes}分 {seconds}秒
        </Title>
      </div>
      <div className={styles.controls}>
        <Button type="primary" onClick={handleStartPause} disabled={!targetDate}>
          {isRunning ? '暂停' : '开始'}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </div>
    </Card>
  );
};

export default CountDown;