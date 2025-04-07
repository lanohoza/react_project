import React from 'react';
import PropTypes from 'prop-types';
import AppAnimateGroup from '@crema/components/AppAnimateGroup';
import AppInfoView from '@crema/components/AppInfoView';
import {
  StyledAuthCard,
  StyledAuthCardHeader,
  StyledAuthMainContent,
  StyledAuthWelContent,
  StyledAuthWellAction,
  StyledAuthWrap,
} from './AuthWrapper.styled';
import AppLogo from '../../@crema/components/AppLayout/components/AppLogo';
import Image from 'next/image';
import { environment } from '../../envirenement/environnement';

export default function AuthLayout({ children }: any) {
  return (
    <AppAnimateGroup
      type='scale'
      animateStyle={{
        flex: 1,
      }}
      delay={0}
      interval={10}
      duration={200}
    >
      <StyledAuthWrap key={'wrap'}>
        <StyledAuthCard>
          <StyledAuthMainContent>
            <StyledAuthCardHeader>
              <img
                src={`${environment.BASE_PATH ?? ''}/images/logo-name.png`}
                alt='crema-logo'
                width="173"
                height="36"
              />
            </StyledAuthCardHeader>
            {children}
          </StyledAuthMainContent>
          <StyledAuthWellAction>
            <StyledAuthWelContent>

              <img
                src={`${environment.BASE_PATH ?? ''}/images/logo-oriachad.png`}
                alt='crema-logo'
          
              />
            </StyledAuthWelContent>
          </StyledAuthWellAction>
        </StyledAuthCard>
      </StyledAuthWrap>

    </AppAnimateGroup>
  );
}
AuthLayout.propTypes = {
  children: PropTypes.node,
};
