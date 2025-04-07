import { environment } from '../../envirenement/environnement';
import { User } from '@core/types/models/user/UserTypes';
import jwtAxios from '@crema/services/auth/jwt-auth/index';
import { Page } from '@core/types/models/core/models';
import { useGetDataApi } from '@crema/hooks/APIHooks';

const API_URL = `${environment._API}api/v1/users`;

export const getAllUsers = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useGetDataApi<Page<User>>(
    `${API_URL}/all`,
    {} as Page<User>,
  );
};

// Get all users
// export const getAllUsers = async (): Promise<User[]> => {
//   try {
//     const response = await jwtAxios.get(`${API_URL}/all`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     throw error;
//   }
// };

// Get a user by ID
export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const response = await jwtAxios.get(`${API_URL}/getUserById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with id ${id}:`, error);
    throw error;
  }
};

// Create a new user with file upload
export const createUser = async (user: User, files: File[]): Promise<User> => {
  try {
    const formData = new FormData();

    // Append user object as JSON string
    formData.append('user', new Blob([JSON.stringify(user)], { type: 'application/json' }));

    // Append each file
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const response = await jwtAxios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};


// Update a user
export const updateUser = async (id: number, user: User): Promise<User> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/update/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with id ${id}:`, error);
    throw error;
  }
};

// Delete a user
export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const response = await jwtAxios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with id ${id}:`, error);
    throw error;
  }
};

// Edit user password
export const editPassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
  try {
    const response = await jwtAxios.put(`${API_URL}/editPassword`, null, {
      params: { currentPassword, newPassword }
    });
    return response.data;
  } catch (error) {
    console.error(`Error editing password for user :`, error);
    throw error;
  }
};

// Activate or deactivate a user
export const activateUser = async (user: User, state: boolean, reasonDesactivate: string): Promise<boolean> => {
  try {
    const response = await jwtAxios.post(
      `${API_URL}/activeUnactiveUser/${state}?reasonDesactivate=${encodeURIComponent(reasonDesactivate)}`,
      user
    );
    return response.data;
  } catch (error) {
    console.error(`Error activating/deactivating user with email ${user.email}:`, error);
    throw error;
  }
};
