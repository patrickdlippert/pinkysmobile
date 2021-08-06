import * as ActionTypes from './ActionTypes';
import { FLAVORS } from '../shared/flavors';

export const flavors = (state = { isLoading: true,
                                     errMess: null,
                                     flavors: FLAVORS}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FLAVORS:
            return {...state, isLoading: false, errMess: null, flavors: action.payload};

        case ActionTypes.FLAVORS_LOADING:
            return {...state, isLoading: true, errMess: null, flavors: []}

        case ActionTypes.FLAVORS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};