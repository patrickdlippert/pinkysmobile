import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { foods } from './foods';
import { favorites } from './favorites';
import { cart } from './cart';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            foods,
            favorites,
            cart
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}