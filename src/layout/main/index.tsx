import React, { FC, ReactNode } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { ProfileOutlined, UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';

import css from './index.module.less';

const { Content, Sider } = Layout;

interface ILayoutMainProps {
  children: ReactNode;
}

interface MenuInfo {
  key: React.Key;
  // keyPath: React.Key[];
  // item: React.ReactInstance;
  // domEvent: React.MouseEvent<HTMLElement>;
}

const LayoutMain: FC<ILayoutMainProps> = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();

  const handleMenuClick = ({ key }: MenuInfo) => {
    const path = key as string;
    history.push(path);
  };

  return (
    <Layout className={css['layout-main-wrapper']}>
      <Layout>
        <Sider width={200} className="site-layout-background" style={{ background: '#f0f2f5' }}>
          <div className={css['user-panel']}>
            <div className={css['name']}>zty</div>
            <div className={css['info']}>180G/200G</div>
          </div>
          <Menu
            mode="inline"
            className={css['menu']}
            selectedKeys={[pathname]}
            onClick={handleMenuClick}
          >
            <Menu.Item key="/admin/home" icon={<ProfileOutlined />}>
              全部文件
            </Menu.Item>
            <Menu.ItemGroup key="g1" title="传输列表">
              <Menu.Item key="/admin/upload" icon={<UploadOutlined />}>
                正在上传
              </Menu.Item>
              <Menu.Item key="/admin/complete" icon={<CheckCircleOutlined />}>
                传输完成
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Content
            className="site-layout-background"
            style={{
              padding: 10,
              margin: 0,
              minHeight: 280
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
