import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api';
import { Book, BookStatus } from '../../../types/Book';
import {
	BookFieldChangeEvent,
	BookFormProps,
	BookFormState,
	BookFormSubmitEvent,
} from './BookForm.types';

const initialState: BookFormState = {
	title: '',
	author: '',
	status: 'Quero ler',
};

function BookForm({ onBookAdded }: BookFormProps) {
	const [form, setForm] = useState<BookFormState>(initialState);
	const [error, setError] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (event: BookFieldChangeEvent) => {
		const { name, value } = event.target;
		setForm((currentForm) => ({ ...currentForm, [name]: value } as BookFormState));
	};

	const handleSubmit = async (event: BookFormSubmitEvent) => {
		event.preventDefault();
		setError('');
		setIsSubmitting(true);

		try {
			const response = await axios.post<Book>(API_URL, form);
			onBookAdded(response.data);
			setForm(initialState);
		} catch {
			setError('Não foi possível cadastrar o livro. Tente novamente.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<form className="book-form" onSubmit={handleSubmit}>
			<div className="form-heading">
				<span className="eyebrow">Nova entrada</span>
				<h2>Adicionar um livro</h2>
			</div>

			<label htmlFor="title">Título</label>
			<input
				id="title"
				name="title"
				value={form.title}
				onChange={handleChange}
				placeholder="Ex.: Cem anos de solidão"
				required
			/>

			<label htmlFor="author">Autor</label>
			<input
				id="author"
				name="author"
				value={form.author}
				onChange={handleChange}
				placeholder="Ex.: Gabriel García Márquez"
				required
			/>

			<label htmlFor="status">Status</label>
			<select
				id="status"
				name="status"
				value={form.status}
				onChange={handleChange}
			>
				{(['Quero ler', 'Lendo', 'Lido'] as BookStatus[]).map((status) => (
					<option key={status} value={status}>{status}</option>
				))}
			</select>

			{error && <p className="form-error" role="alert">{error}</p>}
			<button className="primary-button" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Salvando...' : 'Adicionar livro'}
			</button>
		</form>
	);
}

export default BookForm;
