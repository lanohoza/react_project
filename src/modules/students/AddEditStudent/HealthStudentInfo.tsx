

'use client';
import React, { useEffect, useState } from 'react';

import { Col, DatePicker, Form, Input, InputNumber, Row, Select, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useStudentContext } from '../StudentContextProvider';
import { ModeComponent } from '@core/types/models/core/models';


const HealthStudentInfo = () => {

    const { modeAddEditViewModel } = useStudentContext();
    const [healthProblemRequire, setHealthProblemRequire] = useState<boolean>(false);
    const { Option } = Select;
    const onChangeIsDisease = (value) => {
        setHealthProblemRequire(value);
    }
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 10 }}
                        name='isDisease'
                        label='لديه مرض مزمن'
                    >
                        <Select onChange={onChangeIsDisease} disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true}>نعم </Option>
                            <Option value={false} >لا </Option>
                        </Select>
                    </Form.Item>
                </Col>

            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}  >
                <Col span={24}>
                    <Form.Item className='form-field' labelAlign={'left'} labelCol={{ span: 5 }} name="healthProblem" label="معلومات المشكلة الصحية" rules={[{ required: healthProblemRequire }]}>
                        <TextArea disabled={modeAddEditViewModel === ModeComponent.view} />
                    </Form.Item>
                </Col>

            </Row>



        </>
    );
};

export default HealthStudentInfo;
