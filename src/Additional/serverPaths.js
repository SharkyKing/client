import servers from './server.js';
export const apiPaths = {
    getAllUsers: () => `${servers.SERVER_URL}api/user/`,
    loginPath: (email) => `${servers.SERVER_URL}api/user/login/${email}`,
    signUpPath: () => `${servers.SERVER_URL}api/user/`,
    sendMessage: () => `${servers.SERVER_URL}api/sms/`,
    updateUser: (email) => `${servers.SERVER_URL}api/user/${email}`,
    profileData: (email) => `${servers.SERVER_URL}api/user/${email}`,
    saveMeeting: (firstName, lastName, phoneNo, email, specialist, date) => {
      const meetingPath = `${servers.SERVER_URL}api/meeting/`;
      // Optionally, you can include parameters in the URL query string
      const queryParams = new URLSearchParams({
          firstName,
          lastName,
          phoneNo,
          email,
          date,
          specialist
      });
      return `${meetingPath}?${queryParams}`;},
      getMeetings: (email, stateId) => {
        const meetingPath = `${servers.SERVER_URL}api/meeting/${email}/state/${stateId}`;
        return meetingPath;
      }
  };
