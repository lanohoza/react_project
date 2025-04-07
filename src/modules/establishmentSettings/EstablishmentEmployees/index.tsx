'use client';
import { Col, Divider } from "antd";
import React from "react";
import { StyledConfirmationCard } from "../index.styled";
import AppRowContainer from "@crema/components/AppRowContainer";
import EstablishmentEmployeesList from "./Listing";
import AppsContainer from '@crema/components/AppsContainer';
import EstablishmentSettingsContextProvider from "../EstablishmentSettingsContextProvider";
import Models from "./Models";
import AppPageMeta from "@crema/components/AppPageMeta";


const EstablishmentEmployeesPage = () => {

  return (
    <>
      <EstablishmentSettingsContextProvider>
        <AppsContainer
          title=""
          fullView
        >
          <AppPageMeta title='موظفي المؤسسة' />
          <EstablishmentEmployeesList />
          <Models />
        </AppsContainer>
      </EstablishmentSettingsContextProvider>
    </>
  );
};

export default EstablishmentEmployeesPage;
