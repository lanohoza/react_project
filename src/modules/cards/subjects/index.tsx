'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Row, Select } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter } from 'next/navigation';
import { StyledProductDetails } from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import type { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import AppsContainer from '@crema/components/AppsContainer';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getAllScholerYears } from '@core/services/YearService';
import { Subject } from '@core/types/models/subject/SubjectsTypes';
import { getAllByCurrentEstablishmentType } from '@core/services/SubjectService';
import { getSubjectCardData } from '@core/services/CardService';
import TCO001Card from './scripts/TCO001Card';
import TCE002Card from './scripts/TCE002Card';

const SubjectCard = () => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const params = useParams();
  const Option = Select.Option;
  const [years, setYears] = useState<Year[]>([] as Year[]);
  const [subjects, setSubjects] = useState<Subject[]>([] as Subject[]);
  const [idYear, setIdYear] = useState(-1);
  const [idSubject, setIdSubject] = useState(-1);
  const [cardSource, setCardSource] = useState<[]>(undefined);


  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
    getAllByCurrentEstablishmentType(infoViewActionsContext).then((subjectDtos) =>
      setSubjects(subjectDtos),
    );
  }, []);
  useEffect(() => {
    loadLevelData();
  }, [idYear, idSubject]);
  const setSelectedIdYear = (idYear: any) => {
    setIdYear(idYear);
  }

  const onChangeLevel = (idLevel: any) => {
    setIdSubject(idLevel);
  }
  const loadLevelData = () => {

    if (idSubject != -1 && idYear != -1) {
      getSubjectCardData(idSubject, idYear, infoViewActionsContext).then((levelDataDto) => {
        setCardSource(levelDataDto);
      });
    }
  }

  return (
    <StyledProductDetails >
      <AppsContainer title='بطاقة المادة ' fullView>

        <AppPageMeta title='بطاقة المادة ' />
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard key='product_detail'>
            <Row justify="space-between" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)", padding: "20px 0", marginBottom: 20 }} >
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
                <div style={{ margin: " 0 5px", fontSize: 12,width:"150px" }}>
                  الموسم الدراسي:
                </div>
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

              </Col>

              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
                <div style={{ margin: " 0 5px", fontSize: 12 }}>
                  المادة:
                </div>
                <Select
                  style={{ width: '100%' }}
                  onChange={(id) => onChangeLevel(id)}
                  showSearch
                  placeholder='المادة'
                >
                  {subjects.map((subject: Subject) => {
                    return (
                      <Option value={subject.id} key={subject.id}>
                        {subject.title}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              </Col>
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              </Col>
            </Row>
            {(cardSource == undefined || cardSource?.length == 0) && (
              <div
                style={{
                  border: ' 1px solid orange',
                  padding: ' 13px 0',
                  textAlign: 'center',
                  fontWeight: '700',
                  color: 'orange',
                }}
              >
                لا توجد اي بيانات لعرضها
              </div>
            )}
            {cardSource?.length>0 && <TCE002Card source={cardSource}></TCE002Card>}
            {cardSource?.length>0&&   <TCO001Card source={cardSource}></TCO001Card>}

          </AppCard>
        </AppAnimate>
      </AppsContainer>

    </StyledProductDetails >
  );
};

export default SubjectCard;

