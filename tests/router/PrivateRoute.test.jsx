import {render, screen} from '@testing-library/react';
import {AuthContext} from '../../src/auth';
import {PrivateRoute} from '../../src/router/PrivateRoute';
import {MemoryRouter} from 'react-router-dom';

describe('Testing <PrivateRoute />', () => {
    test('Should show children if user is authenticated', () => {
        // This is overriding the prototype implementation
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'testuser',
                id: 'ABC',
            }
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Private route</h1> {/*This is my children now*/}
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Private route')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/');
    });
});