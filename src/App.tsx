import React from 'react';
import { Button } from 'antd';

import Routers from '@/routes';

import './App.less';

function App() {
  return (
    <div className="App">
      <Routers />

      <Button
        onClick={() => {
          window.location.href = '/test';
        }}
      >
        change router
      </Button>
    </div>
  );
}

export default App;
