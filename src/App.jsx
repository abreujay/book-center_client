import { useState } from 'react';
import bookLogo from '../public/open-magazine.png';
import './App.css';
import BooksComponent from './components/BooksComponent';
import AddBookForm from './components/AddBookForm';

function App() {
  const [showBooks, setShowBooks] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleToggleBooks = () => {
    setShowBooks(!showBooks);
  };

  const handleAddBookClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>Book Center Admin</h1>
          <div className="logo">
            <img src={bookLogo} alt="Logo" />
          </div>
        </div>
      </header>
      <main>
        <div className="main-content">
          <button className="toggle-form-btn" onClick={handleAddBookClick}>
            {showForm ? 'Cancelar' : 'Adicionar Livro'}
          </button>
          {showForm && <AddBookForm />}
          <button className="toggle-books-btn" onClick={handleToggleBooks}>
            {showBooks ? 'Ocultar Livros' : 'Visualizar Livros'}
          </button>
          {showBooks && <BooksComponent />}
        </div>
      </main>
    </div>
  );
}

export default App;
