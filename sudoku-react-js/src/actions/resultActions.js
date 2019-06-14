import axios from 'axios';
import { GET_RESULT } from './types';

export const checkResult = (boardCheck, time, userName, isTip, history) => async dispatch => {
    const response = await axios.post("/sudoku/result", boardCheck, time, userName);
    dispatch({
        type: GET_RESULT,
        payload: response.data
    });
}