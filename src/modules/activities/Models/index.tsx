'use client';
import React from 'react';
import ActivititesReportModal from '../ActivititesReportModal';
import { useActivityContext } from '../activityContextProvider';


const Models = ({ }) => {
    const { openActivityReportModal } = useActivityContext();

    return (<>
        {openActivityReportModal && <ActivititesReportModal />}
    </>
    );
};

export default Models;
