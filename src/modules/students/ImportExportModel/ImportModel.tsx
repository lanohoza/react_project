'use client';
import React, { useState } from 'react';

import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { Form, Select, Upload, message } from 'antd';
import { useClasseActionsContext } from '../../classes/ClassContextProvider';
import { useStudentActionsContext, useStudentContext } from '../StudentContextProvider';
import { InboxOutlined } from '@ant-design/icons';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { importFile } from '@core/services/StudentService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getAllTrimestresByYear } from '@core/services/TrimestreService';

const { Dragger } = Upload;

const ImportStudentModel = () => {
    const infoViewActionsContext = useInfoViewActionsContext();

    const { setOpenImportModel, reload } = useStudentActionsContext();
    const { years, openImportModel } = useStudentContext();

    const { Option } = Select;
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleUpload = async () => {
        const values = await form.validateFields();
        const { idYear } = values;

        const formData = new FormData();
        if (fileList.length > 0) {
            formData.append('file', fileList[0]);
        }

        setUploading(true);


        importFile(idYear, formData, infoViewActionsContext).then(response => {
            infoViewActionsContext.showMessage('تم إستيراد التلاميذ بنجاح');
            setOpenImportModel(false);
            reload();
        }).catch((error) => {
            console.log(error);
            infoViewActionsContext.fetchError(' حدث خطأ أثناء عملية استيراد التلاميذ ' + error.message);
        }).finally(() => {
            setUploading(false);
        })

    };



    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: file => {
            setFileList([file]);
            return false;
        },
        onRemove: file => {
            setFileList([]);
        },
        fileList,
        accept: '.xlsx',
    };

    return (
        <>
            <StyledModal
                footer={false}
                open={openImportModel}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={"40%"}
                onCancel={() => { setOpenImportModel(false); }}

            >
                <StyledForm form={form} onFinish={handleUpload}>
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            إستيراد ملف التلاميذ
                        </StyledFormHeaderTitle>
                    </StyledFormHeader>
                    <StyledFormContent>
                        <StyledFormContentItem>
                            <StyledFormContentField>
                                <Form.Item
                                    name="idYear"
                                    label="الموسم الدراسي"
                                    labelCol={{ span: 6 }}
                                    labelAlign={'left'}

                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder='الموسم الدراسي'
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

                                <Form.Item
                                    className='form-field'
                                    name="file"
                                    labelCol={{ span: 4 }}
                                    labelAlign={'left'}
                                    rules={[{ required: true, message: 'Please upload a file' }]}
                                >
                                    <Dragger {...uploadProps} multiple={false}>
                                        <p className='ant-upload-drag-icon'>
                                            <InboxOutlined />
                                        </p>
                                        <p className='ant-upload-text'>
                                            انقر أو اسحب الملف إلى هذه المنطقة للتحميل
                                        </p>
                                        <p className='ant-upload-hint'>
                                            يدعم فقط الصيغة excel
                                        </p>
                                    </Dragger>
                                </Form.Item>
                            </StyledFormContentField>
                        </StyledFormContentItem>
                    </StyledFormContent>
                    <StyledFormFooter>
                        <StyledFormBtn type='primary' htmlType='submit' size='middle' loading={uploading}>
                            إستراد البيانات
                        </StyledFormBtn>
                    </StyledFormFooter>
                </StyledForm>
            </StyledModal>
        </>
    );
};

export default ImportStudentModel;
