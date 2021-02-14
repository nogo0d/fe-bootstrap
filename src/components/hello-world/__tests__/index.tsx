import React from 'react';
import { render, screen } from '@testing-library/react';
import { option } from 'fp-ts';
import { HelloWorld } from '../component';

test('renders Hello World of RXJS', () => {
	render(<HelloWorld label={option.some('of RXJS')} />);
	const coisasLindas = screen.getByText(/Hello World of RXJS/i);
	expect(coisasLindas).toBeInTheDocument();
});
