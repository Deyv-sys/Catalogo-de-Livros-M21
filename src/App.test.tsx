import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

test('exibe o catálogo de livros', async () => {
	jest.mocked(axios.get).mockResolvedValue({ data: [] });

	render(<App />);

	expect(screen.getByRole('heading', { name: /livros que/i })).toBeInTheDocument();
	expect(await screen.findByText(/sua estante ainda está vazia/i)).toBeInTheDocument();
});

