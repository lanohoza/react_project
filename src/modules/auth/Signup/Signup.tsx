import React, { useEffect, useState } from 'react';
import {
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import {
  Checkbox,
  Form,
  Input,
  Select,
  Upload,
  Button,
  message,
  Row,
  Col,
} from 'antd';
import { FaFacebookF } from 'react-icons/fa';
import { useAuthMethod } from '@crema/hooks/AuthHooks';
import {
  StyledSignedText,
  StyledSignFooter,
  StyledSignIconBtn,
  StyledSignLinkTag,
  StyledSignSocialLink,
  StyledSignUp,
  StyledSignUpBtn,
  StyledSignUpContent,
  StyledSignUpForm,
  StyledSignupCheckBox,
  StyledSignupLink,
  StyledSignUpTestGrey,
} from './index.styled';
import { ScrollableContainer } from './index.styled';
import { getCommunesByIdWilaya } from '@core/services/CommuneService';
import { getDairasByIdWilaya } from '@core/services/DairaService';
import { getAllWilayas } from '@core/services/WilayaService';
import { StyledFormItem } from '@core/styles/createTechnicalCard/index.styled';
import { createUser } from '@core/services/UserService';
import { User } from '@core/types/models/user/UserTypes';
import { findEstablishmentsByCommuneId } from '@core/services/EstablishmentService';

const { Option } = Select;

const Signup = () => {
  const { signUpUser } = useAuthMethod();

  const [wilayas, setWilayas] = useState([]);
  const [dairas, setDairas] = useState([]);
  const [communes, setCommunes] = useState([]);
  const [establishments, setEstablishments] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchWilayas = async () => {
      try {
        const data = await getAllWilayas();
        setWilayas(data);
      } catch (error) { }
    };

    fetchWilayas();
  }, []);

  const fetchCommunes = async (idWilaya) => {
    const communesData = await getCommunesByIdWilaya(idWilaya);
    setCommunes(communesData);
  };

  const fetchEstablishments = async (communeId) => {
    const establishmentsData = await findEstablishmentsByCommuneId(communeId);
    setEstablishments(establishmentsData);
  };

  const handleWilayaChange = async (wilayaId) => {
    await fetchCommunes(wilayaId);
    setEstablishments([]);
  };

  const handleCommuneChange = async (communeId) => {
    await fetchEstablishments(communeId);
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
    form.validateFields(['image']);
  };

  const beforeUpload = (file) => {
    const isImageOrPdf =
      file.type.startsWith('image/') || file.type === 'application/pdf';
    if (!isImageOrPdf) {
      message.error('يمكنك فقط تحميل الصور أو ملفات PDF!');
      return Upload.LIST_IGNORE;
    }

    const isLt1M = file.size / 1024 / 1024 <= 1;
    if (!isLt1M) {
      message.error('يجب أن يكون حجم الملف أقل من أو يساوي 1 ميجا بايت!');
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const handleSubmit = async (values) => {
    console.log(fileList);
    if (fileList.length === 0) {
      message.error('الرجاء تحميل شهادة العمل!');
      return;
    }

    const user: User = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.firstName + ' ' + values.lastName,
      addresse: values.addresse,
      email: values.email,
      faxNumber: values.faxNumber,
      phoneNumber: values.phoneNumber,
      webSite: values.webSite,
      password: values.password,
      idCommune: values.idCommune,
      idEstablishment: values.idEstablishment,
      active: true,
    };

    const files = fileList.map((file) => file.originFileObj);

    signUpUser(user, files);
  };

  return (
    <StyledSignUp>
      <StyledSignUpContent>
        <StyledSignUpForm
          form={form}
          name='basic'
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                name='firstName'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء إدخال الاسم!' }]}
              >
                <Input placeholder='الاسم' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='lastName'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء إدخال اللقب!' }]}
              >
                <Input placeholder='اللقب' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                name='email'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'الرجاء إدخال البريد الإلكتروني!',
                  },
                ]}
              >
                <Input placeholder='البريد الإلكتروني' />
              </Form.Item>
            </Col>{' '}
            <Col span={12}>
              <Form.Item
                name='addresse'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء إدخال العنوان!' }]}
              >
                <Input placeholder='العنوان' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                name='password'
                className='form-field'
                rules={[
                  { required: true, message: 'الرجاء إدخال كلمة السر!' },
                  {
                    pattern: /^(?=.*[A-Z]).{8,}$/,
                    message:
                      'يجب أن تحتوي كلمة السر على 8 أحرف على الأقل وحرف كبير واحد على الأقل!',
                  },
                ]}
              >
                <Input.Password placeholder='كلمة السر' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='confirmPassword'
                className='form-field'
                rules={[
                  {
                    required: true,
                    message: 'الرجاء إعادة إدخال كلمة السر!',
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject('لا تطابق كلمة المرور الجديدة!');
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='إعادة إدخال كلمة السر' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              <Form.Item
                name='phoneNumber'
                className='form-field'
                rules={[
                  { required: true, message: 'الرجاء إدخال الهاتف النقال!' },
                ]}
              >
                <Input placeholder='الهاتف النقال' />
              </Form.Item>
            </Col>
            <Col span={12}>
              {' '}
              <Form.Item name='faxNumber' className='form-field'>
                <Input placeholder='الهاتف الثابت' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              {' '}
              <Form.Item
                name='wilaya'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء اختيار الولاية!' }]}
              >
                <Select placeholder='الولاية' onChange={handleWilayaChange}>
                  {wilayas.map((wilaya) => (
                    <Option key={wilaya.id} value={wilaya.id}>
                      {wilaya.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name='idCommune'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء اختيار البلدية!' }]}
              >
                <Select placeholder='البلدية' onChange={handleCommuneChange}>
                  {communes.map((commune) => (
                    <Option key={commune.id} value={commune.id}>
                      {commune.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={24}>
              <Form.Item
                name='idEstablishment'
                className='form-field'
                rules={[{ required: true, message: 'الرجاء اختيار المؤسسة!' }]}
              >
                <Select placeholder='المؤسسة'>
                  {establishments.map((establishment) => (
                    <Option key={establishment.id} value={establishment.id}>
                      {establishment.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={12}>
              {' '}
              <StyledFormItem
                name='image'
                rules={[
                  {
                    validator: (_, value) => {
                      if (fileList.length === 0) {
                        return Promise.reject(' الرجاء تحميل شهادة العمل أو بطاقة مهنية!');
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Upload
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={beforeUpload}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>تحميل شهادة العمل أو بطاقة مهنية</Button>
                </Upload>
              </StyledFormItem>
            </Col>
            <Col span={12}></Col>
          </Row>

          {/* <Form.Item
              name='username'
              className='form-field'
              rules={[{ required: true, message: 'الرجاء إدخال اسم المستخدم!' }]}
            >
              <Input placeholder='اسم المستخدم' />
            </Form.Item> */}

          <StyledSignupCheckBox
            name='i_agree'
            valuePropName='checked'
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                      new Error(
                        'الرجاء قراءة الشروط والأحكام والموافقة عليها!',
                      ),
                    ),
              },
            ]}
          >
            <Checkbox>
              <StyledSignUpTestGrey>
                أوافق على <StyledSignupLink>الشروط والأحكام</StyledSignupLink>
              </StyledSignUpTestGrey>
            </Checkbox>
          </StyledSignupCheckBox>

          <div className='form-btn-field'>
            <StyledSignUpBtn type='primary' htmlType='submit'>
              إنشاء حساب
            </StyledSignUpBtn>
          </div>

          <div className='form-field-action'>
            <StyledSignUpTestGrey>لديك حساب بالفعل؟</StyledSignUpTestGrey>
            <StyledSignLinkTag href='/signin'>تسجيل الدخول</StyledSignLinkTag>
          </div>
        </StyledSignUpForm>
      </StyledSignUpContent>

      {/* <StyledSignFooter>
        <StyledSignedText>أو قم بالتسجيل باستخدام</StyledSignedText>
        <StyledSignSocialLink>
          <StyledSignIconBtn shape='circle' icon={<GoogleOutlined />} />
          <StyledSignIconBtn shape='circle' icon={<FaFacebookF />} />
          <StyledSignIconBtn shape='circle' icon={<GithubOutlined />} />
          <StyledSignIconBtn shape='circle' icon={<TwitterOutlined />} />
        </StyledSignSocialLink>
      </StyledSignFooter> */}
    </StyledSignUp>
  );
};

export default Signup;
