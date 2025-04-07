'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, Row, Select } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { useClasseActionsContext, useClasseContext } from '../ClassContextProvider';
import { Year } from '@core/types/models/year/YearTypes';
import { StyledSidebarContent, StyledSidebarTitle, StyledSidebarItemContent } from '../../notes/Sidebar/index.styled';


const SideBar = ({ }) => {
    const { onCreate, setSelectedIdYear } = useClasseActionsContext();
    const { years } = useClasseContext();
    const { Option } = Select;
    return (
        <>
            <StyledContactSidebarHeader>
                <Button
                    ghost
                    onClick={() => { onCreate() }}
                    type='primary'
                    icon={<PlusOutlined style={{ marginRight: 8 }} />}
                >
                    فسم جديد
                </Button>

                <StyledSidebarContent>

                    <StyledSidebarTitle>الموسم الدراسي</StyledSidebarTitle>
                    <StyledSidebarItemContent>
                        <Select
                            style={{ width: '100%' }}
                            showSearch
                            placeholder='الموسم الدراسي'
                            onChange={(id) => setSelectedIdYear(id)}
                        >
                            {years?.map((year: Year) => {
                                return (
                                    <Option value={year.id} key={year.id}>
                                        {year.title}
                                    </Option>
                                );
                            })}
                        </Select>
                    </StyledSidebarItemContent>
                </StyledSidebarContent>

            </StyledContactSidebarHeader>



        </>
    );
};

export default SideBar;


