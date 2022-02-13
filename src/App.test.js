import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { afterEach, it } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import NavBar from '../src/componets/NavBar';

afterEach(cleanup);

it('should render the navbar', () => {
  const { getByText } = render(<MemoryRouter><NavBar /></MemoryRouter>);
  getByText('Aircall');
});

describe('Addition', () => {
  it('knows that 2 and 2 make 4', () => {
    expect(2 + 2).toBe(4);
  });
});