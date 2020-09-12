import React, { FC } from 'react';
// import './test.less';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
import css from './test.module.less';

const Test: FC = () => {
  const history = useHistory();
  return (
    <div className={css['test-wrapper']}>
      <div>test aaaa</div>
      <Button
        onClick={() => {
          history.push('/list');
        }}
      >
        go to list
      </Button>
    </div>
  );
};

export default Test;
