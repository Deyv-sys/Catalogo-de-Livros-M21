import { useState } from 'react';
import { BookItemProps } from './BookItem.types';

function BookItem({ book, onRemove }: BookItemProps) {
	const [isRemoving, setIsRemoving] = useState(false);

	const handleRemove = async () => {
		setIsRemoving(true);
		await onRemove(book._id);
		setIsRemoving(false);
	};

	return (
		<article className="book-item">
			<div className="book-cover" aria-hidden="true">{book.title.charAt(0).toUpperCase()}</div>
			<div className="book-details">
				<h3>{book.title}</h3>
				<p>{book.author}</p>
				<span className={`status status-${book.status.toLowerCase().replace(/\s/g, '-')}`}>
					{book.status}
				</span>
			</div>
			<button
				className="remove-button"
				type="button"
				onClick={handleRemove}
				disabled={isRemoving}
				aria-label={`Remover ${book.title}`}
			>
				{isRemoving ? '...' : 'Remover'}
			</button>
		</article>
	);
}

export default BookItem;
