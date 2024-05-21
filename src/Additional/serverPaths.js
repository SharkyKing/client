import servers from './server.js';
export const apiPaths = {
    loginPath: (email) => `${servers.SERVER_URL}api/user/login/${email}`,
    signUpPath: () => `${servers.SERVER_URL}api/user/`,
    profileData: (userID) => `${servers.SERVER_URL}api/user/${userID}`,
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
      return `${meetingPath}?${queryParams}`;
  }
  };
