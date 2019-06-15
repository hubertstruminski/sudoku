import axios from 'axios';
import { GET_RESULT } from './types';

export const checkResult = (boardCheck, time, userName, isTip, history) => async dispatch => {
    const response = await axios.post("/sudoku/result", boardCheck, time, userName);
    dispatch({
        type: GET_RESULT,
        payload: response.data
    });
    history.push("/sudoku/result");
}

export const checkResultTip = (time, userName, history) => async dispatch => {
    const response = await axios.post(`/sudoku/resultTip/${userName}`, time);
    history.push("/resultTip");
    dispatch({
        type: GET_RESULT,
        payload: response.data
    });
}