import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../api';
import { Book } from '../../../types/Book';
import BookItem from '../BookItem/BookItem';
import { BookListProps } from './BookList.types';

function BookList({ refreshKey }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      setError('');

      try {
        const response = await axios.get<Book[]>(API_URL);
        setBooks(response.data);
      } catch {
        setError('Não foi possível carregar os livros.');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchBooks();
  }, [refreshKey]);

  const handleRemove = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setBooks((currentBooks) => currentBooks.filter((book) => book._id !== id));
    } catch {
      setError('Não foi possível remover o livro.');
    }
  };

  return (
    <section className="book-list" aria-labelledby="book-list-title">
      <div className="list-heading">
        <div>
          <span className="eyebrow">Sua estante</span>
          <h2 id="book-list-title">Livros catalogados</h2>
        </div>
        {!isLoading && <span className="book-count">{books.length} {books.length === 1 ? 'livro' : 'livros'}</span>}
      </div>

      {error && <p className="request-error" role="alert">{error}</p>}
      {isLoading && <p className="empty-state">Carregando sua estante...</p>}
      {!isLoading && !error && books.length === 0 && (
        <p className="empty-state">Sua estante ainda está vazia. Adicione a primeira leitura.</p>
      )}
      <div className="books-grid">
        {books.map((book) => <BookItem key={book._id} book={book} onRemove={handleRemove} />)}
      </div>
    </section>
  );
}

export default BookList;