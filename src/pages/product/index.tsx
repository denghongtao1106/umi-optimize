import { Button, Spin, Table, Typography } from 'antd';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import { dynamic, history } from 'umi';
import styles from './index.less';

/**
 * 模板页
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/ban-types
type ProductProps = {};

const Product: FC<ProductProps> & { title: string } = () => {
  const [base, setBase] = useState(1);

  const init = () => {
    setBase(2);
    console.log(base);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const goBack = () => {
    history.push('/');
  };

  return (
    <div className={styles['Product-page']}>
      <Typography.Link>我是标题</Typography.Link>
      <Button type="primary" onClick={goBack}>
        返回
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
};

Product.title = '模版';

export default Product;

