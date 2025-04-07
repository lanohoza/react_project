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
    StyledFormBtn,
} from './index.styled';
import { Level } from '@core/types/models/level/LevelTypes';
import {
    Button,
    Col,
    Divider,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Steps,
    message,
} from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import {
    useGuidanceGroupActionsContext,
    useGuidanceGroupContext,
} from '../GuidanceGroupsContextProvider';
import { GrReturn } from 'react-icons/gr';
import { Student } from '../../../@core/types/models/student/StudentTypes';
import { getAllStudentByCurrents } from '@core/services/StudentService';
import { GuidanceGroup } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { Solution } from '@core/types/models/solution/SolutionTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';
import { getAllSolutions } from '@core/services/SolutionService';
import { createGuidanceGroup, updateGuidanceGroup } from '@core/services/GuidanceGroupsService';

const AddEditClass = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useGuidanceGroupActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditViewModel } =
        useGuidanceGroupContext();
    const { Step } = Steps;
    const [students, setStudents] = useState<Student[]>([]);
    const { Option } = Select;
    const [form] = Form.useForm();

    useEffect(() => {
        if(openAddEditViewModel)
            getAllStudentByCurrents(infoViewActionsContext).then(studentDtos => setStudents(studentDtos));
    }, []);

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({ ...initialData, });
        }
    }, [initialData]);

    const onFinish = (values: any) => {
        const guidanceGroup = {
            ...values,
            id: initialData?.id,
        } as GuidanceGroup;
        if (modeAddEditViewModel === ModeComponent.create) {
            createGuidanceGroup(guidanceGroup, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم إضافة القسم بنجاح');
                onCloseModel();
                reload();
            });
        } else if (modeAddEditViewModel === ModeComponent.edit) {
            updateGuidanceGroup(guidanceGroup, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم تعديل القسم بناج');
                onCloseModel();
                reload();
            });
        }
    };
    return (
        <>
            <StyledModal
                footer={false}
                open={openAddEditViewModel}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={'60%'}
                onCancel={onCloseModel}
            >
                <StyledForm form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            {modeAddEditViewModel === ModeComponent.create &&
                                'إضافة مجموعة ارشادية جديد'}
                            {modeAddEditViewModel === ModeComponent.edit &&
                                'تعديل معلومات مجموعة ارشادية'}
                        </StyledFormHeaderTitle>

                    </StyledFormHeader>
                    <StyledFormContent>
                        <StyledFormContentItem>
                            <StyledFormContentField>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign={'left'}
                                            labelCol={{ span: 8 }}
                                            name='title'
                                            label='العنوان'
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                type='text'
                                                disabled={modeAddEditViewModel === ModeComponent.view}
                                            ></Input>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>
                                        <Form.Item
                                            labelCol={{ span: 8 }}
                                            labelAlign={'left'}
                                            className='form-field'
                                            name='idStudents'
                                            label='التلاميذ'
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                showSearch
                                                mode='multiple'
                                                filterOption={(input, option) => ((option?.children ?? '') as any).toLowerCase().includes(input.toLowerCase())}
                                                placeholder='التلاميذ'
                                                disabled={modeAddEditViewModel === ModeComponent.view}
                                            >
                                                {students.map((student: Student) => {
                                                    return (
                                                        <Option value={student.id} key={student.id}>
                                                            {student.firstName + " " + student.lastName + " --> " + student.classeTitle}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>

                            </StyledFormContentField>
                        </StyledFormContentItem>
                    </StyledFormContent>

                    <StyledFormFooter>
                        <StyledFormBtn type='primary' ghost onClick={onCloseModel}>
                            إلغاء
                        </StyledFormBtn>
                        <StyledFormBtn type='primary' htmlType='submit'>
                            حفظ
                        </StyledFormBtn>

                    </StyledFormFooter>
                </StyledForm>
            </StyledModal >
        </>
    );
};

export default AddEditClass;
