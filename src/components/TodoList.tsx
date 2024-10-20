import React, { useState } from 'react';
import { Card, Input, Button, List, Checkbox, Typography } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './TodoList.module.css';

const { Text } = Typography;

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const addTodo = () => {
    if (inputText.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputText.trim(), completed: false }]);
      setInputText('');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const startEditing = (id: number) => {
    setEditingId(id);
  };

  const finishEditing = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
    setEditingId(null);
  };

  return (
    <Card title="TodoList" className={styles.todoListCard}>
      <div className={styles.inputSection}>
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onPressEnter={addTodo}
          placeholder="添加新任务"
        />
        <Button onClick={addTodo} type="primary">
          添加
        </Button>
      </div>
      <List
        className={styles.todoList}
        dataSource={todos}
        renderItem={(todo) => (
          <List.Item
            actions={[
              <Button icon={<EditOutlined />} onClick={() => startEditing(todo.id)} />,
              <Button icon={<DeleteOutlined />} onClick={() => deleteTodo(todo.id)} />
            ]}
          >
            <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {editingId === todo.id ? (
              <Input
                defaultValue={todo.text}
                onPressEnter={(e) => finishEditing(todo.id, e.currentTarget.value)}
                onBlur={(e) => finishEditing(todo.id, e.currentTarget.value)}
                autoFocus
              />
            ) : (
              <Text delete={todo.completed}>{todo.text}</Text>
            )}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default TodoList;