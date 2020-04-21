import React from 'react'
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default () => (
    <Spin indicator={<LoadingOutlined style={{ position: 'absolute', left: '50%', top: '50%', fontSize: 24 }} />} />
)