import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import boardReducer from './boardReducer';

export default combineReducers({
    errors: errorReducer,
    board: boardReducer
});