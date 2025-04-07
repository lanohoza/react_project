// I use axios in this service because i need this code before sign In
import axios from 'axios';
import { environment } from "../../envirenement/environnement";

const API_URL = `${environment._API}api/v1/forget-password`;

export const verifyEmail = async (email: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/verify-email`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

export const verifyCodeOtp = async (email: string, codeOtp: number): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/verify-code`, null, {
      params: { email, codeOtp },
    });
    return response.data;
  } catch (error) {
    console.error('Error verifying code OTP:', error);
    throw error;
  }
};

export const changePassword = async (email: string, password: string, repeatPassword: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/change-password`, { password, repeatPassword }, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
