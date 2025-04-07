

'use client';
import React, { useEffect, useState } from 'react';

import { Col, DatePicker, Form, Input, InputNumber, Row, Select, message } from 'antd';
import { useStudentContext } from '../StudentContextProvider';
import { Gender } from '@core/types/enums/core';
import { ModeComponent } from '@core/types/models/core/models';


const MainStudentInfo = () => {
    const { modeAddEditViewModel, initialData } = useStudentContext();
    const [codeStudent, setCodeStudent] = useState<string>(initialData?.codeStudent || ""); // State for audiences

    const { Option } = Select; return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name="nbrRakmana" label="الرقم التعريفي المدرسي" rules={[{ required: true }]}>
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
                <Col span={12}>

                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name='codeStudent' label="رمز التلميذ" >
                        <Input value={codeStudent} disabled />
                    </Form.Item>

                </Col>
            </Row>


            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name="firstName" label="الاسم" rules={[{ required: true }]}>
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name='lastName' label="اللقب" rules={[{ required: true }]}>
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >

                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name='birthDate' label="تاريخ الميلاد" rules={[{ required: true }]}>
                        <DatePicker disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name='placeBirth' label="مكان الميلاد" rules={[{ required: true }]} >
                        <Input disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                <Col span={12}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 8 }} name="sexe" label="الجنس" rules={[{ required: true }]}>
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            {Object.keys(Gender).map(key => (
                                <Option key={key} value={key}>
                                    {Gender[key]}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>


        </>
    );
};

export default MainStudentInfo;
