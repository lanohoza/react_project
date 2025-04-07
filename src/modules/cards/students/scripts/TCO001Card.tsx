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
import { TCO0001StudentCardDto } from '@core/types/models/script/TCO001Script';

interface Prop {
  source: any;
}

const TCO001Card = ({ source }: Prop) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const [data, setData] = useState<TCO0001StudentCardDto>(undefined);

  useEffect(() => {
    const datadto = source.find(
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
                    <th></th>
                    <th>الرغبة</th>
                    <th>معدل مجموعة التوجيه </th>
                    <th>الرتبة</th>
                  </tr>
                </thead>
                <tbody>
                  {data.guidanceSpecialityAverage?.map((sAverage) => (
                    <tr>

                      {sAverage.order && (<td>الرغبة رقم : {sAverage.order}</td>)}
                      {sAverage.order == null && (<td>#</td>)}
                      <td>{sAverage.title}</td>
                      <td>{sAverage.average.toFixed(2)}</td>
                      <td>{sAverage.rank}</td>
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
