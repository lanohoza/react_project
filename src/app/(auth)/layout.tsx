'use client';
import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { initialUrl,initialUrlAdministration } from '@crema/constants/AppConst';
import AppLoader from '@crema/components/AppLoader';
import { useLayoutActionsContext } from '@crema/context/AppContextProvider/LayoutContextProvider';
import { useSidebarActionsContext } from '@crema/context/AppContextProvider/SidebarContextProvider';
import AuthLayout from './AuthLayout';
import AppInfoView from '@crema/components/AppInfoView';

export default function RootLayout({ children }: any) {
  const { updateNavStyle } = useLayoutActionsContext();
  const { updateMenuStyle, setSidebarBgImage } = useSidebarActionsContext();
  const searchParams = useSearchParams();
  const { user, admin, isLoading } = useAuthUser();
  const layout = searchParams.get('layout');
  const menuStyle = searchParams.get('menuStyle');
  const sidebarImage = searchParams.get('sidebarImage');
  const queryParams = searchParams.toString();
  const router = useRouter();

  useEffect(() => {
    if (layout) updateNavStyle(layout);
    if (menuStyle) updateMenuStyle(menuStyle);
    if (sidebarImage) setSidebarBgImage(true);
  }, [layout, menuStyle, sidebarImage, updateMenuStyle, updateNavStyle]);

  useEffect(() => {
    if (user && !admin) {
      router.push(initialUrl + (queryParams ? '?' + queryParams : ''));
    } else if (admin && !user){
      router.push(initialUrlAdministration + (queryParams ? '?' + queryParams : ''));
    }
  }, [queryParams, user , admin]);

  if (isLoading || user || admin) return <AppLoader />;

  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}
