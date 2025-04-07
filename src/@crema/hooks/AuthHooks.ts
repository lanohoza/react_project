// For JWT Auth
import { getAdminFromJwtAuth, getUserFromJwtAuth } from '@crema/helpers/AuthHelper';
import { useJWTAuth, useJWTAuthActions } from '@crema/services/auth/jwt-auth/JWTAuthProvider';

export const useAuthUser = () => {
  const { user, admin, isAuthenticated, isLoading } = useJWTAuth();
  return {
    isLoading,
    isAuthenticated,
    user: getUserFromJwtAuth(user),
    admin: getAdminFromJwtAuth(admin),
  };
};

export const useAuthMethod = () => {
  const { signInUser, signInAdmin, signUpUser, logout } = useJWTAuthActions();

  return {
    signInUser,
    signInAdmin,
    logout,
    signUpUser,
  };
};

