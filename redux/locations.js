import * as ActionTypes from './ActionTypes';
import { LOCATIONS} from '../shared/locations';

export const locations = (state = { isLoading: true,
                                     errMess: null,
                                     locations: LOCATIONS}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LOCATIONS:
            return {...state, isLoading: false, errMess: null, locations: action.payload};

        case ActionTypes.LOCATIONS_LOADING:
            return {...state, isLoading: true, errMess: null, locations: []}

        case ActionTypes.LOCATIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};