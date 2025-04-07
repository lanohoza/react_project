import { environment } from '../../envirenement/environnement';
import { UserLogInResponse } from '@core/types/models/userLogInResponse/UserLogInResponseTypes';
import { UserLogIn } from '@core/types/models/userLogin/UserLoginTyps';
import jwtAxios from '@crema/services/auth/jwt-auth/index';

const API_URL = `${environment._API}api/v1/authenticate`;

// Authenticate user
export const authenticateUser = async (userLogInDto: UserLogIn): Promise<UserLogInResponse> => {
  try {
    const response = await jwtAxios.post(`${API_URL}/authenticate`, userLogInDto);
    return response.data;
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
};
