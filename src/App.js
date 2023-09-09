import React, { useState } from 'react';
import StrengthMeter from './StrengthMeter';

import { ConfigProvider, DatePicker, Input, Space, Card } from 'antd';

function App() {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          colorLink: '00b96b'
        }
      }}
    >
      <Card
        title="Password Strength Checker"
        bordered={false}
        style={{
          width: '100%',
          margin: 18
        }}
      >
        <Space direction="vertical">
          <Input
            size='large'
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            size='large'
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <DatePicker size='large' onChange={(date, dateString) => setDate(dateString)} />
          <Input.Password size='large' placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Space>
        <StrengthMeter
          password={password}
          name={name}
          email={email}
          date={date}
        />
      </Card>
    </ConfigProvider>
  );
}

export default App;
