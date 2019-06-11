import axios from 'axios';
import GET_ERRORS from './types';

export const generateBoard = (history) => async dispatch => {
    try {
        const response = await axios.get("/sudoku");
        console.log(response);
    } catch(error) {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        })
    }
}