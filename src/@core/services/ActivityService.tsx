import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { Page } from '@core/types/models/core/models';
import {
  GetStudentDto,
} from '@core/types/models/student/StudentTypes';
import { GetActivityDto } from '@core/types/models/activitity/ActivitityTypes';

const API_URL = `${environment._API}api/v1/activities`;


export const useGetSearchActivities = () => {
  return useGetDataApi<Page<GetActivityDto>>(
    `${API_URL}/search`,
    {} as Page<GetActivityDto>,
  );
};



