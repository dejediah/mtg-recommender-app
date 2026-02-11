import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './components/SearchBar'
import { SearchResultsList } from './components/SearchResultsList'
import { CardGrid } from './components/CardGrid'
import { CardModal } from './components/CardModal'

function App() {
  const [results, setResults] = useState([]);
  const [gridResults, setGridResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const openModal = (card) => setSelectedCard(card);
  const closeModal = () => setSelectedCard(null);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => 
        setLoading(false), 800);
    };

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p className="loading-text">Loading Grimoire...</p>
      </div>
    )
  }
  

  return (
    <div className="App">
      <h1 className="app-title">Decklite: Your MTG Card Combo Finder</h1>
      <div className="search-bar-container">
        <SearchBar setResults={setResults} setGridResults={setGridResults} />
        <SearchResultsList results={results} 
        setResults={setResults} 
        setGridResults={setGridResults}
        setSelectedCard={setSelectedCard} />
      </div>
      <CardGrid cards={gridResults} setSelectedCard={setSelectedCard} />

      {selectedCard && (
        <CardModal card={selectedCard} onClose={closeModal} />
      )}
    </div>
  )
}

export default App
