import jwtAxios from "@crema/services/auth/jwt-auth/index";
import { environment } from "../../envirenement/environnement";


const API_URL = `${environment._API}api/v1/FTP`;

// Upload image
export const uploadImage = async (imageFile: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const response = await jwtAxios.post(`${API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data; 
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  // Delete image
  export const deleteImage = async (imageName: string): Promise<boolean> => {
    try {
      const response = await jwtAxios.post(`${API_URL}/delete`, imageName, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };