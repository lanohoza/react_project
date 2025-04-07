import React, { useState } from 'react';
import AppMenu from '@crema/components/AppMenu';
import {
  StyledTcCell,
  StyledTcCellAction,
  StyledTcCellBtn,
  StyledTcCellContent,
  StyledTcCellInfo,
  StyledTcCellMenu,
  StyledTcCellRate,
  StyledTcCellRating,
  StyledTcCellThumb,
} from './index.styled';
import Image from 'next/image';
import {
  TechnicalCard,
  TechnicalCardYearDto,
} from '../../../@core/types/models/technicalCards/TechnicalCardTypes';
import { SelectOutlined } from '@ant-design/icons';

type TcCellProps = {
  technicalCard: TechnicalCard;
  onSelected: (technicalCard: TechnicalCard) => void;
};

const TcCell: React.FC<TcCellProps> = ({ technicalCard, onSelected }) => {
  const [seleted, setSelected] = useState(false);
  const onSelectedHandle = () => {
    // onSelected(technicalCard);
    setSelected(!seleted);
  };
  return (
    <StyledTcCell
      key={technicalCard.id}
      className={seleted ? "item-hover  selected" : "item-hover"}
      onClick={(_) => {
        if (onSelected) onSelected(technicalCard);
        onSelectedHandle();
      }}
    >
      <StyledTcCellContent>
        <StyledTcCellThumb
          style={{
            backgroundColor: '#FEF1E4',
            color: '#F88333',
          }}
        >
          {technicalCard.id}
        </StyledTcCellThumb>
        <StyledTcCellInfo>
          <h4 className='text-truncate'>{technicalCard.code+"-"+ technicalCard.title}</h4>
          <div style={{ display: 'flex' }}>
            <p className='text-truncate '>شهر التنفيذ : </p>
            <p className='text-truncate label'>{technicalCard.runMonth}</p>
            <p className='text-truncate '>أسبوع التنفيذ: </p>
            <p className='text-truncate label'>{technicalCard.runWeek}</p>
          </div>
        </StyledTcCellInfo>
      </StyledTcCellContent>

      <StyledTcCellAction>
        {seleted && (
          <div className='ant-row ant-row-middle'>
            <StyledTcCellBtn type='primary'
              shape='round' icon={<SelectOutlined />}> </StyledTcCellBtn>
          </div>
        )}
      </StyledTcCellAction>
    </StyledTcCell>
  );
};

export default TcCell;
