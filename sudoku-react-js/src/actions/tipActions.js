import axios from 'axios';
import { GET_TIP } from './types';

export const getTip = (boardTipArray, history) => async dispatch => {
    const res = await axios.post("/sudoku/tip", boardTipArray);
    dispatch({
        type: GET_TIP,
        payload: res.data
    });
}