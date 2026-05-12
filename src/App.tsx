import { useState, useEffect } from 'react';
import Header from './components/Header';
import FunctionList from './components/FunctionList';
import FunctionDetail from './components/FunctionDetail';
import { excelFunctions } from './data/functions';
import { ExcelFunction } from './types';
import './App.css';

const FAVORITES_KEY = 'excel-functions-favorites';
const SHOW_FAVORITES_KEY = 'excel-functions-show-favorites';

function App() {
  const [selectedFunction, setSelectedFunction] = useState<ExcelFunction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SHOW_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(SHOW_FAVORITES_KEY, JSON.stringify(showFavoritesOnly));
  }, [showFavoritesOnly]);

  useEffect(() => {
    if (showFavoritesOnly && selectedFunction && !favorites.includes(selectedFunction.id)) {
      setSelectedFunction(null);
    }
  }, [showFavoritesOnly, favorites, selectedFunction]);

  const toggleFavorite = (functionId: string) => {
    setFavorites(prev => 
      prev.includes(functionId)
        ? prev.filter(id => id !== functionId)
        : [...prev, functionId]
    );
  };

  const filteredFunctions = excelFunctions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    const matchesFavorite = !showFavoritesOnly || favorites.includes(func.id);
    return matchesSearch && matchesCategory && matchesFavorite;
  });

  const hasFavorites = favorites.length > 0;
  const showEmptyFavoritesHint = showFavoritesOnly && !hasFavorites;

  return (
    <div className="app">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        showFavoritesOnly={showFavoritesOnly}
        onShowFavoritesChange={setShowFavoritesOnly}
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
            hasFavorites={hasFavorites}
          />
          <FunctionDetail
            function={selectedFunction}
            onClose={() => setSelectedFunction(null)}
            showEmptyFavoritesHint={showEmptyFavoritesHint}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
