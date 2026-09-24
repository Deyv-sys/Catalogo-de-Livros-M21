import { useState } from 'react';
import BookForm from './components/BookForm/BookForm';
import BookList from './components/BookList/BookList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <span className="eyebrow">Catálogo Social</span>
          <h1>Livros que<br /><em>ficam</em> na sua mente.</h1>
          <p>Organize suas próximas descobertas, leituras em andamento e histórias já vividas.</p>
        </div>
        <div className="hero-mark" aria-hidden="true">✦</div>
      </header>

      <div className="content-grid">
        <BookForm onBookAdded={() => setRefreshKey((key) => key + 1)} />
        <BookList refreshKey={refreshKey} />
      </div>
    </main>
  );
}

export default App;