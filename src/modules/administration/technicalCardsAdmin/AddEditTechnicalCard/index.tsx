'use client';
import React, { useEffect, useState } from 'react';
import {
  Form,
  Upload,
  message,
  Row,
  Col,
  Button,
  Select,
  Spin,
  Input,
  Progress,
  Space,
} from 'antd';
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
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Student } from '@core/types/models/student/StudentTypes';
import { createStudent, updateStudent } from '@core/services/StudentService';
import { ModeComponent } from '@core/types/models/core/models';
import {
  useTechnicalCardActionsContext,
  useTechnicalCardContext,
} from '../TechnicalCardContextProvider';
import { TechnicalCard } from '@core/types/models/technicalCards/TechnicalCardTypes';
import {
  getAllGeneralObjectivesCreatedBy,
  getAllGeneralObjectivesCreatedByAdmin,
  getGeneralObjectivesByCreatedBy,
} from '@core/services/GeneralObjectiveService';
import {
  createTechnicalCard,
  updateTechnicalCard,
} from '@core/services/TechnicalCardService';
import { UploadOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllOfficialTxts } from '@core/services/OfficialTxtService';
import { getAllTechnicalCardCategory } from '@core/services/TechnicalCardCategoryService';
import { uploadImage } from '@core/services/FtpClientService';
import { GeneralObjective } from '@core/types/models/generalObjective/GeneralObjectiveTypes';
import { Audience } from '@core/types/models/audience/AudienceTypes';
import { Difficulty } from '@core/types/models/difficulty/DifficultyTypes';
import DynamicTreeSelect from '@core/components/DynamicTreeSelect';
import { getAllAudiences } from '@core/services/AudienceService';
import { getAllDifficulties } from '@core/services/DifficultyService';
import { getAllHumanToolsCreatedBy, getAllHumanToolsCreatedByAdmin } from '@core/services/HumanToolService';
import {
  StyledFormItem,
  StyledInput,
  StyledInputNumber,
} from '@core/styles/createTechnicalCard/index.styled';
import { TechnicalCardType } from '@core/types/enums/TypeTcTask';
import { HumanTool } from '@core/types/models/humanTool/HumanToolTypes';
import { OfficialTxt } from '@core/types/models/officialTxt/OfficialTxtTypes';
import GeneralObjectiveTreeSelect from './GeneralObjectiveTreeSelect';
import HumanToolSelect from './HumanToolSelect';
import { monthsInArabic, weeks } from '@crema/hooks/dateHooks';
import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';
import { createTechnicalCardFromAdministration, updateTechnicalCardFromAdmin } from '@core/services/TechnicalCardAdminService';
import OfficialTxtSelect from './OfficialTxtSelect';
import { TypeEstablishment } from '@core/types/enums/TypeEtablissement';

const AddEditTechnicalCard = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { onCloseEditViewModel, reload } = useTechnicalCardActionsContext();
  const {
    initialData,
    modeAddEditViewModel,
    openAddEditViewModel,
    technicalCardCategories,
  } = useTechnicalCardContext();
  const [form] = Form.useForm();

  const [generalObjectives, setGeneralObjectives] = useState<
    GeneralObjective[]
  >([]);

  const [audiences, setAudiences] = useState<Audience[]>([]);
  const [humanTools, setHumanTools] = useState<HumanTool[]>([]);
  const [officialTxts, setOfficialTxts] = useState<OfficialTxt[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [technicalCardType, setTechnicalCardType] = useState(
    TechnicalCardType.TEMPORARY,
  );
  const [typeEstablishment, setTypeEstablishment] = useState(
    TypeEstablishment.ALL,
  );
  const { TextArea } = Input;

  const fetchData = async () => {
    getAllAudiences(infoViewActionsContext)
      .then((fetchedAudiences) => setAudiences(fetchedAudiences))
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    // getAllOfficialTxts(infoViewActionsContext)
    //   .then((fetchedOfficialTxts) => setOfficialTxts(fetchedOfficialTxts))
    //   .catch((error) => {
    //     infoViewActionsContext.fetchError(error.message);
    //   });
    getAllDifficulties(infoViewActionsContext)
      .then((fetchedDifficulties) => setDifficulties(fetchedDifficulties))
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
    loadGeneralObjectives();
    loadHumanTools();
    loadOfficialTxts();
  };

  const loadGeneralObjectives = () => {
    getAllGeneralObjectivesCreatedByAdmin(infoViewActionsContext)
      .then((objectives) => setGeneralObjectives(objectives))
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  const loadHumanTools = () => {
    getAllHumanToolsCreatedByAdmin(infoViewActionsContext)
      .then((fetchedHumanTools) => setHumanTools(fetchedHumanTools))
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  const loadOfficialTxts = () => {
    getAllOfficialTxts(infoViewActionsContext)
      .then((fetchedOfficialTxts) => setOfficialTxts(fetchedOfficialTxts))
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onFinish = async (values: any) => {
    // Prepare the technical card data
    const technicalCard = {
      ...initialData, // Spread existing data if updating
      title: values.title,
      type: values.type,
      idTcCategory: values.idTcCategory,
      audienceIds: values.audienceIds,
      generalObjectiveIds: values.generalObjectiveIds,
      humanToolIds: values.humanToolIds,
      difficultyIds: values.difficultyIds,
      officialTxtIds: values.officialTxtIds,
      materielToots: values.materielToots,
      runMonth: values.runMonth,
      runWeek: values.runWeek,
      feedback: values.feedback,
      typeEstablishment: typeEstablishment,
      // source:SourceTechnicalCard.ADMIN,
    };

    if (modeAddEditViewModel === ModeComponent.create) {
      // Create a new technical card
      createTechnicalCardFromAdministration(technicalCard, infoViewActionsContext)
        .then(() => {
          infoViewActionsContext.showMessage('تم إنشاء البطاقة التقنية بنجاح');
          reload();
          onCloseEditViewModel();
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
    } else {
      // Update the existing technical card
      updateTechnicalCardFromAdmin(
        technicalCard.id,
        technicalCard,
        infoViewActionsContext,
      )
        .then(() => {
          infoViewActionsContext.showMessage('تم تحديث البطاقة التقنية بنجاح');
          reload();
          onCloseEditViewModel();
        })
        .catch((error) => {
          infoViewActionsContext.fetchError(error.message);
        });
    }
  };

  const { Option } = Select;

  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({ ...initialData });
      setTechnicalCardType(initialData.type);
      setTypeEstablishment(initialData.typeEstablishment);
    }
  }, [initialData]);

  return (
    <>
      <StyledModal
        footer={false}
        open={openAddEditViewModel}
        aria-labelledby='keep-mounted-modal-title'
        aria-describedby='keep-mounted-modal-description'
        width={'75%'}
        onCancel={() => onCloseEditViewModel()}
      >
        <StyledForm form={form} onFinish={onFinish}>
          <StyledFormHeader>
            <StyledFormHeaderTitle>
              {modeAddEditViewModel === ModeComponent.create &&
                'إضافة بطاقة تقنية'}
              {modeAddEditViewModel === ModeComponent.edit &&
                'تعديل بطاقة تقنية'}
              {modeAddEditViewModel === ModeComponent.view && 'عرض بطاقة تقنية'}
            </StyledFormHeaderTitle>
          </StyledFormHeader>
          <StyledFormContent>
            <StyledFormContentItem>
              <StyledFormContentField>
                <StyledForm form={form} onFinish={onFinish}>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <StyledFormItem
                        label='الرمز'
                        name='code'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                      >
                        <StyledInputNumber min={0} disabled />
                      </StyledFormItem>
                    </Col>
                    <Col span={12}>
                      <StyledFormItem
                        label='نوع المؤسسة'
                        name='typeEstablishment'
                        labelAlign={'left'}
                        labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء إدخال نوع المؤسسة!',
                          },
                        ]}
                      >
                        <Select
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          value={TypeEstablishment.ALL}
                          onChange={(value: TypeEstablishment) =>
                            setTypeEstablishment(value)
                          }
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        >
                          <Option value={TypeEstablishment.ALL}>
                            الكل
                          </Option>
                          <Option value={TypeEstablishment.PRIMARY}>
                            إبتدائي
                          </Option>
                          <Option value={TypeEstablishment.MIDDLE}>
                            متوسط
                          </Option>
                          <Option value={TypeEstablishment.SECONDARY}>
                            ثانوي
                          </Option>
                        </Select>
                        {/* <StyledInputNumber min={0} disabled /> */}
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <StyledFormItem
                        label='العنوان'
                        name='title'
                        labelAlign='left'
                        labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء إدخال العنوان!',
                          },
                        ]}
                      >
                        <StyledInput
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                      </StyledFormItem>
                    </Col>

                    <Col span={12}>
                      <StyledFormItem
                        label='النوع'
                        name='type'
                        labelAlign='left'
                        labelCol={{ span: 8 }}
                        rules={[
                          { required: true, message: 'الرجاء تحديد النوع!' },
                        ]}
                      >
                        <Select
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          value={TechnicalCardType.TEMPORARY}
                          onChange={(value: TechnicalCardType) =>
                            setTechnicalCardType(value)
                          }
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        >
                          <Option value={TechnicalCardType.TEMPORARY}>
                            مؤقت
                          </Option>
                          <Option value={TechnicalCardType.PERMANENT}>
                            دائم
                          </Option>
                          <Option value={TechnicalCardType.ONORDER}>
                            {' '}
                            حسب الطلب
                          </Option>
                        </Select>
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={12}>
                      <StyledFormItem
                        label='باب النشاط '
                        name='idTcCategory'
                        labelAlign='left'
                        labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء تحديد باب النشاط  !',
                          },
                        ]}
                      >
                        <Select
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          defaultValue={initialData?.idTcCategory}
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        >
                          {technicalCardCategories.map((category) => (
                            <Option key={category.id} value={category.id}>
                              {category.name}
                            </Option>
                          ))}
                        </Select>
                      </StyledFormItem>
                    </Col>
                    <Col span={12}>
                      <StyledFormItem
                        label='الجمهور المستهدف'
                        name='audienceIds'
                        labelAlign='left'
                        labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء تحديد الجمهور المستهدف !',
                          },
                        ]}
                      >
                        <Select
                          mode='multiple'
                          showSearch
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder='حدد المجالات'
                        >
                          {audiences.map((audience) => (
                            <Option key={audience.id} value={audience.id}>
                              {audience.name}
                            </Option>
                          ))}
                        </Select>
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={24}>
                      <StyledFormItem
                        label='الأهداف'
                        name='generalObjectiveIds'
                        labelAlign='left'
                        labelCol={{ span: 4 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء تحديد الأهداف!',
                          },
                        ]}
                      >
                        <GeneralObjectiveTreeSelect
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          value={initialData?.generalObjectiveIds}
                          onChange={(value) =>
                            form.setFieldsValue({ generalObjectiveIds: value })
                          }
                          reload={loadGeneralObjectives}
                          dataTree={generalObjectives}
                        ></GeneralObjectiveTreeSelect>
                      </StyledFormItem>
                    </Col>
                    <Col span={24}>
                      <StyledFormItem
                        label='الادوات المادية '
                        name='materielToots'
                        labelAlign={'left'}
                        labelCol={{ span: 4 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء إدخال الأدوات المستخدمة!',
                          },
                        ]}
                      >
                        <TextArea
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                      </StyledFormItem>
                    </Col>
                    <Col span={24}>
                      <StyledFormItem
                        label='الأدوات البشرية'
                        name='humanToolIds'
                        labelAlign='left'
                        labelCol={{ span: 4 }}
                      >
                        <HumanToolSelect
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          onChange={(value) =>
                            form.setFieldsValue({ humanToolIds: value })
                          }
                          value={initialData?.humanToolIds}
                          items={humanTools}
                          reload={loadHumanTools}
                        ></HumanToolSelect>
                      </StyledFormItem>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <StyledFormItem
                        label='الصعوبات المستهدفة'
                        name='difficultyIds'
                        labelAlign='left'
                        labelCol={{ span: 4 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء تحديد الصعوبات المستهدفة!',
                          },
                        ]}
                      >
                        <Select
                          mode='multiple'
                          showSearch
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder='حدد الصعوبات'
                        >
                          {difficulties.map((difficulty) => (
                            <Option key={difficulty.id} value={difficulty.id}>
                              {difficulty.title}
                            </Option>
                          ))}
                        </Select>
                      </StyledFormItem>
                    </Col>
                  </Row>
                  {technicalCardType == TechnicalCardType.TEMPORARY && (
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                      <Col span={12}>
                        <StyledFormItem
                          label='شهر الإنجاز'
                          name='runMonth'
                          labelAlign='left'
                          labelCol={{ span: 8 }}
                          rules={[
                            {
                              required: true,
                              message: 'الرجاء إدخال شهر الانجاز !',
                            },
                          ]}
                        >
                          <Select
                            placeholder='الشهر'
                            filterOption={(input, option) =>
                              ((option?.children ?? '') as any)
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            disabled={
                              modeAddEditViewModel === ModeComponent.view
                            }
                          >
                            {monthsInArabic.map((month, index) => (
                              <Option key={index} value={index + 1}>
                                {month}
                              </Option>
                            ))}
                          </Select>
                        </StyledFormItem>
                      </Col>
                      <Col span={12}>
                        <StyledFormItem
                          label='أسبوع الإنجاز'
                          name='runWeek'
                          labelAlign='left'
                          labelCol={{ span: 8 }}
                          rules={[
                            {
                              required: true,
                              message: 'الرجاء إدخال اسبوع الانجاز !',
                            },
                          ]}
                        >
                          <Select
                            placeholder='الأسبوع'
                            filterOption={(input, option) =>
                              ((option?.children ?? '') as any)
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            disabled={
                              modeAddEditViewModel === ModeComponent.view
                            }
                          >
                            {weeks.map((week, index) => (
                              <Option key={index} value={index + 1}>
                                {week}
                              </Option>
                            ))}
                          </Select>
                        </StyledFormItem>
                      </Col>
                    </Row>
                  )}
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={24}>
                      <StyledFormItem
                        label='النصوص الرسمية'
                        name='officialTxtIds'
                        labelAlign='left'
                        labelCol={{ span: 4 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء تحديد النصوص الرسمية !',
                          },
                        ]}
                      >
                        <OfficialTxtSelect
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          onChange={(value) =>
                            form.setFieldsValue({ officialTxtIds: value })
                          }
                          value={initialData?.officialTxtIds}
                          items={officialTxts}
                          reload={loadOfficialTxts}
                        ></OfficialTxtSelect>
                        {/* <Select
                          mode='multiple'
                          showSearch
                          filterOption={(input, option) =>
                            ((option?.children ?? '') as any)
                              .toLowerCase()
                              .includes(input.toLowerCase())
                          }
                          disabled={modeAddEditViewModel === ModeComponent.view}
                          placeholder='حدد النصوص الرسمية'
                        >
                          {officialTxts.map((txt) => (
                            <Option key={txt.id} value={txt.id}>
                              {txt.title}
                            </Option>
                          ))}
                        </Select> */}
                      </StyledFormItem>
                    </Col>
                    <Col span={24}>
                      <StyledFormItem
                        label='مؤشر التحقق'
                        name='feedback'
                        labelAlign={'left'}
                        labelCol={{ span: 4 }}
                        rules={[
                          {
                            required: true,
                            message: 'الرجاء مؤشر التحقق  !',
                          },
                        ]}
                      >
                        <TextArea
                          disabled={modeAddEditViewModel === ModeComponent.view}
                        />
                      </StyledFormItem>
                    </Col>
                  </Row>
                </StyledForm>
              </StyledFormContentField>
            </StyledFormContentItem>
          </StyledFormContent>
          <StyledFormFooter>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={24}>
                <StyledFormBtn
                  type='primary'
                  ghost
                  onClick={onCloseEditViewModel}
                >
                  إلغاء
                </StyledFormBtn>
                {modeAddEditViewModel !== ModeComponent.view && (
                  <StyledFormBtn type='primary' htmlType='submit'>
                    حفظ
                  </StyledFormBtn>
                )}
              </Col>
            </Row>
          </StyledFormFooter>
        </StyledForm>
      </StyledModal>
    </>
  );
};

export default AddEditTechnicalCard;
