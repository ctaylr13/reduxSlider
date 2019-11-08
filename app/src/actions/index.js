import images from '../apis/images';

import { 
    SIGN_IN, 
    SIGN_OUT,
    GET_ALL_SLIDES
} from './types';

// will be used in authreducer
 export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};
// will be used in authreducer
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
// will be used in imagereducer
export const getALLSlides = () => async dispatch => {
    const response = await images.get('/images');
    dispatch({ type: GET_ALL_SLIDES, payload: response.data});
};