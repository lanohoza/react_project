'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Row, Select, Table } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import AppsContainer from '@crema/components/AppsContainer';
import { StyledProductDetails } from './index.styled';
import { useIntl } from 'react-intl';
import { getAllScholerYears } from '@core/services/YearService';
import { getAllClassesByYear } from '@core/services/ClasseService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Year } from '@core/types/models/year/YearTypes';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { getClasseCardData } from '@core/services/CardService';
import TCO001Card from './scripts/TCO001Card';
import TCE002Card from './scripts/TCE002Card';


const ClasseCard = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const Option = Select.Option;
  const { messages } = useIntl();

  // State variables
  const [years, setYears] = useState<Year[]>([]);
  const [classes, setClasses] = useState<GetClasseDto[]>([]);
  const [cardSource, setCardSource] = useState<any>(undefined);
  const [idYear, setIdYear] = useState(-1);
  const [idClasse, setIdClasse] = useState(-1);
  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
  }, []);

  useEffect(() => {
    loadLevelData();
  }, [idYear, idClasse]);
  const setSelectedIdYear = (idYear: any) => {
    setIdYear(idYear);
    getAllClassesByYear(idYear, infoViewActionsContext).then((classedtos) =>
      setClasses(classedtos),
    );
  };

  // Fetch class card data when a class is selected
  const onChangeClass = (idClasse: any) => {
    setIdClasse(idClasse);
  };
  const loadLevelData = () => {

    if (idClasse != -1 && idYear != -1) {
      getClasseCardData(idClasse, idYear, infoViewActionsContext).then((levelDataDto) => {
        setCardSource(levelDataDto);
      });
    }
  }


  return (
    <StyledProductDetails>
      <AppsContainer title="بطاقة متابعة قسم" fullView>
        <AppPageMeta title="بطاقة متابعة قسم" />
        <AppAnimate animation="transition.slideUpIn" delay={200}>
          <AppCard key="product_detail">
            {/* Academic Year Selector */}
            <Row justify="space-between" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', padding: '20px 0', marginBottom: 20 }}>
              <Col span={5} style={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}>
                <div style={{ margin: '0 5px', fontSize: 12 ,width:"150px"  }}>الموسم الدراسي:</div>
                <Select
                  style={{ width: '100%' }}
                  showSearch
                  placeholder="الموسم الدراسي"
                  onChange={(id) => setSelectedIdYear(id)}
                >
                  {years?.map((year: Year) => (
                    <Option value={year.id} key={year.id}>
                      {year.title}
                    </Option>
                  ))}
                </Select>
              </Col>
              {/* Class Selector */}
              <Col span={5} style={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}>
                <div style={{ margin: '0 5px', fontSize: 12 }}>القسم:</div>
                <Select
                  style={{ width: '100%' }}
                  onChange={(id) => onChangeClass(id)}
                  showSearch
                  placeholder="القسم"
                >
                  {classes.map((classe: GetClasseDto) => (
                    <Option value={classe.id} key={classe.id}>
                      {classe.title}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col span={5} style={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}></Col>
              <Col span={5} style={{ margin: '0 5px', display: 'flex', alignItems: 'center' }}></Col>

            </Row>


            {(cardSource == undefined && cardSource?.length == 0) && (
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
    </StyledProductDetails>
  );
};

export default ClasseCard;