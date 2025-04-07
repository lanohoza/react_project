

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
import MainStudentInfo from './MainStudentInfo';
import StudyStudentInfo from './StudyStudentInfo';
import HealthStudentInfo from './HealthStudentInfo';
import SocialStudentInfo from './SocialStudentInfo';
import { MdVisibility } from 'react-icons/md';
import dayjs from 'dayjs';
import { useRapidAccesActionsContext, useRapidAccesContext } from '../RapidAccesContextProvider';

const ViewStudentAction = () => {
    const { openViewStuentAction, selectdStudent } = useRapidAccesContext();
    const { onChangeOpenViewStudentAction } = useRapidAccesActionsContext();
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const { Step } = Steps;
    // Field groups for each step


    // Validate only current step fields



    const onChange = async (value: number) => {

        setCurrent(value);
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
            open={openViewStuentAction}
            aria-labelledby='keep-mounted-modal-title'
            aria-describedby='keep-mounted-modal-description'
            width={'60%'}
            onCancel={() => onChangeOpenViewStudentAction(false)}
        >
            <StyledForm form={form}>
                <StyledFormHeader>
                    <StyledFormHeaderTitle>
                        عرض معلومات تلميذ
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
                                <MainStudentInfo student={selectdStudent} />
                            </div>
                            <div style={{ display: current === 1 ? 'block' : 'none' }}>
                                <StudyStudentInfo student={selectdStudent} />
                            </div>
                            <div style={{ display: current === 2 ? 'block' : 'none' }}>
                                <SocialStudentInfo student={selectdStudent} />
                            </div>
                            <div style={{ display: current === 3 ? 'block' : 'none' }}>
                                <HealthStudentInfo student={selectdStudent} />
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

                </StyledFormFooter>
            </StyledForm>
        </StyledModal>
    );
};

export default ViewStudentAction;

