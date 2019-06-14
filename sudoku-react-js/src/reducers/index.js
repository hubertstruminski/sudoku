import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import boardReducer from './boardReducer';
import tipReducer from './tipReducer';

export default combineReducers({
    errors: errorReducer,
    board: boardReducer,
    boardTip: tipReducer
});