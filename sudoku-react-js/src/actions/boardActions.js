import axios from 'axios';
import { GET_BOARD } from './types';

export const generateBoard = (history) => async dispatch => {
    const res = await axios.get("/sudoku");
    dispatch({
        type: GET_BOARD,
        payload: res.data
    });
}