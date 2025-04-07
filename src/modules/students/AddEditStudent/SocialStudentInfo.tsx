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
    message,
} from 'antd';
import { useStudentContext } from '../StudentContextProvider';
import { ModeComponent } from '@core/types/models/core/models';

const SocialStudentInfo = () => {
    const { modeAddEditViewModel } = useStudentContext();

    const { Option } = Select;
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='fatherProfession'
                        label='مهنة الأب'
                    >
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='motherProfession'
                        label='مهنة الأم'
                    >
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                   
                        labelCol={{ span: 8 }}
                        name='tutorName'
                        label='إسم الكامل للولي'
                    >
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='tutorMobPhone'
                        rules={[
                            {
                                pattern: /^(?:\+213|0)(5|6|7)[0-9]{8}$/, // Algerian phone number pattern
                                message: 'يرجى إدخال رقم هاتف جزائري صالح (مثل +213 5XX XXX XXX أو 0XX XXX XXX)',
                            },
                        ]}
                        label='رقم هاتف الولي'
                    >
                        <Input
                            type='phone'
                            disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>

                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='tutorEmail'
                        label='البريد الالكتروني للولي'
                    >
                        <Input
                            type='email'
                            disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                    </Form.Item>
                </Col>         <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='isNeed'
                        label='معوز'
                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true}>نعم </Option>
                            <Option value={false}>لا </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='isFatherOrphan'
                        label='يتيم الأب'
                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true}>نعم </Option>
                            <Option value={false} >لا </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='isMotherOrphan'
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        label='يتيم الام'

                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true}>نعم </Option>
                            <Option value={false} >لا </Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default SocialStudentInfo;
