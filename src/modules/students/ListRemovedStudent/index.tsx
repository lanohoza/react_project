'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Divider, List, Skeleton, Input, Checkbox, Col, Row, message, notification } from 'antd';
import InfinitScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { StyledForm, StyledFormBtn, StyledFormFooter, StyledFormHeader, StyledFormHeaderTitle, StyledModal } from '@core/styles/form/index.styled';
import TcCell from './StudentCell';
import { TechnicalCard } from '../../../@core/types/models/technicalCards/TechnicalCardTypes';
import { getNotImplementedTechnicalCard, implementTechnicalCards, } from '@core/services/YearPragramService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getRemovedStudent, removeStudent } from '../../../@core/services/StudentService';
import { useStudentActionsContext, useStudentContext } from '../StudentContextProvider';
import { Student } from '@core/types/models/student/StudentTypes';
import StudentCell from './StudentCell';

const RemoveStudentListModal = () => {
    const InfoViewActions = useInfoViewActionsContext();
    const { onOpenRemovedStudenModel, reload } = useStudentActionsContext();
    const { openRemovedStudentModel } = useStudentContext();
    const [removeStudents, setRemoveStudents] = useState<Student[]>([]);
    const [laoded, setLaoded] = useState<boolean>(false);

    const [seletedTechnicalCards, setSeletedTechnicalCards] = useState<TechnicalCard[]>([]);

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6;
    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getRemovedStudent(searchText, page, pageSize, InfoViewActions).then((removeStudentdtos) => {
            setRemoveStudents(removeStudentdtos.content);
            setTotalPages((removeStudentdtos.totalPages));
        })

    }, []);

    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getRemovedStudent(searchText, page, pageSize, InfoViewActions).then((removeStudentdtos) => {
            setRemoveStudents(removeStudentdtos.content);
            setTotalPages((removeStudentdtos.totalPages));
        })

    }, [searchText]);

    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getRemovedStudent(searchText, page, pageSize, InfoViewActions).then((removeStudentdtos) => {
            setRemoveStudents([...removeStudents, ...removeStudentdtos.content]);
            setTotalPages((removeStudentdtos.totalPages));
        })

    }, [page]);
    const loadNewPage = () => {
        setLaoded(false);
        setPage(page + 1);
    };

    const handleSearch = (e) => {
        setLaoded(false);
        setPage(0);
        setSearchText(e.target.value);
    };

    const realod = () => {

        if (!laoded)
            setLaoded(true);
        getRemovedStudent(searchText, page, pageSize, InfoViewActions).then((removeStudentdtos) => {
            setRemoveStudents(removeStudentdtos.content);
            setTotalPages((removeStudentdtos.totalPages));
        })

    }



    return (
        <>
            <StyledModal
                footer={false}
                open={openRemovedStudentModel}
                onCancel={() => { onOpenRemovedStudenModel(false); }}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={"60%"}
            >
                <StyledForm labelCol={{ span: 6 }} >
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            قوائم التلاميذ المشطوبين هذا الموسم الحالي
                        </StyledFormHeaderTitle>
                    </StyledFormHeader>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={12}>
                            <h4 style={{ fontWeight: 700 }}>قوائم التلاميذ   </h4>
                        </Col>
                        <Col span={12}>
                            <Input
                                type='search'
                                placeholder="إبحث ....."
                                value={searchText}
                                onChange={handleSearch}
                                style={{ marginBottom: 5 }}
                            /></Col>
                    </Row>
                    <div
                        id='scrollableDiv'
                        style={{
                            height: 400,
                            padding: '0 0',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfinitScroll
                            dataLength={removeStudents.length}
                            next={loadNewPage}
                            hasMore={page < (totalPages - 1)}
                            height={400}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>هذا كل شيء، لا أكثر 🤐</Divider>}
                            scrollableTarget='scrollableDiv'
                        >
                            <List
                                dataSource={removeStudents}
                                renderItem={(student, index) => <StudentCell realod={realod} key={index} student={student} index={index} />}

                            />
                        </InfinitScroll>
                    </div>

                    <StyledFormFooter>
                        <StyledFormBtn type='primary' onClick={() => { onOpenRemovedStudenModel(false); }} ghost>
                            إلغاء
                        </StyledFormBtn>

                    </StyledFormFooter>
                </StyledForm>
            </StyledModal>

        </>
    );
};

export default RemoveStudentListModal;
