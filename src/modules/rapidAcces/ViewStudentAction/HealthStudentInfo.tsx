

'use client';
import React, { useEffect, useState } from 'react';

import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Typography, message } from 'antd';


const HealthStudentInfo = ({student}) => {
    const { Text } = Typography;

    return (
        <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 10 }}
                    label="لديه مرض مزمن"
                >
                    <Text>
                        {student?.isDisease ? 'نعم' : 'لا'}
                    </Text>
                </Form.Item>
            </Col>
        </Row>

        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 5 }}
                    label="معلومات المشكلة الصحية"
                >
                    <Text>{student?.healthProblem || '-'}</Text>
                </Form.Item>
            </Col>
        </Row>
    </>
    );
};

export default HealthStudentInfo;
