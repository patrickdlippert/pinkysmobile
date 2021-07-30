import * as ActionTypes from './ActionTypes';

export const cart = (state = { isLoading: true,
    errMess: null,
    total: 0,
    cartItems: []}, action) => {

/*export const cart = (state = [], action) => { */
    switch (action.type) {


        case ActionTypes.ADD_CART_ITEM:
           const index = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id); // find if food item is already in cart
           if(index >= 0) {
                const newArray = [...state.cartItems]; // make a new copy of shopping cart array
                newArray[index].quantity++;
                return {...state, cartItems: newArray,  total: state.total + parseFloat(action.payload.price) };
           }
           /* Otherwise, new food item is being added to the cart */    
           const newCartItem = {
                id: action.payload.id,
                quantity: 1
            };
            return {...state, cartItems: state.cartItems.concat(newCartItem), total: state.total + parseFloat(action.payload.price)  }; 
           /*return {...state, cartItems: state.cartItems.concat(action.payload.id), total: state.total + parseFloat(action.payload.price)  }; */

        case ActionTypes.DELETE_CART_ITEM:
            /* Check to see if the food item needs to be decremented or removed completely if the new quantity is zero */
            const index2 = state.cartItems.findIndex(cartItem => cartItem.id === action.payload.id); // find food item in cart
            if (state.cartItems[index2].quantity > 1) {
                const newArray = [...state.cartItems]; // make a new copy of shopping cart array
                newArray[index2].quantity--;
                return {...state, cartItems: newArray,  total: state.total - parseFloat(action.payload.price) };
            }
            /* Remove the entire food item from the cart */
            return {...state, cartItems: state.cartItems.filter(cartitem => cartitem.id !== action.payload.id), total: state.total - parseFloat(action.payload.price)};

        case ActionTypes.DROP_CART:
            return {...state, cartItems: [], total: 0 };

 
        default:
            return state;
      }
};
