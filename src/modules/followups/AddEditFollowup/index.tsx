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
    useFollowupActionsContext,
    useFollowupContext,
} from '../FollowupsContextProvider';
import { GrReturn } from 'react-icons/gr';
import { Student } from '../../../@core/types/models/student/StudentTypes';
import { getAllStudentByCurrents } from '@core/services/StudentService';
import { Followup, FollowupType } from '@core/types/models/followUp/FollowupTypes';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { Solution } from '@core/types/models/solution/SolutionTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';
import { getAllSolutions } from '@core/services/SolutionService';
import { createFollowup, updateFollowup } from '@core/services/FlowUpService';
import { getAllGuidanceGroupByCurrents } from '@core/services/GuidanceGroupsService';
import { GuidanceGroup } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';
import TextArea from 'antd/es/input/TextArea';
import { getAllShedCategories } from '@core/services/ShedCategoryService';
import { getAllShedSettingsByCategory } from '@core/services/ShedSettingService';

const AddEditClass = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useFollowupActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditViewModel } =
        useFollowupContext();
    const { Step } = Steps;
    const [guidanceGroups, setGuidanceGroups] = useState<GuidanceGroup[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [flowType, setFlowType] = useState<FollowupType>(FollowupType.single);
    const { Option } = Select;
    const [form] = Form.useForm();
    const [shedSettings, setShedSettings] = useState<any[]>([]);
    const [shedCategories, setShedCategories] = useState<any[]>([]);
    useEffect(() => {
        getAllGuidanceGroupByCurrents(infoViewActionsContext).then(guidanceGroups => setGuidanceGroups(guidanceGroups));
        getAllStudentByCurrents(infoViewActionsContext).then(studentDtos => setStudents(studentDtos));
        getAllShedCategories(infoViewActionsContext).then((shedCategorieDts) => {
            setShedCategories(shedCategorieDts);
        });
    }, []);
    const onShedCategory = (idCategory) => {
        form.setFieldsValue({ idShedSettings: undefined });
        load(idCategory);
    };
    const load = (idCategory) => {
        getAllShedSettingsByCategory(idCategory, infoViewActionsContext).then(
            (shedSettingDto) => setShedSettings(shedSettingDto)
        );
    }
    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({ ...initialData });

            setFlowType(initialData.type);
            if (initialData.idShedCategory)
                load(initialData.idShedCategory);
        }
    }, [initialData]);
    const onChangeType = (value: FollowupType) => {
        setFlowType(value);
    }
    const onFinish = (values: any) => {
        const flowUp = {
            ...values,
            id: initialData?.id,
        } as Followup;
        if (modeAddEditViewModel === ModeComponent.create) {
            createFollowup(flowUp, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم إضافة المتابعة بنجاح');
                onCloseModel();
                reload();
            });
        } else if (modeAddEditViewModel === ModeComponent.edit) {
            updateFollowup(flowUp, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم تعديل المتابعة بناج');
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
                                'إضافة متابعة جديد'}
                            {modeAddEditViewModel === ModeComponent.edit &&
                                'تعديل معلومات متابعة'}
                            {modeAddEditViewModel === ModeComponent.view && 'عرض معلومات قسم'}
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
                                            name='type'
                                            label='نوع المتابعة'
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                showSearch
                                                onChange={onChangeType}
                                                placeholder='نوع المتابعة'
                                                disabled={modeAddEditViewModel === ModeComponent.view}
                                            >
                                                <Option selected value={FollowupType.single}>فردي </Option>
                                                <Option value={FollowupType.group}>جماعي </Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>

                                        {flowType === FollowupType.single &&
                                            <Form.Item
                                                labelCol={{ span: 8 }}
                                                labelAlign={'left'}
                                                className='form-field'
                                                name='idStudent'
                                                label='التلاميذ'

                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    placeholder='التلاميذ'
                                                    filterOption={(input, option) => ((option?.children ?? '') as any).toLowerCase().includes(input.toLowerCase())}
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
                                            </Form.Item>}
                                        {flowType === FollowupType.group &&
                                            <Form.Item
                                                labelCol={{ span: 8 }}
                                                labelAlign={'left'}
                                                className='form-field'
                                                name='idGuidanceGroup'
                                                label='المجموعة الارشادية'
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    placeholder='المجموعة الارشادية'
                                                    disabled={modeAddEditViewModel === ModeComponent.view}
                                                >
                                                    {guidanceGroups.map((guidanceGroup: GuidanceGroup) => {
                                                        return (
                                                            <Option value={guidanceGroup.id} key={guidanceGroup.id}>
                                                                {guidanceGroup.title}
                                                            </Option>
                                                        );
                                                    })}
                                                </Select>
                                            </Form.Item>}
                                    </Col>
                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign={'left'}
                                            labelCol={{ span: 8 }}
                                            className='form-field'
                                            name='idShedCategory'
                                            label='التشخيص'
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                showSearch
                                                filterOption={(input, option) =>
                                                    ((option?.children ?? '') as any)
                                                        .toLowerCase()
                                                        .includes(input.toLowerCase())
                                                }
                                                placeholder='التشخيص'
                                                onChange={(value) => onShedCategory(value)}
                                            >
                                                {shedCategories.map((shedCategory: any) => {
                                                    return (
                                                        <Option
                                                            value={shedCategory.id}
                                                            key={shedCategory.id}
                                                        >
                                                            {shedCategory.name}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>

                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign={'left'}
                                            labelCol={{ span: 8 }}
                                            className='form-field'
                                            name='idShedSettings'
                                            label='مظهر التشخيص'
                                            rules={[{ required: true }]}
                                        >
                                            <Select
                                                style={{ width: '100%' }}
                                                showSearch
                                                mode='multiple'
                                                placeholder='مظهر التشخيص '
                                            >
                                                {shedSettings.map((shedSetting: any) => {
                                                    return (
                                                        <Option value={shedSetting.id} key={shedSetting.id}>
                                                            {shedSetting.syndromeDiagnostic}
                                                        </Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>
                                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                    <Col span={24}>
                                        <Form.Item
                                            labelAlign={'left'}
                                            labelCol={{ span: 8 }}
                                            className='form-field'
                                            name='description'
                                            label='الوصف'
                                        >
                                            <TextArea
                                                disabled={modeAddEditViewModel === ModeComponent.view}
                                            ></TextArea>
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
                        {modeAddEditViewModel !== ModeComponent.view && (
                            <StyledFormBtn type='primary' htmlType='submit'>
                                حفظ
                            </StyledFormBtn>
                        )}
                    </StyledFormFooter>
                </StyledForm>
            </StyledModal >
        </>
    );
};

export default AddEditClass;
