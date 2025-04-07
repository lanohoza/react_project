import axios from '@crema/services/axios/index';
import { environment } from '../../envirenement/environnement';
import {
  deleteDataApi,
  getDataApi,
  postDataApi,
  putDataApi,
  useGetDataApi,
} from '@crema/hooks/APIHooks';
import { InfoViewActions } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { Page } from '@core/types/models/core/models';
import {
  GetStudentDto,
  Student,
  StudentNoteDto,
} from '@core/types/models/student/StudentTypes';
import jwtAxios from '@crema/services/auth/jwt-auth';

const API_URL = `${environment._API}api/v1/students`;

// Get all Students


