import axios from 'axios';
import { GET_STATISTICS, GET_STATISTIC } from './types';

export const getStatistics = () => async dispatch => {
    const response = await axios.get("/statistics");
    dispatch({
        type: GET_STATISTICS,
        payload: response.data
    });
}

export const getStatistic = (id) => async dispatch => {
    const response = await axios.get(`/statistics/${id}`);
    dispatch({
        type: GET_STATISTIC,
        payload: response.data
    });
}