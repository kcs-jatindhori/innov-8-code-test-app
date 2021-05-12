import * as TicketService from "../services/TicketService";
export const ADD_TICKET = "ADD_TICKET";

export const getTicketData = async (tblPayload) => {
    let retResponse = { status: false, data: {} };
    try {
        const data = await TicketService.getList(tblPayload);
        if (data.data.success) {
            retResponse.status = true;
        }
        retResponse.data = (data && data.data) ? data.data : retResponse.data;
    } catch (e) {
        console.log('Get Ticket Error', e);
    }
    return retResponse;
};


export const addTicket = (ticketData) => async dispatch => {
    let retResponse = { status: false, data: {} };
    try {
        const data = await TicketService.add(ticketData);
        if (data.data.success) {
            dispatch({
                type: ADD_TICKET,
                ticket: data.data.data,
            });
        }
        return data.data;
    } catch (e) {
        console.log('Login Error:', e);
    }
    return retResponse;
};