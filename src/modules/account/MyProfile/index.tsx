'use client';
import React from 'react';

import { HiUser } from 'react-icons/hi';
import { AiFillLock } from 'react-icons/ai';
import { FaBandcamp, FaNetworkWired } from 'react-icons/fa';
import { IoMdNotifications } from 'react-icons/io';
import IntlMessages from '@crema/helpers/IntlMessages';
import {
  StyledUserProfileContainer,
  StyledUserProfileTabs,
} from './index.styled';
import { ChangePassword, Information, PersonalInfo, SocialLink } from '../../profile/UserProfile/index';
import { accountData } from '@crema/fakedb/index';
import AppAnimate from '@crema/components/AppAnimate/index';


const items = [
  {
    label: (
      <span className='user-profile-icon'>
        <HiUser className='icon' />
        <span>
          <IntlMessages id='userProfile.personalInfo' />
        </span>
      </span>
    ),
    key: '01',
    children: '',
  }, // remember to pass the key prop
  {
    label: (
      <span className='user-profile-icon'>
        <AiFillLock className='icon' />
        <span>
          <IntlMessages id='userProfile.changePassword' />
        </span>
      </span>
    ),
    key: '02',
    children: <ChangePassword />,
  },
  {
    label: (
      <span className='user-profile-icon'>
        <FaBandcamp className='icon' />
        <span>
          <IntlMessages id='userProfile.information' />
        </span>
      </span>
    ),
    key: '03',
    children: '',
  },
  {
    label: (
      <span className='user-profile-icon'>
        <FaNetworkWired className='icon' />
        <span>
          <IntlMessages id='userProfile.social' />
        </span>
      </span>
    ),
    key: '04',
    children: '',
  },
  {
    label: (
      <span className='user-profile-icon'>
        <IoMdNotifications className='icon' />
        <span>
          <IntlMessages id='userProfile.notification' />
        </span>
      </span>
    ),
    key: '05',
    children: '',
  },
];

const UserProfile = () => {
  return (
    <StyledUserProfileContainer>
      <AppAnimate animation='transition.slideUpIn' delay={200}>
        <StyledUserProfileTabs
          key='1'
          defaultActiveKey='01'
          tabPosition='left'
          items={items}
        />
      </AppAnimate>
    </StyledUserProfileContainer>
  );
};

export default UserProfile;
