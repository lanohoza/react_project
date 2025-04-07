'use client';
import React from 'react';
import { Collapse, CollapseProps, Divider, Tabs } from 'antd';
import AppPageMeta from '@crema/components/AppPageMeta/index';
import AppsContainer from '@crema/components/AppsContainer/index';
import TCO002StudentConditionsContent from './studentConditions';
import TCO002ClasseConditionsContent from './classeConditions';
import TCO002SubjectConditionsContent from './subjectConditions';
import TCO002LevelConditionsContent from './levelConditions';
import TCO002SpecialityConditionsContent from './specialityConditions';
import TCO002EstablishmentConditionsContent from './establishmentConditions';
import TCO002GuidanceSpecialityConfigsContent from './guidanceSpecialityConfig';

const tabsItems = [
  {
    key: '1',
    label: 'إعدادات شروط التشخيص الخاصة بالتلميذ',
    children: <TCO002StudentConditionsContent />,
  },
  {
    key: '2',
    label: 'إعدادات شروط التشخيص الخاصة بالقسم',
    children: <TCO002ClasseConditionsContent />,
  },
  {
    key: '3',
    label: 'إعدادات شروط التشخيص الخاصة المادة',
    children: <TCO002SubjectConditionsContent />,
  },
   {
    key: '4',
    label: 'إعدادات شروط التشخيص الخاصة المستوى',
    children: <TCO002LevelConditionsContent />,
  }, 
  {
    key: '5',
    label: 'إعدادات شروط التشخيص الخاصة التخصص',
    children: <TCO002SpecialityConditionsContent />,
  },
  {
    key: '6',
    label: 'إعدادات شروط التشخيص الخاصة المؤسسة',
    children: <TCO002EstablishmentConditionsContent />,
  },{
    key:"7",
    label: 'إعدادات حساب مجموعة التوجيه   ',
    children: <TCO002GuidanceSpecialityConfigsContent />,
  }
];

const ScriptSettings = () => {


  return (
    <AppsContainer title="إعدادات شروط التشخيص الخاصة ب TCO001" fullView>
      <AppPageMeta title="إعدادات شروط التشخيص الخاصة ب TCO001" />
      <Tabs
        tabPosition="right"
        defaultActiveKey="1"
        items={tabsItems}
      />
    </AppsContainer>
  );
};

export default ScriptSettings;
