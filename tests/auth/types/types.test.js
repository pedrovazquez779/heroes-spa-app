import {types} from '../../../src/auth';

describe('Tests on types', () => {
    test('Should return the following types', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        });
    });

});