import React, { useState } from "react";
import { Button, Card } from "antd";
import { useInterval } from "ahooks";
import styles from "./Counter.module.css";

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useInterval(
    () => {
      setCount((c) => c + 1);
    },
    running ? 100 : undefined
  );

  const handleStartStop = () => {
    setRunning(!running);
  };

  const handleReset = () => {
    setCount(0);
    setRunning(false);
  };

  return (
    <Card title="Counter" className={styles.counterCard}>
      <div className={styles.count}>{count}</div>
      <div className={styles.buttons}>
        <Button type="primary" onClick={handleStartStop}>
          {running ? "停止" : "开始"}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </div>
    </Card>
  );
};

export default Counter;
