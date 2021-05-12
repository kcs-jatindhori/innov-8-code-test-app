import {
  ADD_TICKET,
} from '../actions/ticketAction'

const initialState = {
  ticket: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TICKET:
      return {
        ...state,
        ticket: action.ticket
      }

    default:
      return state
  }
}
