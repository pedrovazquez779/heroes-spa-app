import {render, screen} from '@testing-library/react';
import {PublicRoute} from '../../src/router/PublicRoute';
import {AuthContext} from '../../src/auth';
import {MemoryRouter, Route, Routes} from 'react-router-dom';

describe('Testing <PublicRoute />', () => {
    test('Should show children if user not authenticated', () => {
        const contextValue = {
            logged: false
        };

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Public route</h1> {/*This is my children now*/}
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Public route')).toBeTruthy();
    });

    test('Should navigate if user is authenticated', () => {
        const contextValue = {
            logged: true,
            user: {
                name: 'testuser',
                id: 'ABC'
            }
        };

        // We define the routes
        // User is at login
        // PublicRoute return detects he is authenticated
        // Force the navigation to Marvel page
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Public route</h1>
                            </PublicRoute>
                        }/>
                        <Route path="marvel" element={<h1>Marvel Page</h1>}/>
                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Marvel Page')).toBeTruthy();
    });
});