'use client';
import React, { useEffect, useState } from 'react';
import { getWeekProgramTasksByIdWeekProgram, getWeekProgramTasksByIdWeekProgramForDocument } from '@core/services/WeekProgramTasksService'; // Import this function
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import DocumnetView from '@core/components/DocumnetView';
import TechnicalCardDocuments from '@core/Documents/TechnicalCards';
import { AddEditTasksWeekProgramDto } from '@core/types/models/addEditTasksWeekProgramDto/AddEditTasksWeekProgramDtoTypes';
import { AddEditWeekProgramDto } from '@core/types/models/weekProgram/WeekProgramTypes';
import { WeekProgramTaskUserDto } from '@core/types/models/weekProgramTasks/WeekProgramTaskUserDto';
import WeekProgramTasksDocument from '@core/Documents/weekProgramTasks';
import { useSearchParams } from 'next/navigation';

type WeekProgramTasksProps = {
  idWeekProgram: number;
};

const WeekProgramTasks = ({ }) => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const [addEditTasksWeekProgramDto, setAddEditTasksWeekProgramDto] = useState<WeekProgramTaskUserDto | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const loadWeekProgramTasks = async () => {
      try {
        const idWeekProgram = parseInt(searchParams.get('wp'));

        if (idWeekProgram) {
          const weekProgramTasks = await getWeekProgramTasksByIdWeekProgramForDocument(idWeekProgram, infoViewActionsContext);
          const dto: WeekProgramTaskUserDto = {
            username: weekProgramTasks.username,
            establishmentName: weekProgramTasks.establishmentName,
            wilayaName: weekProgramTasks.wilayaName,
            startWeek: weekProgramTasks.startWeek,
            endWeek: weekProgramTasks.endWeek,
            weekProgramTaskDtos: weekProgramTasks.weekProgramTaskDtos,
          };
          setAddEditTasksWeekProgramDto(dto);
        }
      } catch (error) {
        console.error('Error fetching week program tasks:', error);
      }
    };

    loadWeekProgramTasks();
  }, []);

  return (
    <DocumnetView>
      {addEditTasksWeekProgramDto && (
        <WeekProgramTasksDocument datasource={addEditTasksWeekProgramDto} />
      )}
    </DocumnetView>
  );
};

export default WeekProgramTasks;
