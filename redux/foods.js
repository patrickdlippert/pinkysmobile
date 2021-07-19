import * as ActionTypes from './ActionTypes';
import { FOODS } from '../shared/foods';

export const foods = (state = { isLoading: true,
                                     errMess: null,
                                     foods: FOODS}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FOODS:
            return {...state, isLoading: false, errMess: null, foods: action.payload};

        case ActionTypes.FOODS_LOADING:
            return {...state, isLoading: true, errMess: null, foods: []}

        case ActionTypes.FOODS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
            return state;
      }
};