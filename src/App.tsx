import React from 'react';
import { Button } from 'antd';

import Test from '@/components/test';

import './App.less';

function App() {
  return (
    <div className="App">
      <Test />
      <Button type="primary">button</Button>
    </div>
  );
}

export default App;
