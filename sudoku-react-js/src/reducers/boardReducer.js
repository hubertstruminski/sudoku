import { GET_BOARD } from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_BOARD:
            return [
                ...state, ...action.payload
            ]
        default:
            return state;
    }
}