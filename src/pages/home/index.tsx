import React, { FC } from 'react';

import HeaderAll from '@/components/header-all';

import css from './index.module.less';

const Home: FC = () => {
  return (
    <div className={css['home-wrapper']}>
      <HeaderAll />
    </div>
  );
};

export default Home;
