
const baseUrl = process.env.REACT_APP_API_URL;

export default {
  loginUrl: `${baseUrl}auth/login`,
  loginOutUrl: `${baseUrl}auth/logout`,
  getTicketList: `${baseUrl}ticket`,
  addTicket: `${baseUrl}ticket/add`,
};
