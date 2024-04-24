import servers from './server.js';
export const apiPaths = {
    loginPath: (email) => `${servers.SERVER_URL}api/user/login/${email}`,
    signUpPath: () => `${servers.SERVER_URL}api/user/`,
    profileData: (userID) => `${servers.SERVER_URL}api/user/${userID}`,
  };
