import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FunctionList from './components/FunctionList';
import FunctionDetail from './components/FunctionDetail';
import { excelFunctions } from './data/functions';
import { ExcelFunction } from './types';
import './App.css';

const FAVORITES_KEY = 'excel-favorites';

function loadFavorites(): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (raw) {
      return new Set(JSON.parse(raw) as string[]);
    }
  } catch {}
  return new Set();
}

function saveFavorites(favorites: Set<string>) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
}

function App() {
  const [selectedFunction, setSelectedFunction] = useState<ExcelFunction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(loadFavorites);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = useCallback((funcId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(funcId)) {
        next.delete(funcId);
      } else {
        next.add(funcId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (showFavoritesOnly && selectedFunction && !favorites.has(selectedFunction.id)) {
      setSelectedFunction(null);
    }
  }, [showFavoritesOnly, favorites, selectedFunction]);

  const filteredFunctions = excelFunctions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.has(func.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={setShowFavoritesOnly}
      />
      <main className="main-content">
        <div className="content-wrapper">
          <FunctionList
            functions={filteredFunctions}
            selectedFunction={selectedFunction}
            onSelectFunction={setSelectedFunction}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
          <FunctionDetail
            function={selectedFunction}
            onClose={() => setSelectedFunction(null)}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
