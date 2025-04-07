import React from 'react';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import { StyledAppLogo } from './index.styled';
import Image from 'next/image';
import { environment } from '../../../../../envirenement/environnement';

type AppLogoProps = {
  hasSidebarColor?: boolean;
};
const AppLogo: React.FC<AppLogoProps> = ({ hasSidebarColor }) => {
  const { sidebarColorSet } = useSidebarContext();
  return (
    <StyledAppLogo>
      {hasSidebarColor && sidebarColorSet.mode === 'dark' ? (
        <img
          src={`${environment.BASE_PATH ?? ''}/images/logo-image.png`}
          alt='crema-logo'
          width='173'
          height='36'
        />
      ) : (
        <img
          src={`${environment.BASE_PATH ?? ''}/images/logo-image.png`}
          alt='crema-logo'
          width='173'
          height='36'
        />
      )}
    </StyledAppLogo>
  );
};

export default AppLogo;
