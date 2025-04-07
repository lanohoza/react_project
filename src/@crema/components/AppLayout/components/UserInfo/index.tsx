import React from 'react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useThemeContext } from '@crema/context/AppContextProvider/ThemeContextProvider';
import { useAuthMethod, useAuthUser } from '@crema/hooks/AuthHooks';
import { useSidebarContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  StyledCrUserDesignation,
  StyledCrUserInfo,
  StyledCrUserInfoAvatar,
  StyledCrUserInfoContent,
  StyledCrUserInfoInner,
  StyledUserArrow,
  StyledUsername,
  StyledUsernameInfo,
} from './index.styled';

type UserInfoProps = {
  hasColor?: boolean;
};

const UserInfo: React.FC<UserInfoProps> = ({ hasColor }) => {
  const { themeMode } = useThemeContext();
  const { logout } = useAuthMethod();
  const { user , admin} = useAuthUser();
  const router = useRouter();
  const { sidebarColorSet } = useSidebarContext();
  const { allowSidebarBgImage } = useSidebarContext();

  const getUserAvatar = () => {
    if (user.displayName) {
      return user.displayName.charAt(0).toUpperCase();
    }
    if (user.email) {
      return user.email.charAt(0).toUpperCase();
    }
  };

  const getAdminAvatar = () => {
    if (admin.displayName) {
      return admin.displayName.charAt(0).toUpperCase();
    }
    if (admin.email) {
      return admin.email.charAt(0).toUpperCase();
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('email');
    logout();
    router.push('/signin');
  };

  const items = [
    {
      key: 1,
      label: <div onClick={() => router.push('/my-profile')}>My Profile</div>,
    },
    {
      key: 2,
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  const itemsAdministration = [
    // {
    //   key: 1,
    //   label: <div onClick={() => router.push('/my-profile')}>My Profile</div>,
    // },
    {
      key: 1,
      label: <div onClick={handleLogout}>Logout</div>,
    },
  ];

  return (
    <>
      {hasColor && user && !admin ? (
        <StyledCrUserInfo
          style={{
            backgroundColor: allowSidebarBgImage
              ? ''
              : sidebarColorSet.sidebarHeaderColor,
            color: sidebarColorSet.sidebarTextColor,
          }}
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items }}  // Ensure this structure is correct
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className='ant-dropdown-link'>
              {user.photoURL ? (
                <StyledCrUserInfoAvatar src={user.photoURL} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getUserAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className='cr-user-info-content'>
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {user.displayName ? user.displayName : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className='cr-user-arrow'>
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className='text-truncate'>
                  مستشار توجيه مدرسي
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      ) : (
        <StyledCrUserInfo
          className={clsx('cr-user-info', {
            light: themeMode === 'light',
          })}
        >
          <Dropdown
            menu={{ items: itemsAdministration }}  // Ensure this structure is correct
            trigger={['click']}
            placement='bottomRight'
            overlayStyle={{
              zIndex: 1052,
              minWidth: 150,
            }}
          >
            <StyledCrUserInfoInner className='ant-dropdown-link'>
              {admin.photoURL ? (
                <StyledCrUserInfoAvatar src={admin.photoURL} />
              ) : (
                <StyledCrUserInfoAvatar>
                  {getAdminAvatar()}
                </StyledCrUserInfoAvatar>
              )}
              <StyledCrUserInfoContent className='cr-user-info-content'>
                <StyledUsernameInfo>
                  <StyledUsername
                    className={clsx('text-truncate', {
                      light: themeMode === 'light',
                    })}
                  >
                    {admin.displayName ? admin.displayName : 'admin user '}
                  </StyledUsername>
                  <StyledUserArrow className='cr-user-arrow'>
                    <FaChevronDown />
                  </StyledUserArrow>
                </StyledUsernameInfo>
                <StyledCrUserDesignation className='text-truncate cr-user-designation'>
                  الإدارة
                </StyledCrUserDesignation>
              </StyledCrUserInfoContent>
            </StyledCrUserInfoInner>
          </Dropdown>
        </StyledCrUserInfo>
      )}
    </>
  );
};

export default UserInfo;
