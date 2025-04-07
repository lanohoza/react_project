'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Row, Select, G, Typography } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter } from 'next/navigation';
import { StyledProductDetails } from './index.styled';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import type { ProductDataType } from '@crema/types/models/ecommerce/EcommerceApp';
import AppsContainer from '@crema/components/AppsContainer';
import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { getAllScholerYears } from '@core/services/YearService';
import { GetClasseDto } from '@core/types/models/classe/ClasseTypes';
import { getAllClassesByYear } from '@core/services/ClasseService';
import { GetStudentDto } from '@core/types/models/student/StudentTypes';
import { getAllStudentByClasse } from '@core/services/StudentService';
import { getStudentCardData } from '@core/services/CardService';
import TCO001Card from './scripts/TCO001Card';
import TCE002Card from './scripts/TCE002Card';

const StudentCard = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const { Text } = Typography;

  const params = useParams();
  const Option = Select.Option;
  const [years, setYears] = useState<Year[]>([] as Year[]);
  const [classes, setClasses] = useState<GetClasseDto[]>([] as GetClasseDto[]);
  const [students, setStudents] = useState<GetStudentDto[]>([] as GetStudentDto[]);
  const [cardSource, setCardSource] = useState<[]>(undefined);
  const [idYear, setIdYear] = useState(-1);
  const [idStudent, setIdStudent] = useState(-1);
  const diagnostics = ["1111", "2222"]
  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
  }, []);
  useEffect(() => {
    loadLevelData();
  }, [idYear, idStudent]);

  const setSelectedIdYear = (idYear: any) => {
    setIdYear(idYear);
    getAllClassesByYear(idYear, infoViewActionsContext).then((classedtos) =>
      setClasses(classedtos),
    );
  }

  const onChangeClass = (idClasse: any) => {
    getAllStudentByClasse(idClasse, infoViewActionsContext).then((students) =>
      setStudents(students),
    );
  }

  const onChangeStudent = (idStudent: any) => {
    setIdStudent(idStudent);
  }
  const loadLevelData = () => {

    if (idStudent != -1 && idYear != -1) {
      getStudentCardData(idStudent, idYear, infoViewActionsContext).then((levelDataDto) => {
        setCardSource(levelDataDto);
      });
    }
  }

  return (
    <StyledProductDetails >
      <AppsContainer title='بطاقة متابعة تلميذ' fullView>

        <AppPageMeta title='بطاقة متابعة تلميذ' />
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppCard key='product_detail'>
            <Row justify="space-between" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)", padding: "20px 0", marginBottom: 20 }} >
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
                <div style={{ margin: " 0 5px", fontSize: 12, width: "150px" }}>
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
                  القسم:
                </div>
                <Select
                  style={{ width: '100%' }}
                  onChange={(id) => onChangeClass(id)}
                  showSearch
                  placeholder='القسم'
                >
                  {classes.map((classe: GetClasseDto) => {
                    return (
                      <Option value={classe.id} key={classe.id}>
                        {classe.title}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
                <div style={{ margin: " 0 5px", fontSize: 12 }}>
                  التلميذ:
                </div>
                <Select
                  style={{ width: '100%' }}
                  onChange={(id) => onChangeStudent(id)}
                  showSearch
                  placeholder='التلميذ'
                >
                  {students.map((student: GetStudentDto) => {
                    return (
                      <Option value={student.id} key={student.id}>
                        {student.firstName} {student.lastName}
                      </Option>
                    );
                  })}
                </Select>

              </Col>
              <Col span={5} style={{ margin: " 0 5px ", display: "flex", alignItems: "center" }}>
              </Col>
            </Row>
            {(cardSource != undefined || cardSource?.length == 0) && (
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
            {cardSource?.length > 0 && <TCE002Card source={cardSource}></TCE002Card>}
            {cardSource?.length > 0 && <TCO001Card source={cardSource}></TCO001Card>}
          
          </AppCard>
        </AppAnimate>
      </AppsContainer>

    </StyledProductDetails >
  );
};

export default StudentCard;

