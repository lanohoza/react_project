'use client';
import { getAllScholerYears } from '@core/services/YearService';

import { Year } from '@core/types/models/year/YearTypes';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Trimestre } from '@core/types/models/trimestre/TrimestreTypes';
import { getAllTrimestresByYear } from '@core/services/TrimestreService';

export type TrimestreContextActions = {
  setSelectedIdYear: (idYear: number) => void;
};
export type TrimestreContextData = {
  trimesters: Trimestre[];
  loading: boolean;
  years: Year[];
};
const TrimestreContext = createContext<TrimestreContextData>({
  trimesters: [],
  loading: true,
  years: [],
});

const TrimestreActionsContext = createContext<TrimestreContextActions>({
  setSelectedIdYear: (idYear: number) => { },
});

export const useTrimestreContext = () => useContext(TrimestreContext);

export const useTrimestreActionsContext = () => useContext(TrimestreActionsContext);

type TrimestreContextProviderProps = {
  children: ReactNode;
};

const TrimestreContextProvider: React.FC<TrimestreContextProviderProps> = ({
  children,
}) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const [years, setYears] = useState<Year[]>([] as Year[]);

  const [loading, setLoading] = useState(false);
  const [selectedIdYear, setSelectedIdYear] = useState<number>(-1);
  const [trimesters, setTrimesters] = useState<Trimestre[]>([]);


  useEffect(() => {
    getAllScholerYears(infoViewActionsContext).then((years) => setYears(years));
  }, []);
  useEffect(() => {
    reloadData();
  }, [selectedIdYear]);

  const reloadData = () => {
    if (selectedIdYear != -1) {
      setLoading(true);
      getAllTrimestresByYear(selectedIdYear, infoViewActionsContext).then((trimesters) => { setTrimesters(trimesters); setLoading(false); });


    }
  };

  return (
    <TrimestreContext.Provider
      value={{
        loading: loading,
        trimesters: trimesters,
        years: years,
      }}
    >
      <TrimestreActionsContext.Provider
        value={{
          setSelectedIdYear: setSelectedIdYear,
        }}
      >
        {children}
      </TrimestreActionsContext.Provider>
    </TrimestreContext.Provider>
  );
};

export default TrimestreContextProvider;
