import { useState, useEffect } from 'react';
import Header from './components/Header';
import FunctionList from './components/FunctionList';
import FunctionDetail from './components/FunctionDetail';
import { excelFunctions } from './data/functions';
import { ExcelFunction } from './types';
import './App.css';

const FAVORITES_STORAGE_KEY = 'excel-functions-favorites';
const SHOW_FAVORITES_STORAGE_KEY = 'excel-functions-show-favorites';

function App() {
  const [selectedFunction, setSelectedFunction] = useState<ExcelFunction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored)) : new Set();
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(() => {
    const stored = localStorage.getItem(SHOW_FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify([...favorites]));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(SHOW_FAVORITES_STORAGE_KEY, JSON.stringify(showFavoritesOnly));
  }, [showFavoritesOnly]);

  const toggleFavorite = (funcId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(funcId)) {
        next.delete(funcId);
      } else {
        next.add(funcId);
      }
      return next;
    });
  };

  const filteredFunctions = excelFunctions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.has(func.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  useEffect(() => {
    if (selectedFunction && !filteredFunctions.some(func => func.id === selectedFunction.id)) {
      setSelectedFunction(null);
    }
  }, [filteredFunctions, selectedFunction]);

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <main className="main-content">
        <div className="content-wrapper">
          <FunctionList
            functions={filteredFunctions}
            selectedFunction={selectedFunction}
            onSelectFunction={setSelectedFunction}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            showFavoritesOnly={showFavoritesOnly}
            onToggleShowFavorites={() => setShowFavoritesOnly(prev => !prev)}
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
