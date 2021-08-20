import * as ActionTypes from './ActionTypes';
import { LOCATIONS} from '../shared/locations';

export const locations = (state = { isLoading: true,
                                     errMess: null,
                                     locations: LOCATIONS,
                                     selectedLocation: ''}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_LOCATIONS:
            return {...state, isLoading: false, errMess: null, locations: action.payload};

        case ActionTypes.LOCATIONS_LOADING:
            return {...state, isLoading: true, errMess: null, locations: []}

        case ActionTypes.LOCATIONS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        case ActionTypes.SELECT_LOCATION:
            return {...state, isLoading: false, errMess: null, selectedLocation: action.payload};
    
        default:
            return state;
      }
};