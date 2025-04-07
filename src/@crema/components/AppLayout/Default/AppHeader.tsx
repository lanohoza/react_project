import React from 'react';
import AppLogo from '../components/AppLogo';
import { useIntl } from 'react-intl';
import AppLanguageSwitcher from '../../AppLanguageSwitcher';
import AppHeaderMessages from '../../AppHeaderMessages';
import AppNotifications from '../../AppNotifications';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import {
  StyledAppHeader,
  StyledAppHeaderSectionDesk,
  StyledAppHeaderSectionMobile,
  StyledHeaderSearch,
} from './index.styled';
import { Dropdown } from 'antd';
import { StyledDropdownWrapper } from '../index.styled';
import CurrentTasksDropDwom from '../../../../modules/tasks/CurrentTasksDropDwom';
import AppCurrentTasksTable from '@core/components/CurrentTasksDropDwom';
import { StyledCustomButton } from '@core/styles/header/index.styled';
import { FileTextOutlined, TeamOutlined } from '@ant-design/icons';
import { StyledHeaderCurruntTasksIcon } from '@core/components/CurrentTasksDropDwom/index.styled';

const items = [
  { key: 1, label: <AppHeaderMessages /> },
  { key: 2, label: <AppNotifications /> },
  { key: 3, label: <AppLanguageSwitcher /> },
];

type Props = {
  onToggleSidebar: (isCollapsed: boolean) => void;
  isCollapsed: boolean;
}
const AppHeader: React.FC<Props> = ({ isCollapsed, onToggleSidebar }) => {
  const { messages } = useIntl();

  return (
    <StyledAppHeader>
      <a className='trigger' onClick={() => onToggleSidebar(!isCollapsed)}>
        <AiOutlineMenu />
      </a>
      <AppLogo />
      <div style={{
        marginRight: "auto",
        marginLeft: "10px",
        display: "flex"
      }}>
        <AppCurrentTasksTable />
     
      </div>
      <StyledHeaderSearch placeholder={messages['common.searchHere'] as string} />
      <StyledAppHeaderSectionDesk>
        <AppLanguageSwitcher />
        <AppHeaderMessages />
        <AppNotifications />
      </StyledAppHeaderSectionDesk>
      <StyledAppHeaderSectionMobile>
        <StyledDropdownWrapper>
          <Dropdown
            menu={{ items }}
            overlayClassName='dropdown-wrapper'
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}>
            <a
              className='ant-dropdown-link-mobile'
              onClick={(e) => e.preventDefault()}>
              <FiMoreVertical />
            </a>
          </Dropdown>
        </StyledDropdownWrapper>
      </StyledAppHeaderSectionMobile>
    </StyledAppHeader>
  );
};

export default AppHeader;
