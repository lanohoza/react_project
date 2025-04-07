

'use client';
import React, { useEffect, useState } from 'react';

import { StyledModal, StyledFormContent, StyledFormContentItem, StyledForm, StyledFormHeader, StyledFormHeaderTitle, StyledFormContentField, StyledFormFooter, StyledFormBtn } from './index.styled';
import { Level } from '@core/types/models/level/LevelTypes';
import { Form, Input, InputNumber, Select, message } from 'antd';
import { Speciality } from '@core/types/models/speciality/LevelTypes';
import IntlMessages from '@crema/helpers/IntlMessages';
import { useGetAllLevels } from '@core/services/LevelService';
import { getAllByIdLevel } from '@core/services/SpecialityService';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Classe } from '@core/types/models/classe/ClasseTypes';
import { createClasse, updateClasse } from '@core/services/ClasseService';
import { ModeComponent } from '@core/types/models/core/models';
import { useClasseActionsContext, useClasseContext } from '../../classes/ClassContextProvider';
import { InboxOutlined } from '@ant-design/icons';
import form from 'antd/es/form';
import Dragger from 'antd/es/upload/Dragger';

const ImportNoteModel = () => {
    const infoViewActionsContext = useInfoViewActionsContext();
    const { onCloseModel, reload } = useClasseActionsContext();
    const { initialData, modeAddEditViewModel, openAddEditViewModel } = useClasseContext();



    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    return (
        <>
            <StyledModal
                footer={false}
                open={false}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >


                <Dragger {...props}>
                    <p className='ant-upload-drag-icon'>
                        <InboxOutlined />
                    </p>
                    <p className='ant-upload-text'>
                        Click or drag file to this area to upload
                    </p>
                    <p className='ant-upload-hint'>
                        Support for a single or bulk upload. Strictly prohibit from uploading
                        company data or other band files
                    </p>
                </Dragger>

            </StyledModal>
        </>
    );
};

export default ImportNoteModel;
