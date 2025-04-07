'use client';
import React, { useEffect, useState } from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import DynamicTreeSelect from '@core/components/DynamicTreeSelect';
import { deleteGeneralObjective, saveGeneralObjective } from '@core/services/GeneralObjectiveService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import DynamicSelect from '@core/components/DynamicSelect';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { PlusOutlined } from '@ant-design/icons';
import { ModeComponent } from '@core/types/models/core/models';
import { Level } from '@core/types/models/level/LevelTypes';
import { Year } from '@core/types/models/year/YearTypes';
import form from 'antd/es/form';
import { StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContent, StyledFormContentItem, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { HumanTool } from '@core/types/models/humanTool/HumanToolTypes';
import { deleteHumanTool, SaveHumanTool } from '@core/services/HumanToolService';
import { SourceTechnicalCard } from '@core/types/enums/SourceTechnicalCard';




const HumanToolSelect = ({ onChange, items, reload, value, disabled }) => {
    const infoViewActionsContext = useInfoViewActionsContext()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [currentItem, setICurrentItem] = useState<HumanTool>(null);
    const [form] = Form.useForm();


    useEffect(() => {
        if (currentItem) {
            form.setFieldsValue(currentItem);
        }
    }, [currentItem]);

    const OnEditItem = (item) => {
        setIsModalOpen(true);
        setICurrentItem(item);
    }
    const OnRemoveItem = (item) => {
        deleteHumanTool(item.id, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage("تم الحذف لنجاح بنجاح");
        });
    }
    const onFinish = (values) => {

        const humanTool = { ...currentItem, firstName: values.firstName, lastName: values.lastName, adresse: values.adresse};
        SaveHumanTool(humanTool, infoViewActionsContext).then(() => {
            reload();
            infoViewActionsContext.showMessage("تم الحفظ  بنجاح");
            setIsModalOpen(false);

        });
    }


    const onGetKey = (item) => {
        return item.id;
    }
    const onGetConent = (item: HumanTool) => {
        return item.firstName + " " + item.lastName;
    }
    return (
        <>
            <Row>
                <Col span={21}>
                    <DynamicSelect disabled={disabled} value={value} onGetKey={onGetKey} onChange={onChange} onGetConent={onGetConent} OnRemoveItem={OnRemoveItem} OnEditItem={OnEditItem} items={items} itemName='شخص' childItemName='هدف تنفيذي' itemsTitle="الأهداف العامة" childItemsTitle="الاهداف التنفيذية"></DynamicSelect>
                </Col>
                <Col span={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        disabled={disabled}
                        onClick={() => { setIsModalOpen(true); setICurrentItem(null); }}
                        style={{ marginBottom: '20px' }}
                        icon={<PlusOutlined />}
                    />
                </Col>
            </Row>
            {isModalOpen && <Modal
                footer={false}
                open={isModalOpen}
                onCancel={() => { setIsModalOpen(false); }}
            >
                <StyledForm form={form} onFinish={onFinish} labelCol={{ span: 8 }}
                >
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            {currentItem === null && 'إضافة مورد بشري '}
                            {currentItem !== null && 'تعديل مورد بشري '}
                        </StyledFormHeaderTitle>
                    </StyledFormHeader>
                    <StyledFormContent>
                        <StyledFormContentItem>
                            <StyledFormContentField>
                                <Form.Item
                                    name="firstName"
                                    label="الاسم"
                                    labelCol={{ span: 8 }}
                                    labelAlign={'left'}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    label="اللقب"
                                    labelCol={{ span: 8 }}
                                    labelAlign={'left'}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="adresse"
                                    label="العنوان"
                                    labelCol={{ span: 8 }}
                                    labelAlign={'left'}
                                    className='form-field'
                                    rules={[{ required: true }]}
                                >
                                    <Input />
                                </Form.Item>
                            </StyledFormContentField >
                        </StyledFormContentItem>
                    </StyledFormContent>
                    <StyledFormFooter>
                        <StyledFormBtn
                            type='primary'
                            ghost
                            onClick={() => { setIsModalOpen(false); }}
                        >
                            إلغاء
                        </StyledFormBtn>
                        <StyledFormBtn type='primary' htmlType='submit' >
                            حفظ
                        </StyledFormBtn>
                    </StyledFormFooter>
                </StyledForm>
            </Modal >}

        </>
    );
};

export default HumanToolSelect;
