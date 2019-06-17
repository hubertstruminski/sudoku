import { GET_RESULT } from "../actions/types";

export default function(state = [], action) {
    switch(action.type) {
        case GET_RESULT:
            return [
                ...state, ...action.payload
            ]
        default:
            return state;
    }
}