import {fireEvent, render, screen} from '@testing-library/react';
import {Navbar} from '../../../src/ui';
import {AuthContext} from '../../../src/auth';
import {MemoryRouter} from 'react-router-dom';

const mockedUseNavigate = jest.fn();

// I need to partially mock the library, so that's why:
// 1st I need to spread the real behaviour using jest.requireActual
// 2nd only override useNavigate with my mocked function
jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUseNavigate,
    })
);

describe('Testing <Navbar />', () => {
    const contextValue = {
        logged: true,
        user: {
            name: 'testuser',
            id: 'ABC',
        },
        logout: jest.fn()
    };

    beforeEach(() => jest.clearAllMocks());

    test('Should show username', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect(screen.getByLabelText('username').innerHTML).toBe('testuser');
    });

    test('Should call logout and navigate when clicking logout button', () => {
        render(
            <MemoryRouter>
                <AuthContext.Provider value={contextValue}>
                    <Navbar/>
                </AuthContext.Provider>
            </MemoryRouter>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click(logoutBtn);

        expect(contextValue.logout).toHaveBeenCalled();
        expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {replace: true});
    });
});