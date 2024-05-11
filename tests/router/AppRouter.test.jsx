import {render, screen} from '@testing-library/react';
import {AuthContext} from '../../src/auth';
import {MemoryRouter} from 'react-router-dom';
import {AppRouter} from '../../src/router/AppRouter';

describe('Testing <AppRouter />', () => {
    test('Should show login if not authenticated', () => {
        const contextValue = {
            logged: false,
        };

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getAllByText('Login').length).toBe(2);
    });

    test('Should show marvel if authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'testuser',
                id: 'ABC',
            }
        };

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', {level: 1}).innerHTML).toBe('Marvel Comics');
    });
});