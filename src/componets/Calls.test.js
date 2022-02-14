import React from 'react';
import {cleanup, render, screen} from '@testing-library/react';
import {afterEach, it} from '@jest/globals';
import {MemoryRouter} from 'react-router-dom';
import {Tractor} from "@aircall/tractor";
import Calls from "./Calls";

afterEach(cleanup);

const callsProps = [{id: "someId", from: "123"}, {id: "anotherId", from: "456"}]

it('should render multiple child components', () => {
    render(<MemoryRouter>
        <Tractor>
            <Calls calls={callsProps} archiveCall={jest.fn()}/>
        </Tractor>
    </MemoryRouter>);

    callsProps.forEach(call => {
        const allByText = screen.getByText(call.from);
        expect(allByText).toBeInTheDocument()
    })
});