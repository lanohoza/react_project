'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Modal, Row, Select } from 'antd';

import { StyledContactSidebarHeader } from '../Listing/index.styled';
import { Year } from '@core/types/models/year/YearTypes';
import { StyledSidebarContent, StyledSidebarTitle, StyledSidebarItemContent } from '../../notes/Sidebar/index.styled';
import { useTrimestreActionsContext, useTrimestreContext } from '../TrimestreContextProvider';


const SideBar = ({ }) => {
    const { setSelectedIdYear } = useTrimestreActionsContext();
    const { years } = useTrimestreContext();
    const { Option } = Select;
    return (
        <>
            <StyledContactSidebarHeader>

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


