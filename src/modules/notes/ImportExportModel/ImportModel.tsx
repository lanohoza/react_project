'use client';
import React, { useState } from 'react';

import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { Form, Select, Upload, message, notification } from 'antd';
import { useClasseActionsContext } from '../../classes/ClassContextProvider';
import { useNoteActionsContext, useNoteContext } from '../NoteContextProvider';
import { InboxOutlined } from '@ant-design/icons';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { Classe, GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { Year } from '@core/types/models/year/YearTypes';
import { importFile } from '@core/services/NoteService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getAllTrimestresByYear } from '@core/services/TrimestreService';
import { getAllClassesByYear } from '@core/services/ClasseService';

const { Dragger } = Upload;

const ImportNoteModel = () => {
    const infoViewActionsContext = useInfoViewActionsContext();

    const { setOpenImportModel, reload } = useNoteActionsContext();
    const { years, openImportModel } = useNoteContext();
    const [trimestres, setTrimestres] = useState<Trimestre[]>([] as Trimestre[]);
    const [classes, setClasses] = useState<Classe[]>([] as Classe[]);

    const { Option } = Select;
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleUpload = async () => {
        const values = await form.validateFields();
        const { idClasse, idTrimestre, numberOfTrimestre } = values;

        const formData = new FormData();
        if (fileList.length > 0) {
            formData.append('file', fileList[0]);
        }

        setUploading(true);



        importFile(idClasse, idTrimestre, formData, infoViewActionsContext).then(response => {
            notification.success({ message: 'تم إستيراد نتائج التلاميذ بنجاح' });
            setOpenImportModel(false);
            reload();
        }).catch((error) => {
            notification.warning({ message: error.message });
        }).finally(() => {
            setUploading(false);
        })

    };
    const onSelectYear = (idYear: number) => {
        getAllTrimestresByYear(idYear, infoViewActionsContext).then((trimestre) =>
            setTrimestres(trimestre),
        );
        getAllClassesByYear(idYear, infoViewActionsContext).then((classedtos) =>
            setClasses(classedtos),
        );
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
        accept: '.xlsx,.xls',
    };

    return (
        <>
            <StyledModal
                footer={false}
                open={openImportModel}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={"50%"}
                onCancel={() => { setOpenImportModel(false); }}

            >
                <StyledForm form={form} onFinish={handleUpload}>
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            إستيراد ملف النتائج
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
                                        onChange={onSelectYear}
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
                                    labelAlign={'left'}

                                    name="idTrimestre"
                                    label="الفصل"
                                    labelCol={{ span: 6 }}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder='الفصل'
                                    >
                                        {trimestres.map((trimestre: Trimestre) => (
                                            <Option value={trimestre.id} key={trimestre.id}>
                                                {trimestre.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    labelAlign={'left'}
                                    label="القسم"
                                    name="idClasse"
                                    labelCol={{ span: 6 }}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Select
                                        style={{ width: '100%' }}
                                        showSearch
                                        placeholder='القسم'
                                    >
                                        {classes.map((classe: GetClasseDto) => (
                                            <Option value={classe.id} key={classe.id}>
                                                {classe.title}
                                            </Option>
                                        ))}
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

export default ImportNoteModel;
