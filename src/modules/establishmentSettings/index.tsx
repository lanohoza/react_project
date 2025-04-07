'use client';
import React from 'react';
import AppsContainer from '@crema/components/AppsContainer';
import AppPageMeta from '@crema/components/AppPageMeta';
import EstablishmentSettingsContextProvider from './EstablishmentSettingsContextProvider';
import EstablishmentEmployeesPage from './EstablishmentEmployees';
import { StyledConfirmationView } from './index.styled';
import { Divider } from 'antd';
import EstablishmentEmployeesList from './EstablishmentEmployees/Listing';


const EstablishmentSettingssList = ({ }) => {

  return (
    <>
      <EstablishmentSettingsContextProvider>
        <StyledConfirmationView key={'wrap'}>
          {/* Section : EstablishmentEmployees */}
          <Divider orientation="left">موظفي المؤسسة</Divider>
          <EstablishmentEmployeesPage />
          {/* Add here the others section like the previous */}
        </StyledConfirmationView>
      </EstablishmentSettingsContextProvider>
    </>
  );
};

export default EstablishmentSettingssList;
