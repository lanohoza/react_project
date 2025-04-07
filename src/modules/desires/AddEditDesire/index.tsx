import React, { useEffect, useState } from 'react';
import {
    StyledModal,
    StyledFormContent,
    StyledFormContentItem,
    StyledForm,
    StyledFormHeader,
    StyledFormHeaderTitle,
    StyledFormFooter,
    StyledFormBtn,
} from './index.styled';
import {
    Form,
    Select,
    Button,
    message,
    Row,
    Col,
} from 'antd';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import { useDesireActionsContext, useDesireContext } from '../DesireContextProvider';
import { AddEditDesireDto } from '@core/types/models/desire/DesireTypes';
import { saveDesire, deleteDesire } from '@core/services/DesireService';
import { getSpecialtyForDesire } from '@core/services/SpecialityService';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import { Student, StudentDesireDto } from '../../../@core/types/models/student/StudentTypes';
import { getOneStudentWithDesires } from '@core/services/StudentService';
import { StyledFormContentField } from './index.styled';
import { getGuidanceSpecialitiesByClass, getGuidanceSpecialitiesByStudent } from '@core/services/GuidanceSpecialityService';

const AddEditDesire = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { setOpenAddEditModel, reload } = useDesireActionsContext();
    const { selectedIdClasse, modeAddEditViewModel, openAddEditModel, selectedIdStudent } =
        useDesireContext();

    const [form] = Form.useForm();
    const [guidanceSpecialities, setGuidanceSpecialities] = useState<Speciality[]>([]);
    const [student, setStudent] = useState<StudentDesireDto>(null); // Single student object
    const nameSelection = "select_";

    // Fetch data for a single student
    const fetchData = () => {
        if (selectedIdStudent !== -1) {
            getGuidanceSpecialitiesByClass(selectedIdClasse,infoViewActionsContext).then((guidanceSpecialitieDtos) => {
                setGuidanceSpecialities(guidanceSpecialitieDtos);

                getOneStudentWithDesires(selectedIdStudent, infoViewActionsContext).then((studentdto) => {
                    setStudent(studentdto);
                    const formValues = {};
                    guidanceSpecialitieDtos.forEach((_, index) => {
                        const specialtyId = studentdto?.guidanceSpecialities[index + 1];
                        if (specialtyId) {
                            formValues[`${nameSelection}${index + 1}`] = specialtyId;
                        }
                    });

                    form.setFieldsValue(formValues);

                });
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedIdStudent]);

    // Handle select change to update options dynamically
    const handleSelectChange = (value: string, selectField: string) => {
        if (!value) return;

        const formData = form.getFieldsValue();
        const currentSelections = Object.keys(formData).filter((field) => field !== selectField);
        const currentSelectionValues = currentSelections.map((field) => formData[field]);

        if (currentSelectionValues.includes(value)) {
            message.warning('This option is already selected.');
            form.setFieldValue(selectField, undefined); // Reset the field if duplicate
        } else {
            const data = {
                order: parseInt(selectField.replace(`${nameSelection}`, '')),
                idStudent: student.id,
                idGuidanceSpeciality: parseInt(value),
            } as AddEditDesireDto;

            saveDesire(data, infoViewActionsContext).then(() => {
                infoViewActionsContext.showMessage('تم الحجز بنجاح');
            }).catch((error) => {
                infoViewActionsContext.fetchError(error.message);
            });
        }
    };

    // Handle the clear event to reset disabled options
    const handleClearSelect = (selectField: string) => {
        const formData = form.getFieldsValue();
        const clearedValue = formData[selectField];

        deleteDesire(student.id, clearedValue, infoViewActionsContext).then(() => {
            // No need to update options since it's a single student
        }).catch((error) => {
            infoViewActionsContext.fetchError(error.message);
        });
    };
    const onclose = () => {
        setOpenAddEditModel(false);
        reload();
    }
    return (
        <StyledModal
            open={openAddEditModel}
            footer={false}
            onCancel={onclose}
            width={'50%'}
            height={'80%'}
        >
            <StyledFormContent>
                <StyledFormHeader>
                    <StyledFormHeaderTitle>
                        {modeAddEditViewModel === ModeComponent.create && 'حجز الرغبات'}
                        {modeAddEditViewModel === ModeComponent.edit && 'تعديل الرغبات'}
                        {modeAddEditViewModel === ModeComponent.view && 'عرض الرغبات'}
                    </StyledFormHeaderTitle>
                </StyledFormHeader>
                <StyledFormContentItem>
                    <StyledFormContentField>
                        {student && (<StyledForm form={form} >
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} >
                                <Col span={12}>

                                    <Form.Item label="الاسم">
                                        <span>{student.firstName}</span>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>

                                    <Form.Item label="اللقب">
                                        <span>{student.lastName}</span>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col span={12}>
                                    <Form.Item label="تاريخ الميلاد">
                                        <span>{student.birthDate}</span>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>


                                {guidanceSpecialities.map((specialty, index) => (
                                    <Col span={12}>
                                        <Form.Item
                                            key={index}
                                            label={`الرغبة ${index + 1}`}
                                            name={`${nameSelection}${index + 1}`}
                                        >
                                            <Select
                                                placeholder={`اختر الرغبة ${index + 1}`}
                                                onChange={(value) => handleSelectChange(value, `${nameSelection}${index + 1}`)}
                                                onClear={() => handleClearSelect(`${nameSelection}${index + 1}`)}
                                                allowClear
                                                optionRender={(option) => {
                                                    const isDisabled = option.data.disabled ?? false; // Access 'disabled' directly
                                                    return (
                                                        <div
                                                            style={{
                                                                backgroundColor: isDisabled ? '#f5f5f5' : 'transparent',
                                                                color: isDisabled ? '#ccc' : undefined,
                                                                pointerEvents: isDisabled ? 'none' : undefined,
                                                                padding: '4px 8px',
                                                                borderRadius: '4px',
                                                            }}
                                                        >
                                                            {option.label}
                                                        </div>
                                                    );
                                                }}
                                            >
                                                {guidanceSpecialities.map((option) => (
                                                    <Select.Option
                                                        key={option.id}
                                                        value={option.id}
                                                        disabled={Object.values(student?.specialties ?? []).includes(option.id)}
                                                    >
                                                        {option.title}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                ))}
                            </Row>
                        </StyledForm>
                        )}
                    </StyledFormContentField>
                </StyledFormContentItem>
            </StyledFormContent>
        </StyledModal >
    );
};

export default AddEditDesire;