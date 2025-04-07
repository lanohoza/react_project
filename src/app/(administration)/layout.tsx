'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '../../@crema/hooks/AuthHooks';
import AppLoader from '@crema/components/AppLoader';
import routesConfigAdmin from '@crema/core/AppRoutes/routeConfigAdmin';
import { Layouts } from '@crema/components/AppLayout';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import {
  useLayoutActionsContext,
  useLayoutContext,
} from '@crema/context/AppContextProvider/LayoutContextProvider';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import AppInfoView from '@crema/components/AppInfoView';
import { AdminLayouts } from '@crema/components/AppLayout/Administration/Layout';
import { initialUrlAdministration } from '@crema/constants/AppConst';

export default function RootLayout({ children }: any) {
  const { navStyle } = useLayoutContext();
  const AppLayout = AdminLayouts[navStyle];

  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();

  const { admin, user, isLoading } = useAuthUser();
  const router = useRouter();
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();

  useEffect(() => {
    if (!admin) {
      router.push('/admin/signin/' + (queryParams ? '?' + queryParams : ''));
    }
  }, [admin, isLoading, queryParams]);

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, []);

  if (!admin || isLoading) return <AppLoader />;

  return (
    <AppLayout routesConfig={routesConfigAdmin}>
      {children}
    </AppLayout>
  );
}
