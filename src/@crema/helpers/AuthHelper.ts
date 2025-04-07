import { authRole } from '@crema/constants/AppConst';

export const getUserFromAuth0 = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user.sub,
      displayName: user.name,
      email: user.email,
      photoURL: user.picture,
      role: authRole.User,
    };
  return user;
};

export const getUserFromFirebase = (user: any) => {

    
    return {
      id: 1,
      uid: "888888888",
      displayName: 'كحلة محمد الحبيب',
      email: "test@gmail.com",
      photoURL:'/assets/images/avatar/A11.jpg',
      role: authRole.User,
    };
};
export const getUserFromAWS = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user.username,
      displayName: user.attributes.name ? user.attributes.name : 'Crema User',
      email: user.attributes.email,
      photoURL: user.photoURL,
      role: authRole.User,
    };
  return user;
};

export const getUserFromJwtAuth = (user: any) => {
  if (user)
    return {
      id: 1,
      uid: user._id,
      displayName: user.username,
      email: user.email,
      photoURL: user.avatar,
      role: authRole.User,
    };
  return user;
};

export const getAdminFromJwtAuth = (admin: any) => {
  if (admin)
    return {
      id: 1,
      uid: admin._id,
      displayName: admin.lastName + " " + admin.firstName,
      email: admin.email,
      photoURL: admin.avatar,
      role: authRole.Admin,
    };
  return admin;
};
