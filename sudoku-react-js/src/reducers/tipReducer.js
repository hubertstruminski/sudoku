import { GET_TIP } from '../actions/types';

const initialState = {
    boardTip: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_TIP:
            return {
                ...state,
                boardTip: action.payload
            }
        default:
            return state;
    }
}