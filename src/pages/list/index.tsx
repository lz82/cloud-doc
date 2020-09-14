import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import useContextmenu from '@/hooks/use-contextmenu';

const List: FC = () => {
  const history = useHistory();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const clickedElement = useContextmenu([
    {
      label: '打开',
      click: () => {
        console.log('open...', clickedElement);
      }
    },
    {
      label: '重命名',
      click: () => {
        console.log('rename...', clickedElement);
      }
    }
  ]);

  return (
    <div>
      this is list
      <ul>
        {arr.map((item) => (
          <li key={item} className="li-item" data-id={item} data-title={item}>
            {item}
          </li>
        ))}
      </ul>
      <div>
        <Button
          onClick={() => {
            history.push('/test');
          }}
        >
          go test
        </Button>
      </div>
    </div>
  );
};

export default List;
