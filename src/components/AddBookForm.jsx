import { useState } from 'react';
import axios from 'axios';

const AddBookComponent = () => {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [ano, setAno] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://book-center-api.vercel.app/api/books', { titulo, autor, ano });
      setFeedback({ message: 'Livro adicionado com sucesso!', type: 'success' });
      setTitulo('');
      setAutor('');
      setAno('');
    } catch (error) {
      setFeedback({ message: 'Ocorreu um erro ao adicionar o livro.', type: 'error' });
    }
  };

  return (
    <div className="main-content">
      <h2>Adicionar Novo Livro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />

        <label htmlFor="autor">Autor</label>
        <input
          type="text"
          id="autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />

        <label htmlFor="ano">Ano</label>
        <input
          type="number"
          id="ano"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />

        <button type="submit">Adicionar Livro</button>
      </form>

      {feedback.message && (
        <div className={`form-feedback ${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default AddBookComponent;
