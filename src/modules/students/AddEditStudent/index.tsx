

'use client';
import React, { useEffect, useState } from 'react';

import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { Level } from '@core/types/models/level/LevelTypes';
import { Button, Col, Form, Input, InputNumber, Row, Select, Steps, message, notification } from 'antd';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useGetAllLevels } from '@core/services/LevelService';
import { getAllByIdLevel } from '@core/services/SpecialityService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Student } from '@core/types/models/student/StudentTypes';
import { createStudent, updateStudent } from '@core/services/StudentService';
import { ModeComponent } from '@core/types/models/core/models';
import { useStudentActionsContext, useStudentContext } from '../StudentContextProvider';
import MainStudentInfo from './MainStudentInfo';
import StudyStudentInfo from './StudyStudentInfo';
import HealthStudentInfo from './HealthStudentInfo';
import SocialStudentInfo from './SocialStudentInfo';
import { MdVisibility } from 'react-icons/md';
import dayjs from 'dayjs';

const AddEditProfessor = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useStudentActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditViewModel } = useStudentContext();
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const [btnSubmitVisible, setbtnSubmitVisible] = useState(false);
    const { Step } = Steps;
    // Field groups for each step
    const stepFields = [
        ['nbrRakmana', 'codeStudent', 'firstName', 'lastName', 'birthDate', 'placeBirth', 'sexe'], // Step 1 (MainStudentInfo)
        ['idClasse', 'isMain', 'repeatClasseActual', 'dateStudentInscription', 'schoolingSystem', 'nbrRepeatClasse'], // Step 2 (StudyStudentInfo)
        ['fatherProfession', 'motherProfession', 'tutorName', 'tutorMobPhone', 'tutorEmail', 'isNeed', 'isFatherOrphan', 'isMotherOrphan'], // Step 3 (SocialStudentInfo)
        ['isDisease', 'healthProblem'], // Step 4 (HealthStudentInfo)
    ];

    useEffect(() => {
        if (initialData) {
            form.setFieldsValue({
                ...initialData,
                dateStudentInscription: dayjs(initialData.dateStudentInscription),
                birthDate: dayjs(initialData.birthDate)
            });
        }
    }, [initialData]);

    // Validate only current step fields
    const validateCurrentStep = async () => {
        try {
            await form.validateFields(stepFields[current]);
            return true;
        } catch (error) {
            return false;
        }
    };

    const onFinish = (values: any) => {
        const student = modeAddEditViewModel === ModeComponent.edit ? {
            ...values,
            id: initialData?.id,
            idClasse: initialData?.idClasse
        } : { ...values };
        if (modeAddEditViewModel === ModeComponent.create) {
            createStudent(student, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم إضافة التلميذ بنجاح');
                onCloseModel();
                reload();
            });
        } else if (modeAddEditViewModel === ModeComponent.edit) {
            updateStudent(student, infoViewActionsContext, () => {
                infoViewActionsContext.showMessage('تم تعديل التلميذ بنجاح');
                onCloseModel();
                reload();
            });
        }
    };

    const onChange = async (value: number) => {
        if (value > current) {  // Moving to the next step
            const isValid = await validateCurrentStep();
            if (!isValid) {
                notification.error({ message: "الرجاء حجز جميع الملعومات المطلوبة" });
                return;
            }
        }

        setCurrent(value);
        if (steps.length === value + 1) {
            setbtnSubmitVisible(true);
        } else {
            setbtnSubmitVisible(false);
        }
    };

    const steps = [
        { title: 'المعلومات الاساسية' },
        { title: 'المعلومات الدراسية' },
        { title: 'المعلومات الاجتماعية' },
        { title: 'المعلومات الصحية' },
    ];

    return (
        <StyledModal
            footer={false}
            open={openAddEditViewModel}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'
            width={'75%'}
            onCancel={onCloseModel}
        >
            <StyledForm form={form} onFinish={onFinish}>
                <StyledFormHeader>
                    <StyledFormHeaderTitle>
                        {modeAddEditViewModel === ModeComponent.create && 'إضافة تلميذ جديد'}
                        {modeAddEditViewModel === ModeComponent.edit && 'تعديل معلومات تلميذ'}
                        {modeAddEditViewModel === ModeComponent.view && 'عرض معلومات تلميذ'}
                    </StyledFormHeaderTitle>
                    <Steps current={current} onChange={onChange}>
                        {steps.map((item) => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>
                </StyledFormHeader>
                <StyledFormContent>
                    <StyledFormContentItem>
                        <StyledFormContentField>
                            <div style={{ display: current === 0 ? 'block' : 'none' }}>
                                <MainStudentInfo />
                            </div>
                            <div style={{ display: current === 1 ? 'block' : 'none' }}>
                                <StudyStudentInfo />
                            </div>
                            <div style={{ display: current === 2 ? 'block' : 'none' }}>
                                <SocialStudentInfo />
                            </div>
                            <div style={{ display: current === 3 ? 'block' : 'none' }}>
                                <HealthStudentInfo />
                            </div>
                        </StyledFormContentField>
                    </StyledFormContentItem>
                </StyledFormContent>
                <StyledFormFooter>
                    <StyledFormBtn
                        type='primary'
                        ghost
                        disabled={current === 0}
                        onClick={() => onChange(current - 1)}
                    >
                        السابق
                    </StyledFormBtn>
                    {steps.length !== current + 1 && (
                        <StyledFormBtn type='primary' onClick={() => onChange(current + 1)}>
                            التالي
                        </StyledFormBtn>
                    )}
                    {modeAddEditViewModel !== ModeComponent.view && btnSubmitVisible && (
                        <StyledFormBtn type='primary' htmlType='submit'>
                            حفظ
                        </StyledFormBtn>
                    )}
                </StyledFormFooter>
            </StyledForm>
        </StyledModal>
    );
};

export default AddEditProfessor;

