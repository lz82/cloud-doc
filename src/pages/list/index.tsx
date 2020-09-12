import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';
const List: FC = () => {
  const history = useHistory();
  return (
    <div>
      this is list
      <Button
        onClick={() => {
          history.push('/test');
        }}
      >
        go test
      </Button>
    </div>
  );
};

export default List;
