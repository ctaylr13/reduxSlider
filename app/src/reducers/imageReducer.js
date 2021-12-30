import _ from 'lodash';
import {
    GET_ALL_SLIDES
} from '../actions/types';

// install lodash, allows you to map over objects easier
export default (state = {}, action) => {
    switch (action.type) {
        case GET_ALL_SLIDES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        default:
            return state;
    }
}