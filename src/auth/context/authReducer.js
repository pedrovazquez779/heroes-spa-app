import {types} from '../types/types';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...state, // in case we have other properties in state
                logged: true,
                user: action.payload,
            };
        case types.logout:
            return {
                logged: false,
            };
        default:
            return state;
    }
};