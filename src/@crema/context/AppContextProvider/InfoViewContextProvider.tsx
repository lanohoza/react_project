'use client';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import { contextReducer, InFoViewActions } from './InfoViewReducer';
import error from 'next/error';

export type InfoViewData = {
  error: string;
  displayMessage: string;
  loading: boolean;
};

export type InfoViewActions = {
  fetchStart: () => void;
  fetchSuccess: () => void;
  fetchError: (error: string) => void;
  showMessage: (displayMessage: string) => void;
  clearInfoView: () => void;
};

export const ContextState: InfoViewData = {
  loading: false,
  error: '',
  displayMessage: '',
};

const InfoViewContext = createContext<InfoViewData>(ContextState);
const InfoViewActionsContext = createContext<InfoViewActions>({
  fetchStart: () => { },
  fetchSuccess: () => { },
  fetchError: (error: string) => { },
  showMessage: (displayMessage: string) => { },
  clearInfoView: () => { },
});

export const useInfoViewContext = () => useContext(InfoViewContext);
export const useInfoViewActionsContext = () =>
  useContext(InfoViewActionsContext);

type InfoViewContextProviderProps = {
  children: ReactNode;
};
const InfoViewContextProvider: React.FC<InfoViewContextProviderProps> = (
  props,
) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(undefined);
  const [displayMessage, setDisplayMessage] = useState<string>(undefined);


  const fetchStart = () => {
    setLoading(true);
  };
  const fetchSuccess = () => {
    setLoading(false);
  };
  const fetchError = (error: string) => {
    setError(error);
    setLoading(false);
  };

  const showMessage = (displayMessage: string) => {
    setDisplayMessage(displayMessage);
  };

  const clearInfoView = () => {
    setError(undefined);
    setDisplayMessage(undefined);
  };

  return (
    <InfoViewContext.Provider value={{
      displayMessage: displayMessage, loading: loading, error: error
    }}>
      <InfoViewActionsContext.Provider
        value={{
          fetchStart,
          fetchSuccess,
          fetchError,
          showMessage,
          clearInfoView,
        }}
      >
        {props.children}
      </InfoViewActionsContext.Provider>
    </InfoViewContext.Provider>
  );
};

export default InfoViewContextProvider;
