import React, { FC } from 'react';
// import './test.less';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

import css from './test.module.less';

import fileHelp from '@/utils/file-help';
// import { remote } from 'electron';
const { remote } = window.require('electron');
const path = window.require('path');

const rootPath = remote.app.getAppPath();

const Test: FC = () => {
  const history = useHistory();

  const onFileClick = () => {
    fileHelp
      .readFile(path.join(rootPath, 'public', 'index.html'))
      .then((res: string) => console.log(res));
  };

  const onDialogClick = () => {
    const res = remote.dialog.showOpenDialogSync({
      title: '选择文件',
      properties: ['openFile', 'openDirectory', 'multiSelections']
    });
    console.log(res);
  };
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

      <Button onClick={onFileClick}>file</Button>

      <Button onClick={onDialogClick}>open dialog</Button>
    </div>
  );
};

export default Test;
