import axios from 'axios';
import { GET_RESULT } from './types';

export const checkResult = (boardCheck, time, userName, history) => async dispatch => {
    const response = await axios.post(`/sudoku/result/${userName}/${time}`, boardCheck);
    history.push("/result");
    dispatch({
        type: GET_RESULT,
        payload: response.data
    });
}

export const checkResultTip = (time, userName, history) => async dispatch => {
    const response = await axios.post(`/sudoku/resultTip/${userName}`, time);
    history.push("/resultTip");
    dispatch({
        type: GET_RESULT,
        payload: response.data
    });
}