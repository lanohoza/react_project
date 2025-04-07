// DynamicTreeSelect.tsx
import React, { useState } from 'react';
import { TreeSelect, Button, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ParentModel from './ParentModel';
import { StyledRow } from './index.styled';
import ConfirmationModal from '@crema/components/AppConfirmationModal';
import { DefaultOptionType } from 'antd/es/select';

export interface DataTreeItem {
    id: number;
    content: string;
    childItems: DataTreeItem[];

}

interface DynamicTreeSelectProp {
    itemsTitle: string;
    childItemsTitle: string;
    value: any;
    itemName: string;
    childItemName: string;
    dataTree: DataTreeItem[];
    disabled: boolean;
    OnSaveItem: (item: DataTreeItem) => Promise<void>;
    OnRemoveItem: (item: DataTreeItem) => void;
    onChange?: (value: number, option: DefaultOptionType | DefaultOptionType[]) => void

}

const { TreeNode } = TreeSelect;

const DynamicTreeSelect: React.FC<DynamicTreeSelectProp> = ({
    itemName,
    childItemName,
    dataTree,
    value,
    disabled,
    OnSaveItem,
    OnRemoveItem,
    onChange
}) => {
    const [selectItem, setSelectItem] = useState<DataTreeItem | null>(null);
    const [isParentModalVisible, setIsParentModalVisible] = useState(false);
    const [openDeleteModel, setOpenDeleteModel] = useState(false);
    const [itemDeleteModel, setItemDeleteModel] = useState<DataTreeItem | null>(null);


    const removeNode = (item: DataTreeItem) => {
        setItemDeleteModel(item);
        setOpenDeleteModel(true)
    };
    const OnRemoveNode = () => {
        OnRemoveItem(itemDeleteModel);
        setOpenDeleteModel(false);
    };

    // Function to render tree nodes dynamically with action buttons for parents only
    const renderTreeNodes = (dataTree: DataTreeItem[]) =>
        dataTree.map((item: DataTreeItem) => {
            const titleWithActions = (
                <StyledRow>
                    <Col span={20}>{item.content}</Col>
                    <Col>
                        <Button
                            size="small"
                            style={{ color: 'orange' }}
                            type="link"
                            icon={<EditOutlined />}
                            onClick={() => showParentModal(item)}
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
            );

            if (item.childItems) {
                return (
                    <TreeNode
                        value={item.id}
                        title={titleWithActions}
                        selectable
                    >
                        {renderTreeNodes(item.childItems)}
                    </TreeNode>
                );
            }
            return <TreeNode value={"child" + item.id} title={item.content} selectable={false} />;
        });

    // Function to show modal for editing a node
    const showParentModal = (node?: DataTreeItem) => {
        setSelectItem(node || null);
        setIsParentModalVisible(true);
    };

    return (
        <div>
            <Row>
                <Col span={21}>
                    <TreeSelect
                        multiple
                        style={{ width: '100%', marginBottom: '20px' }}
                        value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder={'أختر ' + itemName}
                        allowClear
                        disabled={disabled}
                        onChange={onChange}
                    >
                        {renderTreeNodes(dataTree)}
                    </TreeSelect>
                </Col>
                <Col span={3} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        disabled={disabled}
                        onClick={() => showParentModal(undefined)}
                        style={{ marginBottom: '20px' }}
                        icon={<PlusOutlined />}
                    />
                </Col>
            </Row>

            {/* Parent Modal */}
            {isParentModalVisible && <ParentModel
                OnSaveItem={OnSaveItem}
                childItemName={childItemName}
                isModalOpen={isParentModalVisible}
                onCloseModel={() => setIsParentModalVisible(false)}
                item={selectItem}
                itemName={itemName}
            />}
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

export default DynamicTreeSelect;
