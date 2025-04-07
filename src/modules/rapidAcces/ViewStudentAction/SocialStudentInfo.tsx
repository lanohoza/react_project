'use client';
import React, { useEffect, useState } from 'react';

import {
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Typography,
    message,
} from 'antd';
import { ModeComponent } from '@core/types/models/core/models';

const SocialStudentInfo = ({student}) => {
    const { Text } = Typography;

    return (
        <>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="مهنة الأب"
                    >
                        <Text>{student?.fatherProfession}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="مهنة الأم"
                    >
                        <Text>{student?.motherProfession}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="إسم الكامل للولي"
                    >
                        <Text>{student?.tutorName}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="رقم هاتف الولي"
                    >
                        <Text>{student?.tutorMobPhone}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="البريد الالكتروني للولي"
                    >
                        <Text>{student?.tutorEmail}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="معوز"
                    >
                        <Text>{student?.isNeed ? 'نعم' : 'لا'}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="يتيم الأب"
                    >
                        <Text>{student?.isFatherOrphan ? 'نعم' : 'لا'}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label="يتيم الام"
                    >
                        <Text>{student?.isMotherOrphan ? 'نعم' : 'لا'}</Text>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default SocialStudentInfo;
