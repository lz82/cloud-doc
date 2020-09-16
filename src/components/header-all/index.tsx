import React, { FC } from 'react';

import { Button, Space } from 'antd';
import { UploadOutlined, FolderAddOutlined } from '@ant-design/icons';

import css from './index.module.less';

const HeaderAll: FC = () => {
  return (
    <div className={css['header-all-wrapper']}>
      <div className="left">
        <Space>
          <Button type="primary" icon={<UploadOutlined />} size="small">
            上传
          </Button>

          <Button icon={<FolderAddOutlined />} size="small">
            新建文件夹
          </Button>
        </Space>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default HeaderAll;
