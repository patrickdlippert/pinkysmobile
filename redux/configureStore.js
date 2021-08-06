import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { foods } from './foods';
import { flavors } from './flavors';
import { favorites } from './favorites';
import { cart } from './cart';
import { locations } from './locations';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            foods,
            flavors,
            favorites,
            cart,
            locations
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}