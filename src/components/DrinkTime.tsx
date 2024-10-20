import React, { useState } from 'react';
import { Card, Input, Button, Select, Typography, Space, Tag } from 'antd';
import { useInterval, useBoolean } from 'ahooks';
import styles from './DrinkTime.module.css';

const { Option } = Select;
const { Title } = Typography;

const DrinkTime: React.FC = () => {
  const [players, setPlayers] = useState<string[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [speed, setSpeed] = useState(20);
  const [running, { setTrue: startRotation, setFalse: stopRotation }] = useBoolean(false);

  useInterval(
    () => {
      const randomIndex = Math.floor(Math.random() * players.length);
      setSelectedPlayer(players[randomIndex]);
    },
    running ? speed : undefined
  );

  const handleAddPlayer = () => {
    if (newPlayer && !players.includes(newPlayer)) {
      setPlayers([...players, newPlayer]);
      setNewPlayer('');
    }
  };

  const handleReset = () => {
    setPlayers([]);
    setSelectedPlayer(null);
    stopRotation();
  };

  return (
    <Card title="DrinkTime" className={styles.drinkTimeCard}>
      <div className={styles.playerList}>
        <Title level={4}>参与者:</Title>
        <Space wrap>
          {players.map((player) => (
            <Tag
              key={player}
              color={player === selectedPlayer ? '#108ee9' : 'default'}
              className={styles.playerTag}
            >
              {player}
            </Tag>
          ))}
        </Space>
      </div>
      <div className={styles.controls}>
        <Input
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onPressEnter={handleAddPlayer}
          placeholder="添加新参与者"
        />
        <Button onClick={handleAddPlayer}>添加</Button>
      </div>
      <div className={styles.actionButtons}>
        <Select value={speed} onChange={setSpeed}>
          <Option value={100}>普通</Option>
          <Option value={20}>快速</Option>
        </Select>
        <Button type="primary" onClick={running ? stopRotation : startRotation}>
          {running ? '停止' : '开始'}
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </div>
    </Card>
  );
};

export default DrinkTime;