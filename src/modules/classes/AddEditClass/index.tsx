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
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import IntlMessages from '@crema/helpers/IntlMessages';
import { getAllLevels, useGetAllLevels } from '@core/services/LevelService';
import { getAllByIdLevel } from '@core/services/SpecialityService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { BreakDto, Classe } from '@core/types/models/classe/ClasseTypes';
import { createClasse, updateClasse } from '@core/services/ClasseService';
import { ModeComponent } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';

import { Professor } from '@core/types/models/professor/ProfessorTypes';
import { getAllProfessors } from '@core/services/ProfessorService';
import { StudentsBreaksDto } from '@core/types/models/statistics/StatisticsType';
import { DeleteFilled, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { GrReturn } from 'react-icons/gr';
import { useClasseActionsContext, useClasseContext } from '../ClassContextProvider';

const AddEditClass = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useClasseActionsContext();
    const { initialData, modeAddEditViewModel, years, openAddEditViewModel } =
        useClasseContext();
    const [current, setCurrent] = useState(0);
    const { Step } = Steps;
    const [btnSubmitVisible, setbtnSubmitVisible] = useState(false);
    const [levels, setLevel] = useState<Level[]>([]); // State for audiences
    const [professors, setProfessors] = useState<Professor[]>([]); // State for audiences
    const [specialities, setSpecialities] = useState<Speciality[]>([]); // State for audiences
    const [breaks, setBreaks] = useState<BreakDto[]>([] as BreakDto[]); // State for audiences
    const [breaksCount, setBreaksCount] = useState(0); // State for audiences
    const { Option } = Select;
    const [form] = Form.useForm();
    const steps = [
        {
            title: 'المعلومات الاساسية',
        },
        {
            title: 'أيام الراحة',
        },
    ];
    useEffect(() => {
        getAllLevels(infoViewActionsContext).then((levelDtos) => {
            setLevel(levelDtos);
        });
        getAllProfessors(infoViewActionsContext).then((professors) => {
            setProfessors(professors);
        });
    }, []);

    useEffect(() => {
        if (initialData) {
            let localbreaksCount = 0;

            initialData?.breaks?.forEach((breakdto) => {
                breakdto.key = localbreaksCount;
                localbreaksCount++;
            });
            setBreaks(initialData?.breaks);

            const breakDay = initialData?.breaks
                ? Object.values(initialData?.breaks).map((breakdto) => breakdto.breakDay)
                : [];
            const startHour = initialData?.breaks
                ? Object.values(initialData?.breaks).map((breakdto) => breakdto.startHour)
                : [];
            const endHour = initialData?.breaks
                ? Object.values(initialData?.breaks).map((breakdto) => breakdto.endHour)
                : [];
            form.setFieldsValue({ ...initialData, breakDay, startHour, endHour });
            onLevelSelectChange(initialData.idLevel);
            setBreaksCount(localbreaksCount);
        }
    }, [initialData]);

    const onFinish = (values: any) => {
        const breakDay = values.breakDay
            ? Object.values(values.breakDay).map((key) => key)
            : [];
        const startHour = values.startHour
            ? Object.values(values.startHour).map((key) => key)
            : [];
        const endHour = values.endHour
            ? Object.values(values.endHour).map((key) => key)
            : [];
        if (
            breakDay.length != startHour.length &&
            endHour.length != startHour.length
        ) {
            message.error('لديك خلل في حجز أيام الراحة');
            return;
        }
        const localBreaks = breakDay.map((value: string, index) => (
            {
                breakDay: parseInt(value),
                startHour: startHour[index],
                endHour: endHour[index],
            })
        );
        const classe = {
            ...values,
            startHour: [],
            breakDay: [],
            endHour: [],
            breaks: localBreaks,
            id: initialData?.id,
        } as Classe;
        if (modeAddEditViewModel === ModeComponent.create) {
            createClasse(classe, infoViewActionsContext, () => {
                message.success('تم إضافة القسم بنجاح');
                onCloseModel();
                reload();
            });
        } else if (modeAddEditViewModel === ModeComponent.edit) {
            updateClasse(classe, infoViewActionsContext, () => {
                message.success('تم تعديل القسم بناج');
                onCloseModel();
                reload();
            });
        }
    };
    const onLevelSelectChange = (value: any) => {
        getAllByIdLevel(value, infoViewActionsContext).then((specialities) => {
            setSpecialities(specialities);
        });
    };
    const OnAddNewDay = () => {
        setBreaks([...breaks, { key: breaksCount + 1 } as BreakDto]);
        setBreaksCount(breaksCount + 1);
    };
    const OnRemoveDay = (key) => {
        setBreaks(breaks.filter((item) => item.key !== key));
    };
    const onChange = (value: number) => {
        setCurrent(value);
        if (steps.length === value + 1) {
            setTimeout(() => {
                setbtnSubmitVisible(true);
            }, 50);
        } else {
            setbtnSubmitVisible(false);
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
                                'إضافة قسم جديد'}
                            {modeAddEditViewModel === ModeComponent.edit &&
                                'تعديل معلومات قسم'}
                            {modeAddEditViewModel === ModeComponent.view && 'عرض معلومات قسم'}
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
                                <div style={{ display: current == 0 ? "block" : "none" }}>

                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col span={12}>
                                            <Form.Item
                                                name='idYear'
                                                label='الموسم الدراسي'
                                                labelCol={{ span: 8 }}
                                                labelAlign={'left'}
                                                className='form-field'
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    style={{ width: '100%' }}
                                                    showSearch
                                                    placeholder='الموسم الدراسي'
                                                    disabled={modeAddEditViewModel === ModeComponent.view}
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
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                labelAlign={'left'}
                                                labelCol={{ span: 8 }}
                                                name='number'
                                                label='رقم القسم'
                                                rules={[{ required: true }]}
                                            >
                                                <InputNumber
                                                    min={1}
                                                    max={20}
                                                    style={{ width: '100%' }}
                                                    disabled={modeAddEditViewModel === ModeComponent.view}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col span={12}>
                                            <Form.Item
                                                labelAlign={'left'}
                                                labelCol={{ span: 8 }}
                                                className='form-field'
                                                name='idLevel'
                                                label='المستوى'
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    placeholder='أختر المستوى'
                                                    onChange={onLevelSelectChange}
                                                    disabled={modeAddEditViewModel === ModeComponent.view}
                                                >
                                                    {levels &&
                                                        levels.map((level: Level) => {
                                                            return (
                                                                <Option value={level.id} key={level.id}>
                                                                    {level.title}
                                                                </Option>
                                                            );
                                                        })}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            {specialities.length != 0 ? (
                                                <Form.Item
                                                    labelAlign={'left'}
                                                    labelCol={{ span: 8 }}
                                                    className='form-field'
                                                    name='idSpeciality'
                                                    label='التخصص'
                                                    rules={[{ required: true }]}
                                                >
                                                    <Select
                                                        placeholder='Select Label'
                                                        disabled={
                                                            specialities.length == 0 ||
                                                            modeAddEditViewModel === ModeComponent.view
                                                        }
                                                    >
                                                        {specialities.map((speciality: any) => {
                                                            return (
                                                                <Option value={speciality.id} key={speciality.id}>
                                                                    {speciality.title}
                                                                </Option>
                                                            );
                                                        })}
                                                    </Select>
                                                </Form.Item>
                                            ) : (
                                                ''
                                            )}
                                        </Col>
                                    </Row>

                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col span={12}>
                                            <Form.Item
                                                labelCol={{ span: 8 }}
                                                labelAlign={'left'}
                                                className='form-field'
                                                name='idProfessor'
                                                label='الاستاذ المسؤول'
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    placeholder='أختر الاستاذ'
                                                    disabled={modeAddEditViewModel === ModeComponent.view}
                                                >
                                                    {professors.map((professor) => (
                                                        <Option key={professor.id} value={professor.id}>
                                                            {professor.firstName + ' ' + professor.lastName}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </div>
                                <div style={{ display: current == 1 ? "block" : "none" }}>
                                    <Row style={{ marginBottom: '10px' }}>
                                        <Col span={22}>
                                        </Col>
                                        <Col
                                            span={2}
                                            style={{ display: 'flex', justifyContent: 'end' }}
                                        >
                                            <Button
                                                icon={<PlusOutlined />}
                                                style={{ padding: '13px 8px', background: 'green', display: modeAddEditViewModel == ModeComponent.view ? "none" : "flex" }}
                                                onClick={OnAddNewDay}
                                                size='small'
                                                type='primary'
                                            >
                                                إضافة
                                            </Button>
                                        </Col>
                                    </Row>

                                    {breaks?.map((breakDto) => (
                                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col span={9}>
                                                <Form.Item
                                                    labelCol={{ span: 8 }}
                                                    labelAlign={'left'}
                                                    className='form-field'
                                                    name={['breakDay', breakDto?.key?.toString() ?? '']}
                                                    label='يوم الراحة'
                                                    rules={[{ required: true }]}
                                                >
                                                    <Select
                                                        placeholder='أختر البوم'
                                                        disabled={modeAddEditViewModel === ModeComponent.view}
                                                    >
                                                        <Option value={1}>الاحد</Option>
                                                        <Option value={2}>الاثنين</Option>
                                                        <Option value={3}>الثلاثاء</Option>
                                                        <Option value={4}>الاربعاء</Option>
                                                        <Option value={5}>الخميس</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col span={6}>
                                                <Form.Item
                                                    labelCol={{ span: 8 }}
                                                    className='form-field'
                                                    labelAlign={'left'}
                                                    name={['startHour', breakDto?.key?.toString() ?? '']}
                                                    label='البداية'
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input
                                                        type='time'
                                                        disabled={modeAddEditViewModel === ModeComponent.view}
                                                    ></Input>
                                                </Form.Item>
                                            </Col>

                                            <Col span={6}>
                                                <Form.Item
                                                    labelCol={{ span: 8 }}
                                                    className='form-field'
                                                    labelAlign={'left'}
                                                    name={['endHour', breakDto?.key?.toString() ?? '']}
                                                    label='النهاية'
                                                    rules={[{ required: true }]}
                                                >
                                                    <Input
                                                        type='time'
                                                        disabled={modeAddEditViewModel === ModeComponent.view}
                                                    ></Input>
                                                </Form.Item>
                                            </Col>
                                            <Col span={2}>
                                                <Button
                                                    style={{ color: '#ff4d4f', border: '1px solid red', display: modeAddEditViewModel == ModeComponent.view ? "none" : "flex" }}
                                                    onClick={() => OnRemoveDay(breakDto.key)}
                                                    icon={<DeleteFilled />}
                                                ></Button>
                                            </Col>
                                        </Row>
                                    ))}
                                </div>
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
