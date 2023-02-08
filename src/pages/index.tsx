import React from 'react';
import styles from './index.less';
import { Button, DatePicker, Table } from 'antd';
import { history } from 'umi';

export default function IndexPage() {
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

  const goPage = () => {
    history.push('/product');
  };

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 24 }} onClick={goPage}>
        按钮
      </Button>
      <Table columns={columns} dataSource={dataSource}></Table>
    </div>
  );
}
