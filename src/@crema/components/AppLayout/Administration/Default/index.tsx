import React, { useEffect, useState } from 'react';
import { Grid } from 'antd';
import AppSidebar from './AppSidebar';
import AppContentView from '../../../AppContentView';
import clsx from 'clsx';
import { FooterType } from '@crema/constants/AppEnums';
import { isEmpty } from '@crema/helpers/Common';
import { useLayoutContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import {
  StyledAppLayout,
  StyledAppLayoutMain,
  StyledMainScrollbar,
} from './index.styled';
import { RouterConfigData } from '@crema/types/models/Apps';
import AppFooter from '../../components/AppFooter';
import AppHeaderAdmin from './AppHeaderAdmin';

const { useBreakpoint } = Grid;

type Props = {
  children: React.ReactNode;
  routesConfig?: RouterConfigData[];
};
const DefaultLayout:React.FC<Props> = ({ children, routesConfig }) => {
  const width = useBreakpoint();
  const [isCollapsed, setCollapsed] = useState(false);
  const { footer, footerType } = useLayoutContext();

  const onToggleSidebar = () => {
    setCollapsed(!isCollapsed);
  };

  useEffect(() => {
    if (!isEmpty(width)) {
      if (width.xl) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  }, [width]);

  return (
    <StyledAppLayout
      className={clsx({
        appMainFooter: footer && footerType === FooterType.FLUID,
        appMainFixedFooter: footer && footerType === FooterType.FIXED,
      })}
    >
      <AppSidebar isCollapsed={isCollapsed} routesConfig={routesConfig} />
      <StyledAppLayoutMain className='app-layout-main'>
        <AppHeaderAdmin
          isCollapsed={isCollapsed}
          onToggleSidebar={onToggleSidebar}
        />
        <StyledMainScrollbar>
          <AppContentView>{children}</AppContentView>
          <AppFooter />
        </StyledMainScrollbar>
      </StyledAppLayoutMain>
    </StyledAppLayout>
  );
};
//      <AppThemeSetting />

export default React.memo(DefaultLayout);
