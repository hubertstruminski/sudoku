import { GET_STATISTICS, GET_STATISTIC } from '../actions/types';

const initialState = {
    statistics: [],
    statistic: {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STATISTICS:
            return {
                ...state,
                statistics: action.payload
            }
        case GET_STATISTIC:
            return {
                ...state,
                statistic: action.payload
            }
        default:
            return state;
    }
}