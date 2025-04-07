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
    message,
} from 'antd';
import { useStudentContext } from '../StudentContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { StudyType } from '@core/types/enums/core';

const StudyStudentInfo = () => {
    const { modeAddEditViewModel, classes } = useStudentContext();

    const { Option } = Select;
    return (
        <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                {modeAddEditViewModel === ModeComponent.create && (
                    <Col span={12}>
                        <Form.Item
                            className='form-field'
                            labelAlign={'left'}
                            labelCol={{ span: 8 }}
                            name='idClasse'
                            label='القسم'
                            rules={[{ required: true }]}
                        >
                            <Select>
                                {classes.map((classe: GetClasseDto) => {
                                    return (
                                        <Option value={classe.id} key={classe.id}>
                                            {classe.title}
                                        </Option>
                                    );
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                )}
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='isMain'
                        label='مسؤول القسم'
                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true} key={1}>
                                نعم
                            </Option>
                            <Option value={false} key={0}>
                                لا
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='repeatClasseActual'
                        label='معيد السنة الحالية'
                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            <Option value={true} key={1}>
                                نعم
                            </Option>
                            <Option value={false} key={0}>
                                لا
                            </Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='dateStudentInscription'
                        label='تاريخ التسجيل'
                    >
                        <DatePicker
                            disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='schoolingSystem'
                        label='نوع التمدرس'
                    >
                        <Select disabled={modeAddEditViewModel === ModeComponent.view}>
                            {Object.keys(StudyType).map((key) => (
                                <Option key={key} value={key}>
                                    {StudyType[key]}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='nbrRepeatClasse'
                        label='عدد سنوات الاعادة'
                    >
                        <InputNumber
                            disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default StudyStudentInfo;
