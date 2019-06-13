import axios from 'axios';
import { GET_ERRORS, GET_TIP } from './types';

export const getTip = (boardTipArray, history) => async dispatch => {
    console.log("-------------");
    console.log(boardTipArray);
    const res = await axios.post("/sudoku/tip", boardTipArray);
    dispatch({
        type: GET_TIP,
        payload: res.data
    })
}