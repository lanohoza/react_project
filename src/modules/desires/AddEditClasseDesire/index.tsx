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
    Table,
    Form,
    InputNumber,
    message,
    Select,
    Button,
    Space,
} from 'antd';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { ModeComponent } from '@core/types/models/core/models';
import { useDesireActionsContext, useDesireContext } from '../DesireContextProvider';
import { AddEditDesireDto, Desire } from '@core/types/models/desire/DesireTypes';
import { deleteDesire, saveDesire } from '@core/services/DesireService';
import { getAllStudentsWithDesires as getPageStudentsWithDesires } from '@core/services/StudentService';
import { Student, StudentDesireDto } from '../../../@core/types/models/student/StudentTypes';
import { getSpecialtyForDesire } from '@core/services/SpecialityService';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import { getGuidanceSpecialitiesByClass } from '@core/services/GuidanceSpecialityService';

const AddEditClasseDesire = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload, setOpenAddEditByClassModel } = useDesireActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditByClassModel, selectedIdClasse } =
        useDesireContext();
    const [form] = Form.useForm();
    const [students, setStudents] = useState([] as StudentDesireDto[]);
    const [guidanceSpecialities, setGuidanceSpecialities] = useState([] as Speciality[]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalStudent, setTotalStudent] = useState(0); // Initialize totalStudent to 0
    const [studentOptions, setStudentOptions] = useState<Record<number, Record<string, any>>>({});
    const nameSelection = "select_";
    // Initial static columns
    const staticColumns = [
        {
            title: 'الرقم',
            dataIndex: 'id',
            width:"5%",
            key: 'id',
        },
        {
            title: 'الاسم',
            dataIndex: 'firstName',
            width:"7%",
            key: 'firstName',
        },
        {
            title: 'اللقب',
            dataIndex: 'lastName',
            width:"7%",
            key: 'lastName',
        },
        {
            title: 'تاريخ الميلاد',
            width:"7%",
            dataIndex: 'birthDate',
            key: 'birthDate',
        },
    ];

    const [columns, setColumns] = useState(staticColumns);

    // Fetch data with pagination
    const fetchData = (page = currentPage) => {
        if (selectedIdClasse !== -1) {
            getGuidanceSpecialitiesByClass(selectedIdClasse,infoViewActionsContext).then((guidanceSpecialitieDtos) => {
                setGuidanceSpecialities(guidanceSpecialitieDtos);

                // Dynamically generate columns based on specialities

                // Fetch students with desires
                getPageStudentsWithDesires(selectedIdClasse, (page - 1), 10, infoViewActionsContext).then(
                    (studentDts) => {
                        const updatedStudents = studentDts.content
                        setStudents(updatedStudents);
                        setTotalStudent(studentDts.totalElements); // Update total student count

                        // Initialize options for each student
                        const initialOptions = updatedStudents.reduce((acc, student) => {
                            acc[student.id] = {};
                            guidanceSpecialitieDtos.forEach((field, index) => {
                                acc[student.id][`${nameSelection}${index + 1}`] = guidanceSpecialitieDtos.map((option) => ({
                                    value: option.id,
                                    label: option.title,
                                    disabled: Object.values(student.guidanceSpecialities).includes(option.id),
                                }));
                            });
                            return acc;
                        }, {} as Record<number, Record<string, any>>);
                        setStudentOptions(initialOptions);
                        // Set default form values for each student based on their specialties
                        const formValues = updatedStudents.reduce((values, student) => {
                            values[student.id] = {};

                            guidanceSpecialitieDtos.forEach((_, index) => {
                                const specialtyId = student.guidanceSpecialities[index + 1];
                                if (specialtyId) {
                                    values[student.id][`${nameSelection}${index + 1}`] = specialtyId;
                                }
                            });

                            return values;
                        }, {});
                        form.setFieldsValue(formValues);
                    }



                );
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedIdClasse, currentPage]);

    useEffect(() => {
        const dynamicColumns = guidanceSpecialities.map((_, index) => ({
            title: `الرغبة ${index + 1}`,
            dataIndex: `${nameSelection}${index + 1}`,
            key: `${nameSelection}${index + 1}`,
            render: (_, record: any) => (
                <Form.Item name={[record.id, `${nameSelection}${index + 1}`]} noStyle>
                    <Select
                        style={{ width: '100%' }}
                        allowClear
                        onClear={() => handleClearSelect(record.id, `${nameSelection}${index + 1}`)} // onClear handler
                        onChange={(value) =>
                            handleSelectChange(value, record.id, `${nameSelection}${index + 1}`)
                        }

                        options={studentOptions[record.id]?.[`${nameSelection}${index + 1}`]}
                        optionFilterProp="children"
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
                    />
                </Form.Item>
            ),
        }));

        setColumns([...staticColumns, ...dynamicColumns]);

    }, [studentOptions]);

    // Handle select change to update options dynamically
    const handleSelectChange = (value: string, studentId: number, selectField: string) => {
        if (!value) return;

        const formData = form.getFieldsValue();
        const currentSelections = Object.keys(formData[studentId] || {})
            .filter((field) => field != selectField);
        const currentSelectionValues = currentSelections.map((field) => formData[studentId][field])

        if (currentSelectionValues.includes(value)) {
            message.warning('This option is already selected for this person.');
            form.setFieldValue([studentId, selectField], undefined); // Reset the field if duplicate
        } else {

            const data = { order: parseInt(selectField.replace(`${nameSelection}`, "")), idStudent: studentId, idGuidanceSpeciality: parseInt(value) } as AddEditDesireDto;

            saveDesire(data, infoViewActionsContext).then(() => {
                setStudentOptions((prevOptions) => {
                    const updatedOptions = { ...prevOptions };
                    currentSelections.forEach((field) => {
                        updatedOptions[studentId][field] = updatedOptions[studentId][field].map(
                            (opt: any) => ({
                                ...opt,
                                disabled: opt.value == value || currentSelectionValues.includes(opt.value),
                            })
                        );


                    });
                    return updatedOptions;
                });
                infoViewActionsContext.showMessage('تم الحجز بنجاح');
            }).catch((error) => {
                infoViewActionsContext.fetchError(error.message);
            });

        }
    };

    // Handle the clear event to reset disabled options
    const handleClearSelect = (studentId: number, selectField: string) => {

        const formData = form.getFieldsValue();
        const cleardValue = formData[studentId][selectField];

        deleteDesire(studentId, cleardValue, infoViewActionsContext).then(() => {

            setStudentOptions((prevOptions) => {
                const updatedOptions = { ...prevOptions };
                Object.keys(formData[studentId] || {}).forEach((field) => {
                    updatedOptions[studentId][field] = updatedOptions[studentId][field].map(
                        (opt: any) => ({
                            ...opt,
                            disabled: opt.value === cleardValue ? false : opt.disabled,
                        })
                    );


                });
                return updatedOptions;
            });
        }).catch((error) => {
            infoViewActionsContext.fetchError(error.message);
        });

    }

    return (
        <StyledModal
            footer={false}
            open={openAddEditByClassModel}
            onCancel={() => {setOpenAddEditByClassModel(false) ; reload();}}
            width={'95%'}
            height={'80%'}
        >
            <StyledForm form={form}>
                <StyledFormHeader>
                    <StyledFormHeaderTitle>
                        {modeAddEditViewModel === ModeComponent.create && 'حجز الرغبات'}
                        {modeAddEditViewModel === ModeComponent.edit && 'تعديل الرغبات '}
                        {modeAddEditViewModel === ModeComponent.view && 'عرض الرغبات'}
                    </StyledFormHeaderTitle>
                </StyledFormHeader>
                <StyledFormContent>
                    <Table
                        bordered
                        dataSource={students}
                        columns={columns}
                        pagination={{
                            current: currentPage,
                            pageSize: 10,
                            total: totalStudent,
                            showSizeChanger: true,
                            onChange: (newPage) => setCurrentPage(newPage),
                        }}
                        scroll={{ y: 550 }} // Set the height of the scrollable area (in pixels)
                    />
                </StyledFormContent>
            </StyledForm>
        </StyledModal>
    );
};

export default AddEditClasseDesire;