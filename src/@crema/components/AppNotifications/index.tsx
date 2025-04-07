import React, { useEffect, useState } from 'react';
import { Dropdown, Badge, Tooltip } from 'antd';
import IntlMessages from '@crema/helpers/IntlMessages';
import NotificationItem from './NotificationItem';
import { IoIosNotificationsOutline } from 'react-icons/io';
import {
  StyledDrowdownWrapper,
  StyledNotifyButtonAll,
  StyledNotifyIcon,
  StyledNotifyLink,
  StyledNotifyList,
  StyledNotifyScrollSubmenu,
  StyledNotifyText,
} from './index.styled';
import { getPublishedPopUpForNotification } from '@core/services/PopUpService';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import PopUpDialog from '../../../modules/administration/pop-up/content';

const AppNotifications = () => {
  const infoViewActions = useInfoViewActionsContext();
  const [notifications, setNotifications] = useState<PopUp[]>([]);
  const [selectedPopUp, setSelectedPopUp] = useState<PopUp | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const publishedPopUp = await getPublishedPopUpForNotification(infoViewActions);
        if (publishedPopUp) {
          setNotifications([publishedPopUp]);
        } else {
          setNotifications([]);
        }
      } catch (error) {
        infoViewActions.fetchError(error.message);
        console.error('Error fetching published pop-up:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClick = (item: PopUp) => {
    setSelectedPopUp(item);
  };

  const handleDialogClose = () => {
    setSelectedPopUp(null);
  };

  const items = [
    {
      key: 1,
      label: (
        <span className="header">
          <IntlMessages id="common.notifications" />({notifications.length})
        </span>
      ),
    },
    {
      key: 2,
      label: (
        <StyledNotifyScrollSubmenu>
          <StyledNotifyList
            dataSource={notifications}
            renderItem={(item: PopUp) => {
              type NotificationItemProps = {
                item: {
                  image: string;
                  name: string;
                  message: string;
                };
              };

              const transformedItem: NotificationItemProps['item'] = {
                image: `data:image/jpeg;base64,${item.image}`,
                name: item.title,
                message: item.description,
              };

              return (
                <div
                  onClick={() => handleClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <NotificationItem key={item.id} item={transformedItem} />
                </div>
              );
            }}
          />
        </StyledNotifyScrollSubmenu>
      ),
    },
    // {
    //   key: 3,
    //   label: (
    //     <StyledNotifyButtonAll type="primary">
    //       <IntlMessages id="common.viewAll" />
    //     </StyledNotifyButtonAll>
    //   ),
    // },
  ];

  return (
    <>
      <Tooltip placement="rightTop" title="الإشعارات">
        <StyledDrowdownWrapper>
          <Dropdown
            menu={{ items }}
            overlayClassName="header-notify-messages"
            getPopupContainer={(triggerNode) => triggerNode}
            trigger={['click']}
          >
            <StyledNotifyLink onClick={(e) => e.preventDefault()}>
              <Badge
                count={notifications.length}
                size="default"
                overflowCount={notifications.length}
              >
                <StyledNotifyIcon>
                  <IoIosNotificationsOutline />
                </StyledNotifyIcon>
              </Badge>
              <StyledNotifyText>
                {/* <IntlMessages id="common.notifications" /> */}
                <IoIosNotificationsOutline />
              </StyledNotifyText>
            </StyledNotifyLink>
          </Dropdown>
        </StyledDrowdownWrapper>
      </Tooltip>
      {selectedPopUp && selectedPopUp.sourceUrl?.trim() && (
        <PopUpDialog
          item={selectedPopUp}
          onClose={handleDialogClose}
        />
      )}
    </>
  );
};

export default AppNotifications;
