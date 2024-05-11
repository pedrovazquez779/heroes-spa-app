import {authReducer, types} from '../../../src/auth';

describe('Tests on authReducer', () => {
    test('Should return default state', () => {
        const initialState = {};
        const newState = authReducer(initialState, {});

        expect(newState).toBe(initialState);
    });

    test('Should call login action', () => {
        const initialState = {
            logged: false
        };
        const user = {
            name: 'someuser',
            id: 'ABC'
        };
        const action = {
            type: types.login,
            payload: user,
        };
        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeTruthy();
        expect(newState.user).toBe(user);
    });

    test('Should call logout action', () => {
        const initialState = {
            logged: true,
            user: {}
        };
        const action = {
            type: types.logout,
        };
        const newState = authReducer(initialState, action);

        expect(newState.logged).toBeFalsy();
        expect(newState.user).toBeUndefined();
    });
});
