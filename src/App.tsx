import { useState } from 'react';
import Header from './components/Header';
import FunctionList from './components/FunctionList';
import FunctionDetail from './components/FunctionDetail';
import { excelFunctions } from './data/functions';
import { ExcelFunction } from './types';
import './App.css';

function App() {
  const [selectedFunction, setSelectedFunction] = useState<ExcelFunction | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredFunctions = excelFunctions.filter(func => {
    const matchesSearch = func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         func.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || func.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
