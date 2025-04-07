'use client';
import React from 'react';
import ActivititesReportModal from '../ActivititesReportModal';
import { useDialyActivityContext } from '../dialyActivityContextProvider';


const Models = ({ }) => {
    const { openActivityReportModal } = useDialyActivityContext();

    return (<>
        {openActivityReportModal && <ActivititesReportModal />}
    </>
    );
};

export default Models;
