import * as ActionTypes from './ActionTypes';

export const cart = (state = { isLoading: true,
    errMess: null,
    total: 0,
    cartItems: []}, action) => {

/*export const cart = (state = [], action) => { */
    switch (action.type) {


        case ActionTypes.ADD_CART_ITEM:
            return {...state, cartItems: state.cartItems.concat(action.payload.id), total: state.total + parseFloat(action.payload.price)  };


        case ActionTypes.DELETE_CART_ITEM:
            return {...state, cartItems: state.cartItems.filter(cartitem => cartitem !== action.payload)};

        case ActionTypes.DROP_CART:
            return {...state, cartItems: [], total: 0 };

 
        default:
            return state;
      }
};