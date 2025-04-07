'use client';
import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Select, Checkbox, Input, DatePicker, Space, Button } from 'antd';
import dayjs from 'dayjs';
import styled from 'styled-components';
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
import { useWeekProgramActionsContext, useWeekProgramContext } from '../WeekProgramContextProvider';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { getWeekName, monthsInArabic, weeks } from '@crema/hooks/dateHooks';
import { AddEditWeekProgramTaskDto, AddEditWeekProgramTaskDtoToDisplay, arabicDaysMap, arabicPeriodMap, DaysOfWeek, Period } from '@core/types/models/weekProgramTasks/WeekProgramTasksTypes';
import { createMultipleWeekProgramTasks } from '@core/services/WeekProgramTasksService';
import { TechnicalCardType } from '@core/types/enums/TypeTcTask';
import { TypeWeekProgram } from '@core/types/models/weekProgram/WeekProgramTypes';
import { ModeComponent } from '@core/types/models/core/models';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetCurrentMonthAndWeek } from '@core/services/WeekProgramService';
import { CurrentMonthAndWeek } from '@core/types/models/CurrentMonthAndWeek/CurrentMonthAndWeekTypes';

const StyledScrollableContainer = styled.div
  `
  margin: 0 auto;
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #f5f5f5;
  `
  ;

const AddEditWeekProgram = () => {
  const { RangePicker } = DatePicker;
  const { onCloseEditViewModel, reload, onDeleteTask } = useWeekProgramActionsContext();
  const { initialData, modeAddEditViewModel, openAddEditViewModel, tasksYearProgram } = useWeekProgramContext();
  const [form] = Form.useForm();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [allTasks, setAllTasks] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const daysOfWeek = Object.values(DaysOfWeek);
  const periods = Object.values(Period);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState(TypeWeekProgram.AUTO);
  const [activities, setActivities] = useState([]);
  const [month, setMonth] = useState(null);
  const [startWeek, setStartWeek] = useState(null);
  const [endWeek, setEndWeek] = useState(null);
  const [weekNumber, setWeekNumber] = useState<number | null>(null);
  const [currentMonthAndWeek, setCurrentMonthAndWeek] = useState<CurrentMonthAndWeek | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<'start' | 'end'>('end');

  const addActivity = () => {
    const newActivity = { id: Date.now(), selected: true, titleTask: "", days: null, period: null, description: "" };
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  const addAutoActivity = () => {
    const newActivity = { id: Date.now(), selected: true, idTask: null, days: null, period: null, description: "" };
    setActivities((prevActivities) => [...prevActivities, newActivity]);
  };

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ ...initialData });
      setType(initialData?.addEditWeekProgramDto.type);
      setActivities(initialData?.weekProgramTaskDtos);
      setStartDate(initialData?.addEditWeekProgramDto.startWeek);
      setEndDate(initialData?.addEditWeekProgramDto.endWeek);
      setMonth(initialData?.addEditWeekProgramDto.idMonth);
      setWeekNumber(initialData?.addEditWeekProgramDto.weekNumber);
      form.setFieldsValue({
        weekNumber: initialData?.addEditWeekProgramDto.weekNumber,
        type: initialData?.addEditWeekProgramDto.type
      })
    }
  }, [initialData]);

  const handleCheckboxChange = (activityId, checked) => {
    setSelectedActivities(prevSelected => {
      const updated = { ...prevSelected };

      if (checked) {
        updated[activityId] = { idTask: activityId, days: null, period: null, descrption: '', selected: true };
      } else {
        delete updated[activityId];
      }

      return updated;
    });
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleFieldChange = (activityId, field, value) => {
    setSelectedActivities(prevSelected => ({
      ...prevSelected,
      [activityId]: {
        ...prevSelected[activityId],
        [field]: value,
      },
    }));
  };

  // CUSTOM type
  const handleCheckboxChangeCustom = (id, checked) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, selected: checked } : activity
      )
    );
  };

  // Function to handle field change
  const handleFieldChangeCustom = (id, field, value) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === id ? { ...activity, [field]: value } : activity
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (month && weekNumber) {
        try {
            // eslint-disable-next-line react-hooks/rules-of-hooks
          const result = await useGetCurrentMonthAndWeek(weekNumber, month, infoViewActionsContext);
          setCurrentMonthAndWeek(result);
        } catch (err) {
          setError('Error fetching data : ' + err);
        }
      }
    };

    fetchData();
  }, [month, weekNumber]);

  useEffect(() => {
    if (currentMonthAndWeek) {
      const { idMonth, startWeek: fetchedStartWeek, endWeek: fetchedEndWeek } = currentMonthAndWeek;

      setMonth(idMonth);
      setStartWeek(fetchedStartWeek);
      setEndWeek(fetchedEndWeek);

      setStartDate(dayjs(fetchedStartWeek, 'YYYY-MM-DD'));
      setEndDate(dayjs(fetchedEndWeek, 'YYYY-MM-DD'));

      form.setFieldsValue({
        idMonth: idMonth,
        startWeek: fetchedStartWeek,
        endWeek: fetchedEndWeek,
      });
    }
  }, [currentMonthAndWeek, form]);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start ? start.format('YYYY-MM-DD') : null);
    setEndDate(end ? end.format('YYYY-MM-DD') : null);
    form.setFieldsValue({
      startWeek: start ? start.format('YYYY-MM-DD') : '',
      endWeek: end ? end.format('YYYY-MM-DD') : '',
    });
  };

  const onFinish = async (values) => {
    const weekProgramDto = {
      ...initialData,
      id: initialData?.addEditWeekProgramDto.id,
      type: type,
      idMonth: values.idMonth,
      startWeek: startDate || null,
      endWeek: endDate || null,
      weekNumber: values.weekNumber,
    };

    if (modeAddEditViewModel === ModeComponent.create || modeAddEditViewModel === ModeComponent.edit) {
      const weekProgramTaskDtos = Object.values(activities).map((activity) => ({
        id: activity.id,
        days: activity.days,
        period: activity.period,
        descrption: activity.descrption,
        idTask: activity.idTask ?? null,
        titleTask: activity.titleTask ?? null,
        selected: activity.selected,
        idWeekProgram: modeAddEditViewModel === ModeComponent.create ? null : initialData?.addEditWeekProgramDto.id,
      }));

      if (!weekProgramTaskDtos || weekProgramTaskDtos.length === 0) {
        infoViewActionsContext.fetchError("الرجاء إختيار نشاط على الأقل");
        return;
      }

      try {
        createMultipleWeekProgramTasks(
          { addEditWeekProgramDto: weekProgramDto, weekProgramTaskDtos},
          infoViewActionsContext
        ).then(() => {
          const successMessage =
            modeAddEditViewModel === ModeComponent.create
              ? 'تم حفظ البرنامج الاسبوعي بنجاح'
              : 'تم تعديل البرنامج الاسبوعي بنجاح';
          infoViewActionsContext.showMessage(successMessage);
          reload();
          onCloseEditViewModel();
        }).catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
      } catch (error) {
        const errorMessage =
          modeAddEditViewModel === ModeComponent.create
            ? 'لم يتم حفظ البرنامج الاسبوعي بنجاح'
            : 'لم يتم تعديل البرنامج الاسبوعي بنجاح';
        infoViewActionsContext.showMessage(errorMessage);
        console.error("Error saving week program:", error);
      }
    }
  }

  return (
    <StyledModal footer={false} open={openAddEditViewModel} onCancel={onCloseEditViewModel} width={'75%'}>
      <StyledForm form={form} onFinish={onFinish}>
        <StyledFormHeader>
          <StyledFormHeaderTitle>
            {modeAddEditViewModel === ModeComponent.create ? 'إعداد برنامج أسبوعي' :
              modeAddEditViewModel === ModeComponent.edit ? 'تعديل برنامج أسبوعي' :
                'عرض برنامج أسبوعي'}
          </StyledFormHeaderTitle>
        </StyledFormHeader>
        <StyledFormContent>
          <StyledFormContentItem>
            <StyledFormContentField>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem
                    label="شهر الإنجاز"
                    name="idMonth"
                    labelAlign="left"
                    rules={[
                      {
                        required: true,
                        message: 'الرجاء إدخال الشهر!',
                      },
                    ]}
                    labelCol={{ span: 8 }}>
                    <Select placeholder="الشهر"
                      value={month}
                      disabled={modeAddEditViewModel === ModeComponent.view || modeAddEditViewModel === ModeComponent.edit}
                      onChange={(value) => setMonth(value)}>
                      {monthsInArabic.map((month, index) => (
                        <Select.Option key={index} value={index + 1}>
                          {month}
                        </Select.Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem
                    label="رقم الأسبوع"
                    name="weekNumber"
                    labelAlign="left"
                    rules={[
                      {
                        required: true,
                        message: 'الرجاء إدخال الأسبوع!',
                      },
                    ]}
                    labelCol={{ span: 8 }}>
                    <Select placeholder="الأسبوع"
                      value={weekNumber}
                      onChange={(value) => setWeekNumber(value)}
                      disabled={modeAddEditViewModel === ModeComponent.view || modeAddEditViewModel === ModeComponent.edit}
                    >
                      {weeks.map((week, index) => (
                        <Select.Option key={index} value={index + 1}>
                          {week}
                        </Select.Option>
                      ))}
                    </Select>
                  </StyledFormItem>
                </Col>
              </Row>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col span={12}>
                  <StyledFormItem label="بداية/نهاية الأسبوع" name="dates" labelAlign="left" labelCol={{ span: 8 }}>
                    <Space direction="vertical" size={12}>
                      <RangePicker
                        value={[startDate ? dayjs(startDate, 'YYYY-MM-DD') : null, endDate ? dayjs(endDate, 'YYYY-MM-DD') : null]}
                        onChange={handleDateChange}
                        disabled={true}
                      />
                    </Space>
                  </StyledFormItem>
                </Col>
                <Col span={12}>
                  <StyledFormItem label='النوع' name='type' labelAlign='left' labelCol={{ span: 8 }}>
                    <Select
                      defaultValue={TypeWeekProgram.AUTO}
                      value={type}
                      onChange={handleTypeChange}
                      disabled={modeAddEditViewModel === ModeComponent.view || modeAddEditViewModel === ModeComponent.edit}
                    >
                      <Select.Option value={TypeWeekProgram.AUTO}>آلي</Select.Option>
                      <Select.Option value={TypeWeekProgram.CUSTOM}>مخصص</Select.Option>
                    </Select>
                  </StyledFormItem>
                </Col>
              </Row>

              {type === TypeWeekProgram.AUTO && (
                <StyledScrollableContainer>
                  {activities.map((activity) => (
                    <Row key={activity.id} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="إختر نشاط"
                          value={activity.idTask}
                          onChange={(value) => handleFieldChangeCustom(activity.id, 'idTask', value)}
                          style={{ width: '200px' }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {tasksYearProgram.map((tc) => (
                            <Select.Option value={tc.id}>{tc.title}</Select.Option>
                          ))}
                        </Select>
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="إختر اليوم"
                          value={activity.days}
                          onChange={(value) => handleFieldChangeCustom(activity.id, 'days', value)}
                          style={{ width: '100px', marginRight: '5px' }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {daysOfWeek.map((day, i) => (
                            <Select.Option key={i} value={day}>
                              {arabicDaysMap[day]}
                            </Select.Option>
                          ))}

                        </Select>
                      </Col>
                      <Col span={12}>
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="إختر الفترة"
                          value={activity.period}
                          onChange={(value) => handleFieldChangeCustom(activity.id, 'period', value)}
                          style={{ width: '100px' }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {periods.map((period, i) => (
                            <Select.Option key={i} value={period}>
                              {arabicPeriodMap[period]}
                            </Select.Option>
                          ))}
                        </Select>

                        <Input
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="الوصف"
                          value={activity.descrption}
                          onChange={(e) => handleFieldChangeCustom(activity.id, 'descrption', e.target.value)}
                          style={{ width: '200px', marginRight: '5px' }}
                        />
                        {modeAddEditViewModel === ModeComponent.edit && (
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteTask(activity.id)}
                            style={{ marginRight: '5px', border: 'none', borderRadius: '30px', backgroundColor: 'red', color: 'white' }}                           >
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}

                  <Button
                    onClick={addAutoActivity}
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    style={{ marginTop: '16px' }}
                    disabled={modeAddEditViewModel === ModeComponent.view}
                  />
                </StyledScrollableContainer>
              )},

              {type === TypeWeekProgram.CUSTOM && (
                <StyledScrollableContainer>
                  {activities.map((activity) => (
                    <Row key={activity.id} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ marginBottom: '16px' }}>
                      <Col span={12}>
                        <Input
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="عنوان النشاط"
                          value={activity.titleTask}
                          onChange={(e) => handleFieldChangeCustom(activity.id, 'titleTask', e.target.value)}
                          style={{ width: '200px' }}
                        />
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="إختر اليوم"
                          value={activity.days}
                          onChange={(value) => handleFieldChangeCustom(activity.id, 'days', value)}
                          style={{ width: '100px', marginRight: '5px' }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {daysOfWeek.map((day, i) => (
                            <Select.Option key={i} value={day}>
                              {arabicDaysMap[day]}
                            </Select.Option>
                          ))}
                        </Select>
                      </Col>
                      <Col span={12}>
                        <Select
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="إختر الفترة"
                          value={activity.period}
                          onChange={(value) => handleFieldChangeCustom(activity.id, 'period', value)}
                          style={{ width: '100px' }}
                          getPopupContainer={(trigger) => trigger.parentNode}
                        >
                          {periods.map((period, i) => (
                            <Select.Option key={i} value={period}>
                              {arabicPeriodMap[period]}
                            </Select.Option>
                          ))}
                        </Select>

                        <Input
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder="الوصف"
                          value={activity.descrption}
                          onChange={(e) => handleFieldChangeCustom(activity.id, 'descrption', e.target.value)}
                          style={{ width: '200px', marginRight: '5px' }}
                        />
                        {modeAddEditViewModel === ModeComponent.edit && (
                          <Button
                            icon={<DeleteOutlined />}
                            onClick={() => onDeleteTask(activity.id)}
                            style={{ marginRight: '5px', border: 'none', borderRadius: '30px', backgroundColor: 'red', color: 'white' }}                           >
                          </Button>
                        )}
                      </Col>
                    </Row>
                  ))}

                  <Button
                    onClick={addActivity}
                    type="primary"
                    ghost
                    icon={<PlusOutlined />}
                    style={{ marginTop: '16px' }}
                    disabled={modeAddEditViewModel === ModeComponent.view}
                  />
                </StyledScrollableContainer>
              )}
            </StyledFormContentField>
          </StyledFormContentItem>
        </StyledFormContent>
        <StyledFormFooter>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <StyledFormBtn type='primary' ghost onClick={onCloseEditViewModel}>إلغاء</StyledFormBtn>
              {modeAddEditViewModel !== ModeComponent.view && (
                <StyledFormBtn type='primary' htmlType='submit'>حفظ</StyledFormBtn>
              )}
            </Col>
          </Row>
        </StyledFormFooter>
      </StyledForm>
    </StyledModal >
  );
};

export default AddEditWeekProgram;