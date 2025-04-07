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
import { Button, Col, Form, Input, InputNumber, Row, Select, Steps, message } from 'antd';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import IntlMessages from '@crema/helpers/IntlMessages';
import { getAllLevels, useGetAllLevels } from '@core/services/LevelService';
import { getAllByIdLevel } from '@core/services/SpecialityService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Professor } from '@core/types/models/professor/ProfessorTypes';
import {
  createProfessor,
  updateProfessor,
} from '@core/services/ProfessorService';
import { ModeComponent } from '@core/types/models/core/models';
import { Year } from '@core/types/models/year/YearTypes';
import {
  useProfessorActionsContext,
  useProfessorContext,
} from '../ProfessorContextProvider';
import { getAllByCurrentEstablishmentType } from '@core/services/SubjectService';
import { PlusOutlined, DeleteFilled } from '@ant-design/icons';
import { BreakDto, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { getAllClassesByCurrentYear } from '@core/services/ClasseService';
import { ProfessorClassesDto } from '@core/types/models/professorClasses/professorClassesTypes';

const AddEditClass = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { onCloseModel, reload } = useProfessorActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel } =
    useProfessorContext();
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState<GetClasseDto[]>([] as GetClasseDto[]);
  const [breaks, setBreaks] = useState<BreakDto[]>([] as BreakDto[]); // State for audiences
  const [breaksCount, setBreaksCount] = useState(0); // State for audiences
  const { Option } = Select; const [form] = Form.useForm();
  const steps = [
    {
      title: 'المعلومات الاساسية',
    },
    {
      title: 'أيام الراحة',
    },
    {
      title: 'الأقسام',
    },
  ];
  useEffect(() => {
    getAllByCurrentEstablishmentType(infoViewActionsContext).then((subjects) =>
      setSubjects(subjects),
    );

    getAllClassesByCurrentYear(infoViewActionsContext).then((classedtos) =>
      setClasses(classedtos),
    );
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

      const selectedClasses = initialData?.classes?.map((classe) => classe) || [];

      form.setFieldsValue({
        ...initialData,
        breakDay,
        startHour,
        endHour,
        selectedClasses,
      });
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
    const Professor = {
      ...values,
      startHour: [],
      breakDay: [],
      endHour: [],
      breaks: localBreaks,
      id: initialData?.id,
      classes: values.selectedClasses,
    } as Professor;

    if (modeAddEditViewModel === ModeComponent.create) {
      createProfessor(Professor, infoViewActionsContext).then(() => {
        message.success('تم إضافة الأستاذ بنجاح');
        onCloseModel();
        reload();
      }).catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    } else if (modeAddEditViewModel === ModeComponent.edit) {
      updateProfessor(Professor, infoViewActionsContext).then(() => {
        message.success('تم تعديل الأستاذ بنجاح');
        onCloseModel();
        reload();
      }).catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    }
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
                'إضافة أستاذ جديد'}
              {modeAddEditViewModel === ModeComponent.edit &&
                'تعديل معلومات أستاذ'}
              {modeAddEditViewModel === ModeComponent.view &&
                'عرض معلومات أستاذ'}
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
                        name='firstName'
                        label='الاسم'
                        labelCol={{ span: 8 }}
                        labelAlign={'left'}
                        className='form-field'
                        rules={[{ required: true }]}
                      >
                        <Input
                          type='text'
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        ></Input>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='lastName'
                        label='اللقب'
                        labelCol={{ span: 8 }}
                        labelAlign={'left'}
                        className='form-field'
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
                    <Col span={12}>
                      <Form.Item
                        name='phoneNumber'
                        label='رقم الهاتف'
                        labelCol={{ span: 8 }}
                        labelAlign={'left'}
                        className='form-field'
                        rules={[
                          {
                            pattern: /^(?:\+213|0)(5|6|7)[0-9]{8}$/, // Algerian phone number pattern
                            message: 'يرجى إدخال رقم هاتف جزائري صالح (مثل +213 5XX XXX XXX أو 0XX XXX XXX)',
                          },
                        ]}
                      >
                        <Input
                          type='tel'
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        ></Input>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='email'
                        label='البريد الالكتروني'
                        labelCol={{ span: 8 }}
                        labelAlign={'left'}
                        className='form-field'
                        rules={[{ required: true }]}
                      >
                        <Input
                          type='email'
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        ></Input>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='idSubject'
                        label='المادة'
                        rules={[{ required: true }]}
                      >
                        <Select
                          defaultValue={false}
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        >
                          {subjects.map((subject) => (
                            <Option key={subject.id} value={subject.id}>{subject.title} </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        className='form-field'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        name='coordinator'
                        label='منسق المادة'
                        rules={[{ required: true }]}
                      >
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        >
                          <Option value={true} key={1}>
                            نعم
                          </Option>
                          <Option value={false} key={0}>
                            لا
                          </Option>  </Select>
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
                <div style={{ display: current == 2 ? "block" : "none" }}>
                  <Form.Item
                    name="selectedClasses"
                    label="الأقسام"
                    labelCol={{ span: 8 }}
                    labelAlign="left"
                    className="form-field"
                    rules={[{ required: true, message: 'يرجى اختيار الأقسام' }]}
                  >
                    <Select
                      mode="multiple"
                      placeholder="اختر الأقسام"
                      disabled={modeAddEditViewModel === ModeComponent.view}
                    >
                      {classes.map((classe) => (
                        <Option key={classe.id} value={classe.id}>
                          {classe.title}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
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
      </StyledModal>
    </>
  );
};

export default AddEditClass;
