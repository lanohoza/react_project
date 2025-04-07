'use client';
import React, { useState } from 'react';

import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { Form, Select, Upload, message } from 'antd';
import { useClasseActionsContext } from '../../classes/ClassContextProvider';
import { useNoteActionsContext, useNoteContext } from '../NoteContextProvider';
import { InboxOutlined } from '@ant-design/icons';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { importFile } from '@core/services/NoteService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getAllTrimestresByYear } from '@core/services/TrimestreService';

const { Dragger } = Upload;

const ExportNoteModel = () => {
    const infoViewActionsContext = useInfoViewActionsContext();

    const { setOpenExportModel, reload } = useNoteActionsContext();
    const { classes, openExportModel ,years} = useNoteContext();

    const { Option } = Select;
    const [form] = Form.useForm();

    const handleUpload = async () => {
        const values = await form.validateFields();
        const { idClasse } = values;

    };

    return (
        <>
            <StyledModal
                footer={false}
                open={openExportModel}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={"40%"}
                onCancel={() => { setOpenExportModel(false); }}

            >
                <StyledForm form={form} onFinish={handleUpload}>
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            تحميل نموذج ملف النتائج
                        </StyledFormHeaderTitle>
                    </StyledFormHeader>
                    <StyledFormContent>
                        <StyledFormContentItem>
                            <StyledFormContentField>
                                <Form.Item
                                    name="idTrimestre"
                                    label="الموسم الدراسي"
                                    labelCol={{ span: 6 }}
                                    labelAlign={'left'}

                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder='الموسم الدراسي'
                                    >
                                        {years.map((year: Year) => {
                                            return (
                                                <Option value={year.id} key={year.id}>
                                                    {year.title}
                                                </Option>
                                            );
                                        })}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    labelAlign={'left'}
                                    label="القسم"
                                    name="idClasse"
                                    labelCol={{ span: 6 }}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder='القسم'
                                    >
                                        {classes.map((classe: GetClasseDto) => (
                                            <Option value={classe.id} key={classe.id}>
                                                {classe.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                            </StyledFormContentField>
                        </StyledFormContentItem>
                    </StyledFormContent>
                    <StyledFormFooter>
                        <StyledFormBtn type='primary' htmlType='submit' size='middle' >
                            تحميل الملف
                        </StyledFormBtn>
                    </StyledFormFooter>
                </StyledForm>
            </StyledModal>
        </>
    );
};

export default ExportNoteModel;
