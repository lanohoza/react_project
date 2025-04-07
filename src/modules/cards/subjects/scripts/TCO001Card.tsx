'use client';
import React, { useEffect, useState } from 'react';
import AppCard from '@crema/components/AppCard';
import AppInfoView from '@crema/components/AppInfoView';
import AppAnimate from '@crema/components/AppAnimate';
import AppRowContainer from '@crema/components/AppRowContainer';
import { Col, Row, Select } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta';
import { useParams, useRouter } from 'next/navigation';
import { StyledProductDetails } from '../index.styled';
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
import { convertValueToFixed } from '@core/hooks/UrlHooks';
import { TCO0001SubjectCardDto } from '@core/types/models/script/TCO001Script';

interface Prop {
  source: any;
}

const TCO001Card = ({ source }: Prop) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const [data, setData] = useState<TCO0001SubjectCardDto>(undefined);

  useEffect(() => {
    const datadto = source?.find(
      (card: any) => card.code == getScriptCardName(),
    );
    setData(datadto?.data);
  }, [source]);
  const getScriptCardName = () => {
    return import.meta.url
      .split('/')
    [import.meta.url.split('/').length - 1].replace('Card.tsx', '');
  };
  return (
    <>
      {data && (
        <div>
          <Row style={{ marginBottom: 20 }}>
            <h3
              style={{
                color: 'rgb(17, 24, 39)',
                fontWeight: '600',
                fontSize: ' 16px',
                marginBottom: '4px',
              }}
            >
              3- النتائج العامة للتوجيه التدريجي :
            </h3>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={24}>
              <table width={'100%'} border={1} style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th rowSpan={3}>الرغبة</th>
                    <th rowSpan={3}>معدل مجموعة التوجيه </th>
                    <th rowSpan={3}>معدل المادة </th>
                    <th colSpan={8}>النتائج في الرغبة</th>
                  </tr>
                  <tr>
                    <th colSpan={2}>أقل من 10</th>
                    <th colSpan={2}>أكبر من 10</th>
                    <th colSpan={2}>من 10 إلى 14</th>
                    <th colSpan={2}>أكبر من 14</th>
                  </tr>
                  <tr>
                    <th>عدد</th>
                    <th>نسبة %</th>
                    <th>عدد</th>
                    <th>نسبة %</th>
                    <th>عدد</th>
                    <th>نسبة %</th>
                    <th>عدد</th>
                    <th>نسبة %</th>
                  </tr>
                </thead>
                <tbody>
                  {data.guidanceSpecialityAverage.map((sAverage) => (
                    <tr>
                      <td>{sAverage.specialityTitle}</td>
                      <td>{sAverage.average.toFixed(2)}</td>
                      <td>{sAverage.subjectAverage.toFixed(2)}</td>
                      <td>{sAverage.countLess10}</td>
                      <td>{sAverage.percentageLess10.toFixed(0)}</td>
                      <td>{sAverage.countGreater10}</td>
                      <td>{sAverage.percentageGreater10.toFixed(0)}</td>
                      <td>{sAverage.count10_14}</td>
                      <td>{sAverage.percentage10_14.toFixed(0)}</td>
                      <td>{sAverage.countGreater14}</td>
                      <td>{sAverage.percentageGreater14.toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Col>
          </Row>
          <Row style={{ marginBottom: 20 }}>
            <Col span={24}>التوجيهات الإرشادية المقترحة :	</Col>
            <Col span={24}>
              {data?.diagnostics.map((diagnostic) => (
                <div style={{ margin: "5px", marginRight: "170px" }}>- {diagnostic}</div>
              ))}

            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default TCO001Card;
