

'use client';
import React, { useEffect, useState } from 'react';

import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Typography, message } from 'antd';
import { Gender } from '@core/types/enums/core';


const MainStudentInfo = ({ student }) => {
    const { Text } = Typography;
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item label="الرقم التعريفي المدرسي">
                        <Text>{student?.nbrRakmana}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="رمز التلميذ">
                        <Text>{student?.codeStudent}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item label="الاسم">
                        <Text>{student?.firstName}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="اللقب">
                        <Text>{student?.lastName}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item label="تاريخ الميلاد">
                        <Text>{student?.birthDate}</Text>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="مكان الميلاد">
                        <Text>{student?.placeBirth}</Text>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                    <Form.Item label="الجنس">
                        <Text>{Gender[student?.sexe]}</Text>
                    </Form.Item>
                </Col>
            </Row>
        </>

    );
};

export default MainStudentInfo;
