'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Divider, List, Skeleton, Input, Checkbox, Col, Row, message, notification } from 'antd';
import InfinitScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { useYearProgramActionsContext, useYearProgramContext } from '../YearProgramContextProvider';
import { StyledForm, StyledFormBtn, StyledFormFooter, StyledFormHeader, StyledFormHeaderTitle, StyledModal } from '@core/styles/form/index.styled';
import TcCell from './TcCell';
import { TechnicalCard } from '../../../@core/types/models/technicalCards/TechnicalCardTypes';
import { getNotImplementedTechnicalCard, implementTechnicalCards, } from '@core/services/YearPragramService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import ConfirmationModal from '@crema/components/AppConfirmationModal';

const ConfigurationModal = () => {
    const InfoViewActions = useInfoViewActionsContext();
    const { onCloseConfigurationModel, reload } = useYearProgramActionsContext();
    const { openConfigurationModel } = useYearProgramContext();
    const [technicalCards, setTechnicalCards] = useState<TechnicalCard[]>([]);
    const [laoded, setLaoded] = useState<boolean>(false);
    const [openConfirmModel, setOpenConfirmModel] = useState<boolean>(false);

    const [seletedTechnicalCards, setSeletedTechnicalCards] = useState<TechnicalCard[]>([]);

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6;
    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getNotImplementedTechnicalCard(searchText, page, pageSize, InfoViewActions).then((pageTc) => {
            setTechnicalCards([...technicalCards, ...pageTc.content]);
            setTotalPages((pageTc.totalPages));
        })

    }, []);

    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getNotImplementedTechnicalCard(searchText, page, pageSize, InfoViewActions).then((pageTc) => {
            setTechnicalCards(pageTc.content);
            setTotalPages((pageTc.totalPages));

        })

    }, [searchText]);

    useEffect(() => {
        if (!laoded)
            setLaoded(true);
        getNotImplementedTechnicalCard(searchText, page, pageSize, InfoViewActions).then((pageTc) => {
            setTechnicalCards([...technicalCards, ...pageTc.content]);
            setTotalPages((pageTc.totalPages));
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
    const onSelectedHandel = (technicalCard) => {
        const seletedTc = seletedTechnicalCards.find((tc) => technicalCard.id == tc.id);
        if (seletedTc)
            setSeletedTechnicalCards(seletedTechnicalCards.filter((tc) => technicalCard.id !== tc.id));
        else
            setSeletedTechnicalCards([...seletedTechnicalCards, technicalCard])

    }
    const onFinishHandel = () => {
        if (seletedTechnicalCards.length > 0)
            setOpenConfirmModel(true);
        else
            notification.warning({ message: "الرجاء إختر بطاقة تقنية مسبقا" });
    }
    const onSubmmet = () => {
        implementTechnicalCards(seletedTechnicalCards.map(tc => tc.id), InfoViewActions).then(() => {
            InfoViewActions.showMessage("تم الحفظ بنجاح")
            reload();
            onCloseConfigurationModel();
        })
    }
    return (
        <>
            <StyledModal
                footer={false}
                open={openConfigurationModel}
                onCancel={() => { onCloseConfigurationModel(); }}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
                width={"60%"}
            >
                <StyledForm labelCol={{ span: 6 }} onFinish={onFinishHandel}>
                    <StyledFormHeader>
                        <StyledFormHeaderTitle>
                            إعداد البرنامج الدراسي للموسم الدراسي الحالي
                        </StyledFormHeaderTitle>
                    </StyledFormHeader>
                    <Row style={{ marginTop: 20 }}>
                        <Col span={12}>
                            <h4 style={{ fontWeight: 700 }}>قائمة البطاقات التقنية</h4>
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
                            dataLength={technicalCards.length}
                            next={loadNewPage}
                            hasMore={page < (totalPages - 1)}
                            height={400}
                            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget='scrollableDiv'
                        >
                            <List
                                dataSource={technicalCards}
                                renderItem={(technicalCard, index) => <TcCell onSelected={onSelectedHandel} key={index} technicalCard={technicalCard} />}

                            />
                        </InfinitScroll>
                    </div>

                    <StyledFormFooter>
                        <StyledFormBtn type='primary' onClick={() => { onCloseConfigurationModel(); }} ghost>
                            إلغاء
                        </StyledFormBtn>
                        <StyledFormBtn type='primary' htmlType='submit'>
                            إضافة للبرنامج السنوي
                        </StyledFormBtn>
                    </StyledFormFooter>
                </StyledForm>
            </StyledModal>
            {openConfirmModel && (
                <ConfirmationModal
                    open={openConfirmModel}
                    onDeny={() => setOpenConfirmModel(false)}
                    onConfirm={() => onSubmmet()}
                    modalTitle={'إضافة للبرنامج الدراسي'}
                    paragraph={'هل أنت متأكد من عملية إضافة للبرنامج الدراسي ؟'}
                />
            )}
        </>
    );
};

export default ConfigurationModal;
