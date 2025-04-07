'use client';
import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SaveOfficialTxt, deleteOfficialTxt } from '@core/services/OfficialTxtService';
import DynamicSelect from '@core/components/DynamicSelect';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import {
    StyledForm,
    StyledFormHeader,
    StyledFormHeaderTitle,
    StyledFormContent,
    StyledFormContentItem,
    StyledFormContentField,
    StyledFormFooter,
    StyledFormBtn,
} from '../../../technicalCards/AddEditTechnicalCard/index.styled';
import { OfficialTxt } from '@core/types/models/officialTxt/OfficialTxtTypes';
import { getAllOfficielTextCategory } from '@core/services/OfficielTextCategoryService';
import { OfficielTextCategory } from '@core/types/models/officielTextCategory/OfficielTextCategoryTypes';
import moment from 'moment';

const OfficialTxtSelect = ({ onChange, items, reload, value, disabled }) => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<OfficialTxt | null>(null);
    const [form] = Form.useForm();
    const [officialTxtsCategorys, setOfficialTxtsCategorys] = useState<OfficielTextCategory[]>([]);

    useEffect(() => {
        if (currentItem) {
            form.setFieldsValue({
                ...currentItem,
                date: currentItem.date ? moment(currentItem.date) : null,
            });
        }
    }, [currentItem]);

    useEffect(() => {
        getAllOfficielTextCategory(infoViewActionsContext)
            .then((fetchedOfficialTxtsCategorys) => setOfficialTxtsCategorys(fetchedOfficialTxtsCategorys))
            .catch((error) => {
                infoViewActionsContext.fetchError(error.message);
            });
    }, []);

    const onEditItem = (item: OfficialTxt) => {
        setIsModalOpen(true);
        setCurrentItem(item);
    };

    const onRemoveItem = (item: OfficialTxt) => {
        deleteOfficialTxt(item.id, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage('تم الحذف بنجاح');
        });
    };

    const onFinish = (values: any) => {
        const officialTxt = {
            ...currentItem,
            ...values,
            date: values.date ? values.date.format('YYYY-MM-DD') : null,
        };
    
        SaveOfficialTxt(officialTxt, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage('تم الحفظ بنجاح');
            setIsModalOpen(false);
        });
    };
    

    const onGetKey = (item) => item.id;
    const onGetContent = (item: OfficialTxt) => item.title;

    return (
        <>
            <Row>
                <Col span={21}>
                    <DynamicSelect
                        disabled={disabled}
                        value={value}
                        onGetKey={onGetKey}
                        onChange={onChange}
                        onGetConent={onGetContent}
                        OnRemoveItem={onRemoveItem}
                        OnEditItem={onEditItem}
                        items={items}
                        itemName='نص'
                        childItemName='نص رسمي'
                        itemsTitle="النصوص الرسمية"
                        childItemsTitle="النصوص الرسمية"
                    />
                </Col>
                <Col span={3} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Button
                        disabled={disabled}
                        onClick={() => {
                            setIsModalOpen(true);
                            setCurrentItem(null);
                        }}
                        style={{ marginBottom: '20px' }}
                        icon={<PlusOutlined />}
                    />
                </Col>
            </Row>

            {isModalOpen && (
                <Modal
                    footer={null}
                    open={isModalOpen}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <StyledForm
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 8 }}
                    >
                        <StyledFormHeader>
                            <StyledFormHeaderTitle>
                                {currentItem === null ? 'إضافة نص رسمي' : 'تعديل نص رسمي'}
                            </StyledFormHeaderTitle>
                        </StyledFormHeader>
                        <StyledFormContent>
                            <StyledFormContentItem>
                                <StyledFormContentField>
                                    <Form.Item
                                        name="title"
                                        label="العنوان"
                                        labelCol={{ span: 8 }}
                                        labelAlign="left"
                                        rules={[{ required: true, message: 'الرجاء إدخال العنوان!' }]}
                                    >
                                        <Input placeholder="أدخل عنوان النص" />
                                    </Form.Item>
                                    <Form.Item
                                        name="number"
                                        label="الرقم"
                                        labelCol={{ span: 8 }}
                                        labelAlign="left"
                                        rules={[{ required: true, message: 'الرجاء إدخال الرقم!' }]}
                                    >
                                        <Input placeholder="أدخل رقم النص" />
                                    </Form.Item>
                                    <Form.Item
                                        name="date"
                                        label="التاريخ"
                                        labelCol={{ span: 8 }}
                                        labelAlign="left"
                                        rules={[{ required: true, message: 'الرجاء إدخال التاريخ!' }]}
                                    >
                                        <DatePicker
                                            placeholder="اختر التاريخ"
                                            style={{ width: '100%' }}
                                            format="YYYY-MM-DD"
                                        />
                                    </Form.Item>


                                    <Form.Item
                                        name="idOfficielTextCategory"
                                        label="الفئة"
                                        labelCol={{ span: 8 }}
                                        labelAlign="left"
                                        rules={[{ required: true, message: 'الرجاء اختيار الفئة!' }]}
                                    >
                                        <Select
                                            placeholder="اختر فئة النص الرسمي"
                                            options={officialTxtsCategorys.map((category) => ({
                                                label: category.name,
                                                value: category.id,
                                            }))}
                                            allowClear
                                        />
                                    </Form.Item>

                                </StyledFormContentField>
                            </StyledFormContentItem>
                        </StyledFormContent>
                        <StyledFormFooter>
                            <StyledFormBtn
                                type="primary"
                                ghost
                                onClick={() => setIsModalOpen(false)}
                            >
                                إلغاء
                            </StyledFormBtn>
                            <StyledFormBtn type="primary" htmlType="submit">
                                حفظ
                            </StyledFormBtn>
                        </StyledFormFooter>
                    </StyledForm>
                </Modal>
            )}
        </>
    );
};

export default OfficialTxtSelect;
