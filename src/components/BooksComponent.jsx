import { useState, useEffect } from 'react';
import axios from 'axios';

const BooksComponent = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editBook, setEditBook] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://book-center-api.vercel.app/api/books');
      setBooks(response.data);
    } catch (error) {
      setError('Ocorreu um erro ao carregar os livros.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://book-center-api.vercel.app/api/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      setError('Ocorreu um erro ao excluir o livro.');
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setShowUpdateForm(true);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="books-list">
      <h2>Lista de Livros</h2>
      <ul>
        {books.map(book => (
          <li key={book.id} className="book-item">
            <span>{book.titulo} - {book.autor} ({book.ano})</span>
            <button onClick={() => handleEdit(book)} className="edit-btn">
              Atualizar
            </button>
            <button onClick={() => handleDelete(book.id)} className="delete-btn">
              Excluir
            </button>
          </li>
        ))}
      </ul>
      {showUpdateForm && <UpdateBookForm book={editBook} fetchBooks={fetchBooks} />}
    </div>
  );
};

const UpdateBookForm = ({ book, fetchBooks }) => {
  const [titulo, setTitulo] = useState(book.titulo);
  const [autor, setAutor] = useState(book.autor);
  const [ano, setAno] = useState(book.ano);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`https://book-center-api.vercel.app/api/books/${book.id}`, { titulo, autor, ano });
      fetchBooks(); 
    } catch (error) {
      setError('Ocorreu um erro ao atualizar o livro.');
    }
  };

  return (
    <div className="update-form">
      <h3>Atualizar Livro</h3>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        </label>
        <label>
          Autor:
          <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} required />
        </label>
        <label>
          Ano:
          <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} required />
        </label>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default BooksComponent;
