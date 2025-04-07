

'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, List, Modal, Row } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTreeItem } from '.';
import { StyledRow } from './index.styled';



interface ParentModelProp {
    item: DataTreeItem;
    isModalOpen: boolean;
    itemName: string;
    childItemName: string;
    onCloseModel: () => void
    OnSaveItem: (item: DataTreeItem) => Promise<void>
}
const ParentModel = ({ item, itemName, childItemName, isModalOpen, onCloseModel, OnSaveItem }: ParentModelProp) => {
    const [modalTitle, setModalTitle] = useState('');
    const [isChildModalVisible, setIsChildModalVisible] = useState(false);
    const [selectChildItem, setSelectChildItem] = useState<DataTreeItem>(null);
    const [childModalTitle, setChildModalTitle] = useState("");
    const [newChildItemContent, setNewChildItemContent] = useState(null);
    const [newItemContent, setNewItemContent] = useState(null);
    const [childItems, setChildItems] = useState<DataTreeItem[]>([]);
    useEffect(() => {
        if (item) {
            setNewItemContent(item.content);
            setChildItems(item.childItems);
            setModalTitle(' تعديل  ' + itemName);
        } else {
            setModalTitle(' إضافة ' + itemName);
        }
    }, [])
    const showChildModal = (child = null) => {
        if (child) {
            setChildModalTitle(' تعديل  ' + childItemName);
            setIsChildModalVisible(true);
            setNewChildItemContent(child.content)
            setSelectChildItem(child);
        } else {
            setChildModalTitle(' إضافة ' + childItemName);
            setSelectChildItem(null);
            setNewChildItemContent(null);
            setIsChildModalVisible(true)
        }
    };

    const onSaveParentItemn = () => {
        OnSaveItem({ ...item, childItems: childItems, content: newItemContent }).then(()=>{
            onCloseModel();
        });
    };

    const removeChildItem = (child) => {
        setChildItems(childItems.filter((item) => item.content !== child.content));
    };
    const addChildItem = () => {
        if (newChildItemContent) {
            if (selectChildItem) {
                const updatedChildren = childItems.map((child) =>
                    child.content === selectChildItem.content ? { ...child, content: newChildItemContent } : child
                );
                setChildItems(updatedChildren);
            } else {

                if (childItems)
                    childItems.push({ content: newChildItemContent } as DataTreeItem);
                else
                    setChildItems([{ content: newChildItemContent } as DataTreeItem]);
            }
        }
        setIsChildModalVisible(false);

    };
    return (
        <>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={() => onSaveParentItemn()}
                onCancel={onCloseModel}
            >
                <Input
                    placeholder={itemName}
                    value={newItemContent}
                    onChange={(e) => setNewItemContent(e.target.value)}
                    style={{ marginBottom: '10px' }}
                />
                <div style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                        onClick={() => showChildModal()}
                        icon={<PlusOutlined />}
                        style={{ marginTop: '10px', color: "#0a8fdc", border: "1px solid #0a8fdc" }}
                    >
                    إضافة  {childItemName}  
                    </Button>
                </div>

                <List
                    size="small"
                    bordered
                    dataSource={childItems}
                    renderItem={(child) => (
                        <StyledRow style={{ padding: "10px 20px" }}>
                            <Col span={20}>
                                {child.content}
                            </Col>
                            <Col span={4}>
                                <Button
                                    type="link"
                                    size='small'
                                    style={{ color: 'orange' }}
                                    icon={<EditOutlined />}
                                    onClick={() => showChildModal(child)}
                                />
                                <Button
                                    type="link"
                                    size='small'
                                    style={{ color: 'red' }}
                                    icon={<DeleteOutlined />}
                                    onClick={() => removeChildItem(child)}
                                /></Col>

                        </StyledRow>
                    )}
                    style={{ marginTop: '10px' }}
                />


            </Modal>
            {isChildModalVisible && <Modal
                title={childModalTitle}
                open={isChildModalVisible}
                onOk={() => addChildItem()}
                onCancel={() => setIsChildModalVisible(false)}
            >
                <Input
                    placeholder={childItemName}
                    value={newChildItemContent}
                    onChange={(e) => setNewChildItemContent(e.target.value)}
                />
            </Modal>}
        </>
    );
};

export default ParentModel;
