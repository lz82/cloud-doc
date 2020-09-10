import React, { FC } from 'react';
// import './test.less';
import css from './test.module.less';

const test: FC = () => {
  return <h1 className={css['test-wrapper']}>test aaaa</h1>;
};

export default test;
