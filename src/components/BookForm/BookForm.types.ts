import { FormEvent } from 'react';
import { Book, NewBook, BookStatus } from '../../../types/Book';

export interface BookFormProps {
	onBookAdded: (book: Book) => void;
}

export interface BookFormState {
	title: string;
	author: string;
	status: BookStatus;
}

export type BookFormSubmitEvent = FormEvent<HTMLFormElement>;
export type BookFieldChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type BookFormSubmit = (book: NewBook) => Promise<void>;
