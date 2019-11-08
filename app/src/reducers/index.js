import { combineReducers } from 'redux';
import authReducer from './authReducers';
import imageReducer from './imageReducer';

export default combineReducers({
    auth: authReducer,
    image: imageReducer
});