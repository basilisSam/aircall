import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import {afterEach, it} from '@jest/globals';
import {MemoryRouter} from 'react-router-dom';
import Navbar from "./NavBar";
import {Tractor} from "@aircall/tractor";

afterEach(cleanup);

it('should render the brand name in the navbar', () => {
    render(<MemoryRouter>
        <Tractor>
            <Navbar/>
        </Tractor>
    </MemoryRouter>);

    screen.getByText('Aircall');
});

it('should render the logout button when logged in', () => {
    render(<MemoryRouter>
        <Tractor>
            <Navbar isLoggedIn={true}/>
        </Tractor>
    </MemoryRouter>);

    screen.getByRole('button', {
        name: "Logout"
    })
});

it('should have no logout button when not loggedIn', () => {
    render(<MemoryRouter>
        <Tractor>
            <Navbar isLoggedIn={false}/>
        </Tractor>
    </MemoryRouter>);

    expect(screen.queryByText('Logout')).toBeNull()
});
