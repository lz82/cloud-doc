import React, { FC } from 'react';

import css from './index.module.less';

import loadingImg from './img/loading.gif';

const Loading: FC = () => {
  return (
    <div className={css['loading-mask']}>
      <img src={loadingImg} className={css['loading-icon']} alt="loading..." />
    </div>
  );
};

export default Loading;
