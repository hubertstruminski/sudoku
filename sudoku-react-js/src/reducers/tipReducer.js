import { GET_TIP } from '../actions/types';

export default function(state = [], action) {
    switch(action.type) {
        case GET_TIP:
            return [
                ...state, ...action.payload
            ]
        default:
            return state;
    }
}