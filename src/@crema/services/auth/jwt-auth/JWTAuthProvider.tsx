'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import jwtAxios, { setAuthToken } from './index';
import { useInfoViewActionsContext } from '@crema/context/AppContextProvider/InfoViewContextProvider';
import { User } from '@core/types/models/user/UserTypes';
import { UserLogIn } from '@core/types/models/userLogin/UserLoginTyps';
import axios from '@crema/services/axios/index';
import { environment } from '../../../../envirenement/environnement';
import { useRouter } from 'next/navigation';
import { initialUrl } from '@crema/constants/AppConst';
import { message } from 'antd';
import { Admin } from '@core/types/models/admin/AdminTypes';

interface JWTAuthContextProps {
  user: User | null | undefined;
  admin: Admin | null | undefined,
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface SignUpProps {
  name: string;
  email: string;
  password: string;
}

export type SignInProps = {
  email: string;
  password: string;
};

interface JWTAuthActionsProps {
  signUpUser: (user: User, file: any) => void;
  signInUser: (data: SignInProps) => void;
  signInAdmin: (data: SignInProps) => void;
  logout: () => void;
}

const JWTAuthContext = createContext<JWTAuthContextProps>({
  user: null,
  admin: null,
  isAuthenticated: false,
  isLoading: true,
});
const JWTAuthActionsContext = createContext<JWTAuthActionsProps>({
  signUpUser: (user: User, file: any) => { },
  signInUser: () => { },
  signInAdmin: () => { },
  logout: () => { },
});

export const useJWTAuth = () => useContext(JWTAuthContext);
export const useJWTAuthActions = () => useContext(JWTAuthActionsContext);

interface JWTAuthAuthProviderProps {
  children: ReactNode;
}

const JWTAuthAuthProvider: React.FC<JWTAuthAuthProviderProps> = ({
  children,
}) => {
  const [jwtData, setJWTAuthData] = useState<JWTAuthContextProps>({
    user: null,
    admin: null,
    isAuthenticated: false,
    isLoading: true,
  });
  const router = useRouter();

  const BASE_URL = 'authenticate/';
  const infoViewActionsContext = useInfoViewActionsContext();
  const API_URL = `${environment._API}api/v1/authenticate`;

  useEffect(() => {
    const getAuthUser = () => {
      const token = localStorage.getItem('token');
      const type = localStorage.getItem('type');
      if (!token) {
        setJWTAuthData({
          user: undefined,
          admin: undefined,
          isLoading: false,
          isAuthenticated: false,
        });
        return;
      }
      setAuthToken(token);
      if (type === "User") {
        jwtAxios
          .get(`${API_URL}/auth`)
          .then(({ data }: any) => {
            console.log('User data fetched:', data);
            setJWTAuthData({
              user: data,
              admin: null,
              isLoading: false,
              isAuthenticated: true,
            });
          })
          .catch(() => {
            console.log('Error fetching user data');
            localStorage.removeItem('token');
            localStorage.removeItem('type');

            setJWTAuthData({
              user: undefined,
              admin: undefined,
              isLoading: false,
              isAuthenticated: false,
            });
          });
      } else if (type === "Admin") {
        jwtAxios
          .get(`${API_URL}/authAdmin`)
          .then(({ data }: any) => {
            console.log('Admin data fetched:', data);
            setJWTAuthData({
              user: null,
              admin: data,
              isLoading: false,
              isAuthenticated: true,
            });
          })
          .catch(() => {
            console.log('Error fetching user data');
            localStorage.removeItem('token');
            localStorage.removeItem('type');

            setJWTAuthData({
              user: undefined,
              admin: undefined,
              isLoading: false,
              isAuthenticated: false,
            });
          });
      }
    };

    getAuthUser();
  }, []);

  const signInUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      infoViewActionsContext.fetchStart();
      const userLogInDto: UserLogIn = {
        email: email,
        password: password,
      };
      axios
        .post(`${API_URL}/authenticate`, userLogInDto)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('type', data.type);
          setAuthToken(data.token);
          infoViewActionsContext.showMessage('تم تسجيل الدخول بنجاح');
          jwtAxios
            .get(`${API_URL}/auth`)
            .then(({ data }) => {
              setJWTAuthData({
                user: data,
                admin: null,
                isAuthenticated: true,
                isLoading: false,
              });
            }).catch((data) => {
              infoViewActionsContext.fetchError(data?.response?.data?.message);
            });
        })
        .catch((data) => {
          infoViewActionsContext.fetchError(data?.response?.data?.message);
        });
    }
    catch ($ex) {

      console.log($ex);

    }
  };

  const signInAdmin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      infoViewActionsContext.fetchStart();
      const userLogInDto: UserLogIn = {
        email: email,
        password: password,
      };
      axios
        .post(`${API_URL}/authenticateAdmin`, userLogInDto)
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('type', data.type);
          setAuthToken(data.token);
          infoViewActionsContext.showMessage('تم تسجيل الدخول بنجاح');
          jwtAxios
            .get(`${API_URL}/authAdmin`)
            .then(({ data }) => {
              setJWTAuthData({
                user: null,
                admin: data,
                isAuthenticated: true,
                isLoading: false,
              });
            }).catch((data) => {
              infoViewActionsContext.fetchError(data?.response?.data?.message);
            });
        })
        .catch((data) => {
          infoViewActionsContext.fetchError(data?.response?.data?.message);
        });
    }
    catch ($ex) {

      console.log($ex);

    }
  };

  const signUpUser = async (user: User, file: File[]) => {
    //   infoViewActionsContext.fetchStart();

    const formData = new FormData();
    formData.append(
      'user',
      new Blob([JSON.stringify(user)], { type: 'application/json' }),
    );

    file.forEach((file, index) => {
      formData.append('file', file);
    });

    axios.post(
      `${API_URL}/signUp`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
      .then(({ data }) => {
        infoViewActionsContext.showMessage('تم تسجيل حسابك بنجاح سيتم مراجعة معلوماتك من طرف الإدارة وسيتم الرد لك برسالة على البريد الإلكتروني');
        router.push('/signin');
        // localStorage.setItem('token', data.token);
        // setAuthToken(data.token);
        // jwtAxios
        //   .get(`${API_URL}/auth`)
        //   .then(({ data }) => {
        //     setJWTAuthData({
        //       user: data,
        //       admin: null,
        //       isAuthenticated: true,
        //       isLoading: false,
        //     });
        //     infoViewActionsContext.fetchSuccess();
        //     router.push(initialUrl);
        //   })
        //   .catch((data) => {
        //     infoViewActionsContext.fetchError(data?.response?.data?.message);
        //   });
      })
      .catch((data) => {
        infoViewActionsContext.fetchError(data?.response?.data?.message);
      });
  };

  const logout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    setAuthToken();
    setJWTAuthData({
      user: null,
      admin: null,
      isLoading: false,
      isAuthenticated: false,
    });
    // router.push('/signin');
  };

  return (
    <JWTAuthContext.Provider value={{ ...jwtData }}>
      <JWTAuthActionsContext.Provider
        value={{ signUpUser, signInUser, signInAdmin, logout }}
      >
        {children}
      </JWTAuthActionsContext.Provider>
    </JWTAuthContext.Provider>
  );
};

export default JWTAuthAuthProvider;
