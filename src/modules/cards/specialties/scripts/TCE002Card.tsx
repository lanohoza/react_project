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

interface Prop {
  source: any
}

const TCES002Card = ({ source }: Prop) => {
  const infoViewActionsContext = useInfoViewActionsContext();


  const [headers, setHeaders] = useState<[]>([]);
  const categories = [
    'المعدل',
    '18.01 - 20',
    '16.01 - 18',
    '14.01 - 16',
    '12.01 - 14',
    '10.01 - 12',
    '≤ 10',
  ];

  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    const datadto = source.find((card: any) => card.code == getScriptCardName());
    setData(datadto);
    setHeaders(datadto.data.subjectAverageCategories.map((subject) => subject.subjectTitle) as []);
  }, [source]);
  const getScriptCardName = () => {
    return import.meta.url.split("/")[import.meta.url.split("/").length - 1].replace("Card.tsx", "")
  }


  function groupDataByCategories(data: any[]): Record<string, number[]> {
    const groupedData: Record<string, number[]> = {};
    categories.forEach((category) => {
      groupedData[category] = data.map((subject) => {
        switch (category) {
          case '18.01 - 20':
            return subject.category_18_20;
          case '16.01 - 18':
            return subject.category_16_18;
          case '14.01 - 16':
            return subject.category_14_16;
          case '12.01 - 14':
            return subject.category_12_14;
          case '10.01 - 12':
            return subject.category_10_12;
          case '≤ 10':
            return subject.category_less_10;
          case 'المعدل':
            return subject.subjectAverage;
          default:
            return 0;
        }
      });
    });
    return groupedData;
  }
  return (
    <>
      {data && <div>
        <Row style={{ marginBottom: 20 }}>
          <h3 style={{
            color: "rgb(17, 24, 39)",
            fontWeight: "600",
            fontSize: " 16px",
            marginBottom: "4px"
          }}>
            1- نتائج التلميذ في  الماضي الدراسي  :


          </h3>

        </Row>
        <Row style={{ marginBottom: 20 }}>

          <h5 style={{
            color: "rgb(17, 24, 39)",
            fontWeight: "600",
            fontSize: " 14px",
            marginBottom: "4px"
          }}>
            1-1-  نتائج المواد في الماضي الدراسي المكتسبات القبلية   :


          </h5>
        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={24}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ fontSize: "12px", padding: "5px", textAlign: "center", border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>المادة الدراسية</th>

                  {headers.map((item: any, index) => (
                    <th key={index} style={{ fontSize: "12px", textAlign: "center", padding: "5px", border: "1px solid #ddd" }} >{item}</th>
                  ))}

                </tr>
              </thead>
              <tbody>
                {categories.map((category, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{ fontSize: "12px", textAlign: "center", padding: "5px", border: "1px solid #ddd" }} >{category}</td>
                    {data.data && data.data.subjectAverageCategories.map((subject, cellIndex) => (


                      <td style={{ fontSize: "12px", textAlign: "center", padding: "5px", border: "1px solid #ddd" }} key={cellIndex}>{convertValueToFixed(groupDataByCategories(data.data.subjectAverageCategories)[category][cellIndex])}</td>
                    ))}
                  </tr>
                ))}

              </tbody>
            </table>
          </Col>

        </Row>
        <Row style={{ marginBottom: 20 }}>
          <Col span={24}>التوجيهات الإرشادية المقترحة :	</Col>
          <Col span={24}>
            {data?.data?.diagnostics.map((diagnostic) => (
              <div style={{ margin: "5px", marginRight: "170px" }}>- {diagnostic}</div>
            ))}

          </Col>
        </Row>
      </div>
      }
    </>
  )
};

export default TCES002Card;

