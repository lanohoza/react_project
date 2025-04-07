import React, { useEffect } from "react";
import { notification } from "antd";

import AppLoader from "../AppLoader";

import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/AppContextProvider/InfoViewContextProvider";
import { useIntl } from "react-intl";

const AppInfoView = () => {
  const { loading, error, displayMessage } = useInfoViewContext();
  const { clearInfoView } = useInfoViewActionsContext();
  const { messages } = useIntl();

  useEffect(() => {
    if (error) {
      notification.error({ message: messages[error] as string ?? error });
      clearInfoView();
    }
  }, [error]);

  useEffect(() => {
    if (displayMessage) {
      notification.success({ message: messages[displayMessage] as string ?? displayMessage });
      clearInfoView();
    }
  }, [displayMessage]);

  return <>{loading ? <AppLoader /> : null}</>;
};

export default AppInfoView;
