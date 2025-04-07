// DynamicTreeSelect.tsx
import React, { useState } from 'react';
import { Button, Row, Col, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { StyledRow } from './index.styled';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { DefaultOptionType } from 'antd/es/select';


interface DynamicTreeSelectProp {
    itemsTitle: string;
    childItemsTitle: string;
    itemName: string;
    childItemName: string;
    items: any[];
    value: any,
    disabled: boolean;
    OnEditItem: (item: any) => void;
    OnRemoveItem: (item: any) => void;
    onGetKey: (onGetKey: any) => string;
    onGetConent: (onGetKey: any) => string;
    onChange?: (value: number, option: DefaultOptionType | DefaultOptionType[]) => void
}


const DynamicSelect: React.FC<DynamicTreeSelectProp> = ({
    itemName,
    items,
    value,
    disabled,
    OnRemoveItem,
    OnEditItem,
    onGetConent,
    onGetKey,
    onChange
}) => {
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [itemDeleteModel, setItemDeleteModel] = useState<any | null>(null);
    const { Option } = Select

    // Handle selection change

    const removeNode = (item: any) => {
        setItemDeleteModel(item);
        setOpenDeleteModel(true)
    };
    const OnRemoveNode = () => {
        OnRemoveItem(itemDeleteModel);
        setOpenDeleteModel(false);
    };
    // Function to render tree nodes dynamically with action buttons for parents only
    const renderOptions = (items: any[]) =>
        items?.map((item: any) =>
            <Option key={onGetKey(item)} text={onGetConent(item)} value={onGetKey(item)}>
                <StyledRow>
                    <Col span={20}>{onGetConent(item)}</Col>
                    <Col>
                        <Button
                            size="small"
                            style={{ color: 'orange' }}
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => OnEditItem(item)}
                        />
                        <Button
                            size="small"
                            type="link"
                            style={{ color: 'red' }}
                            icon={<DeleteOutlined />}
                            onClick={() => removeNode(item)}
                        />
                    </Col>
                </StyledRow>
            </Option>
        );


    // Function to show modal for editing a node


    return (
        <div>

            <Select
                style={{ width: '100%', marginBottom: '20px' }}
                value={value}
                filterOption={(input, option) => ((option?.text ?? '') as any).toLowerCase().includes(input.toLowerCase())}
                mode='multiple'
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder={'أختر ' + itemName}
                allowClear
                showSearch
                disabled={disabled}
                onChange={onChange}
            >
                {items && renderOptions(items)}
            </Select>


            {/* Parent Modal */}
            {openDeleteModel && (
                <ConfirmationModal
                    open={openDeleteModel}
                    onDeny={() => setOpenDeleteModel(false)}
                    onConfirm={() => OnRemoveNode()}
                    modalTitle={'حذف عنصر '}
                    paragraph={'هل أنت متأكد من عملية الحذف ؟'}
                />
            )}
        </div>
    );
};

export default DynamicSelect;
