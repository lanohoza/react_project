'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '../../@crema/hooks/AuthHooks';
import AppLoader from '@crema/components/AppLoader';
import routesConfig from '@crema/core/AppRoutes/routeConfig';
import { Layouts } from '@crema/components/AppLayout';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '@crema/context/AppContextProvider/LayoutContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppInfoView from '@crema/components/AppInfoView';
import { PopUp } from '@core/types/models/popup/PopUpTypes';
import { getPublishedPopUpForNotification } from '@core/services/PopUpService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import PopUpDialog from '../../modules/administration/pop-up/content';

export default function RootLayout({ children }: any) {
  const { navStyle } = useLayoutContext();
  const AppLayout = Layouts[navStyle];

  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();
  const [notifications, setNotifications] = useState<PopUp>();
  const [openPopUpModel, setOpenPopUpModel] = useState(false);
  const infoViewActionsContext = useInfoViewActionsContext();
  const { admin, user, isLoading } = useAuthUser();
  const router = useRouter();
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();

  useEffect(() => {
    if (!user) {
      router.push('/signin' + (queryParams ? '?' + queryParams : ''));
    }
  }, [user, isLoading, queryParams]);

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const publishedPopUp = await getPublishedPopUpForNotification(infoViewActionsContext);
        if (publishedPopUp) {
          setNotifications(publishedPopUp);
          setOpenPopUpModel(true);
        } else {
          setNotifications(null);
        }
      } catch (error) {
        infoViewActionsContext.fetchError(error.message);
        console.error('Error fetching published pop-up:', error);
      }
    };

    fetchNotifications();
  }, []);

  if (!user || isLoading) return <AppLoader />;

  return (
    <AppLayout routesConfig={routesConfig}>
      {children}
      {(notifications && notifications.sourceUrl) &&
        <PopUpDialog item={notifications} onClose={() => setOpenPopUpModel(false)} />
      }
    </AppLayout>
  );
}
