import {fireEvent, render, screen} from '@testing-library/react';
import {SearchPage} from '../../../src/heroes';
import {MemoryRouter} from 'react-router-dom';


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useNavigate: () => mockedUseNavigate,
    })
);



describe('Testing <SearchPage />', () => {

    beforeEach(() => jest.clearAllMocks());

    test('Should match snapshot', () => {
        const {container} = render(
            <MemoryRouter>
                <SearchPage/>
            </MemoryRouter>
        );

        expect(container).toMatchSnapshot();
    });

    test('Should show Batman and input should have the same value', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg');

        const searchHeroAlert = screen.getByLabelText('search-hero-alert');
        expect(searchHeroAlert.style.display).toBe('none');
    });

    test('Should show error when hero is not found', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman123');

        const searchHeroAlert = screen.getByLabelText('search-hero-danger');
        expect(searchHeroAlert.style.display).toBe('');
    });

    test('Should navigate on form submit', () => {
        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        // name should match the name of the element in jsx
        fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}})

        // const btnSearch = screen.getByText('Search');
        // fireEvent.click(btnSearch);

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockedUseNavigate).toBeCalledWith('?q=superman');
    });
});