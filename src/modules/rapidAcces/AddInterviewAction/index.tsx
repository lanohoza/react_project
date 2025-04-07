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

import { GrReturn } from 'react-icons/gr';
import { Student } from '../../../@core/types/models/student/StudentTypes';
import { getAllStudentByCurrents } from '@core/services/StudentService';
import {
  Interview,
  InterviewType,
} from '@core/types/models/interview/InterviewTypes';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import { Solution } from '@core/types/models/solution/SolutionTypes';
import { getAllDifficulties } from '@core/services/DifficultyService';
import { getAllSolutions } from '@core/services/SolutionService';
import {
  createInterview,
  updateInterview,
} from '@core/services/InterviewService';
import { getAllGuidanceGroupByCurrents } from '@core/services/GuidanceGroupsService';
import { GuidanceGroup } from '@core/types/models/guidanceGroup/GuidanceGroupTypes';
import TextArea from 'antd/es/input/TextArea';
import {
  Followup,
  FollowupType,
} from '@core/types/models/followUp/FollowupTypes';
import { getAllFollowupByCurrents } from '@core/services/FlowUpService';
import {
  useRapidAccesActionsContext,
  useRapidAccesContext,
} from '../RapidAccesContextProvider';
import { useRouter } from 'next/navigation';
import { getAllShedCategories } from '@core/services/ShedCategoryService';
import { getAllShedSettingsByCategory } from '@core/services/ShedSettingService';

const AddIterviewAction = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { openAddInterviewAction, selectdStudent } = useRapidAccesContext();
  const { onChangeOpenAddInterviewAction } = useRapidAccesActionsContext();
  const [shedSettings, setShedSettings] = useState<any[]>([]);
  const [shedCategories, setShedCategories] = useState<any[]>([]);
  const router = useRouter();

  const { Option } = Select;
  const [form] = Form.useForm();

  useEffect(() => {
    if (openAddInterviewAction) {
      /*  */

      getAllShedCategories(infoViewActionsContext).then((shedCategorieDts) => {
        setShedCategories(shedCategorieDts);
      });
    }
    /**/
  }, []);

  useEffect(() => {
    if (selectdStudent) {
      form.setFieldsValue({
        type: InterviewType.single,
        idStudent: selectdStudent.id,
      });
    }
  }, [selectdStudent]);
  const onShedCategory = (idCategory) => {
    form.setFieldsValue({idShedSettings:undefined});
    getAllShedSettingsByCategory(idCategory, infoViewActionsContext).then(
      (shedSettingDto) => setShedSettings(shedSettingDto)
    );
  };
  const onFinish = (values: any) => {
    const interview = {
      ...values,
      id: selectdStudent?.id,
      accessRapid:true
    } as Interview;
    createInterview(interview, infoViewActionsContext)
      .then((InterviewId) => {
        infoViewActionsContext.showMessage('تم إضافة المقابلة بنجاح');
        onChangeOpenAddInterviewAction(false);
        router.push(`/interviews/details?id=` + InterviewId);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  return (
    <>
      <StyledModal
        footer={false}
        open={openAddInterviewAction}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
        width={'60%'}
        onCancel={() => {
          onChangeOpenAddInterviewAction(false);
        }}
      >
        <StyledForm form={form} labelCol={{ span: 6 }} onFinish={onFinish}>
          <StyledFormHeader>
            <StyledFormHeaderTitle>إضافة مقابلة جديد</StyledFormHeaderTitle>
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
                      label='نوع المقابلة'
                      rules={[{ required: true }]}
                    >
                      <Select
                        style={{ width: '100%' }}
                        showSearch
                        placeholder='نوع المقابلة'
                        disabled
                      >
                        <Option value={InterviewType.single}>فردي</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col span={24}>
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
                        placeholder='التلميذ'
                        disabled
                      >
                        <Option value={selectdStudent.id}>
                          {selectdStudent.firstName} {selectdStudent.lastName}
                        </Option>
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
                      <TextArea></TextArea>
                    </Form.Item>
                  </Col>
                </Row>
              </StyledFormContentField>
            </StyledFormContentItem>
          </StyledFormContent>

          <StyledFormFooter>
            <StyledFormBtn
              type='primary'
              ghost
              onClick={() => {
                onChangeOpenAddInterviewAction(false);
              }}
            >
              إلغاء
            </StyledFormBtn>
            <StyledFormBtn type='primary' htmlType='submit'>
              حفظ
            </StyledFormBtn>
          </StyledFormFooter>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default AddIterviewAction;
