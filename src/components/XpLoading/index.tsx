import { Spin } from 'antd';
import React from 'react';
import type { FC, PropsWithChildren } from 'react';
import styles from './index.less';

const XpLoading: FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <div className={styles['spin-wrapper']}>
      <Spin spinning={true}>{children}</Spin>
    </div>
  );
};

export default XpLoading;
