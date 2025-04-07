'use client';
import React, { useEffect, useState } from 'react';
import {
    StyledModal,
    StyledFormContent,
    StyledFormContentItem,
    StyledForm,
    StyledFormHeader,
    StyledFormHeaderTitle,
    StyledFormContentField,
    StyledFormFooter,
    StyledFormBtn
} from './index.styled';
import { Col, Divider, Form, InputNumber, message, Row } from 'antd';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Note, ResultDto } from '@core/types/models/note/NoteTypes';
import { saveNote } from '@core/services/NoteService';
import { ModeComponent } from '@core/types/models/core/models';
import { useNoteActionsContext, useNoteContext } from '../NoteContextProvider';

const AddEditClass = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useNoteActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditViewModel, subjects, selectedIdTrimestre } = useNoteContext();
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialData) {
            const originalObject: { [key: string]: number } = initialData?.results?.reduce((acc, obj) => {
                acc[obj.idSubjectLevel.toString()] = obj.value;
                return acc;
            }, {});
            form.setFieldsValue({
                subjects: originalObject,
                average: initialData.average.value,
            });
        }
    }, [initialData]);

    const onFinish = (values: any) => {
        const results = values.subjects ? Object.keys(values.subjects).map(key => ({
            idSubjectLevel: parseInt(key.replace(/'/g, ""), 10),
            value: values.subjects[key]
        } as ResultDto)) : [];

        const note: Note = {
            results,
            average: { value: values.average } as any,
            idTrimestre: selectedIdTrimestre,
            idStudent: initialData?.idStudent ?? 0
        };
        saveNote(note, infoViewActionsContext, () => {
            message.success('تم حجز النقاط بنجاح');
            onCloseModel();
            reload();
        });
    };

    return (
        <StyledModal
            footer={false}
            open={openAddEditViewModel}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'
            onCancel={onCloseModel}
            width={"70%"}
        >
            <StyledForm form={form} onFinish={onFinish}>
                <StyledFormHeader>
                    <StyledFormHeaderTitle>
                        {modeAddEditViewModel === ModeComponent.create && 'حجز النتائج'}
                        {modeAddEditViewModel === ModeComponent.edit && 'تعديل النتائج '}
                        {modeAddEditViewModel === ModeComponent.view && 'عرض النتائج'}
                    </StyledFormHeaderTitle>
                </StyledFormHeader>
                <StyledFormContent>
                    <StyledFormContentItem>
                        <StyledFormContentField>

                            <Row gutter={6}>

                                {subjects.map(subject => (
                                    <Col span={24}>
                                        <Form.Item
                                            key={subject.id}
                                            name={['subjects', subject.idSubjectLevel.toString()]}
                                            labelAlign={'left'}
                                            labelCol={{ span: 12 }}
                                            label={` معدل مادة ${subject.title}`}
                                            rules={[{ required: true }]}
                                        >
                                            <InputNumber
                                                min={0}
                                                max={20}
                                                style={{ width: '100%' }}
                                                disabled={modeAddEditViewModel === ModeComponent.view}
                                            />
                                        </Form.Item>
                                    </Col>))}

                            </Row>
                            <Divider />
                            <Form.Item
                                name="average"
                                labelAlign={'left'}
                                labelCol={{ span: 12 }}
                                label="المعدل الفصلي"
                                rules={[{ required: true }]}
                            >
                                <InputNumber
                                    min={1}
                                    max={20}
                                    style={{ width: '100%' }}
                                    disabled={modeAddEditViewModel === ModeComponent.view}
                                />
                            </Form.Item>
                        </StyledFormContentField>
                    </StyledFormContentItem>
                </StyledFormContent>
                <StyledFormFooter>
                    <StyledFormBtn type='primary' ghost onClick={onCloseModel}>
                        إلغاء
                    </StyledFormBtn>
                    {modeAddEditViewModel !== ModeComponent.view && (
                        <StyledFormBtn type='primary' htmlType='submit'>
                            حفظ
                        </StyledFormBtn>
                    )}
                </StyledFormFooter>
            </StyledForm>
        </StyledModal>
    );
};

export default AddEditClass;
