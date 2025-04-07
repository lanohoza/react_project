'use client';
import React, { useEffect, useState } from 'react';

import {
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
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { StudyType } from '@core/types/enums/core';

const StudyStudentInfo = ({student}) => {
    const { Text } = Typography;

    const { Option } = Select;
    return (
        <>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="القسم"
                >
                    <Text>{student?.classeTitle}</Text>
                </Form.Item>
            </Col>
            
            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="مسؤول القسم"
                >
                    <Text>{student?.isMain ? 'نعم' : 'لا'}</Text>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="معيد السنة الحالية"
                >
                    <Text>{student?.repeatClasseActual ? 'نعم' : 'لا'}</Text>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="تاريخ التسجيل"
                >
                    <Text>{student?.dateStudentInscription}</Text>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="نوع التمدرس"
                >
                    <Text>{StudyType[student?.schoolingSystem]}</Text>
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item
                    className='form-field'
                    labelAlign={'left'}
                    labelCol={{ span: 8 }}
                    label="عدد سنوات الاعادة"
                >
                    <Text>{student?.nbrRepeatClasse}</Text>
                </Form.Item>
            </Col>
        </Row>
    </>
    );
};

export default StudyStudentInfo;
