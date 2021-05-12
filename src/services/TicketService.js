import axios from "axios";
import apiurl from "../config/api";

export async function getList(tblPayload) {
  return axios.get(`${apiurl.getTicketList}?${tblPayload}`)
    .then((result) => {
      return result;
    }).catch((error) => {
      console.log(error);
    });
}

export async function add(ticketData) {
  return axios.post(apiurl.addTicket, ticketData)
    .then((result) => {
      return result;
    }).catch((error) => {
      console.log(error);
    });
}
