import * as ActionTypes from './ActionTypes';
/*import { baseUrl } from '../shared/baseUrl';


export const fetchFoods = () => dispatch => {

    dispatch(foodsLoading());

    return fetch(baseUrl + 'foods')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(foods => dispatch(addFoods(foods)))
        .catch(error => dispatch(foodsFailed(error.message)));
};

export const foodsLoading = () => ({
    type: ActionTypes.FOODS_LOADING
});

export const foodsFailed = errMess => ({
    type: ActionTypes.FOODS_FAILED,
    payload: errMess
});

export const addFoods = foods => ({
    type: ActionTypes.ADD_FOODS,
    payload: foods
});
*/

export const postFavorite = foodId => dispatch => {
    setTimeout(() => {
        dispatch(addFavorite(foodId));
    }, 500);
};

export const addFavorite = foodId => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: foodId
});

export const deleteFavorite = foodId => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: foodId
});



export const postCartItem = foodItem => dispatch => {
    setTimeout(() => {
        dispatch(addCartItem(foodItem));
    }, 500);
};

export const addCartItem = foodItem => ({
    type: ActionTypes.ADD_CART_ITEM,
    payload: foodItem
});

export const deleteCartItem = foodId => ({
    type: ActionTypes.DELETE_CART_ITEM,
    payload: foodId
});

export const dropCart = () => ({
    type: ActionTypes.DROP_CART,
    payload: null
});
