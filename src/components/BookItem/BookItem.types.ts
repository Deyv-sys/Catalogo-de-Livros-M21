import { Book } from '../../../types/Book';

export interface BookItemProps {
	book: Book;
	onRemove: (id: string) => Promise<void>;
}
