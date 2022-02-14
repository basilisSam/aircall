import Login from "./Login";
import {MemoryRouter} from "react-router-dom";
import React from "react";

import {render,screen} from '@testing-library/react'
import {Tractor} from "@aircall/tractor";


test('should show login form', () => {
    render(<MemoryRouter>
        <Tractor>
            <Login/>
        </Tractor>
    </MemoryRouter>)

    screen.getByLabelText('Username')
    screen.getByLabelText('Password')
    screen.getByRole('button', {
        name: "Login"
    })
})