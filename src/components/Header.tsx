import { Search } from 'lucide-react';
import { categories } from '../data/functions';
import './Header.css';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function Header({ searchQuery, onSearchChange, selectedCategory, onCategoryChange }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>📊 Excel函数学习助手</h1>
          <p>轻松学会Excel函数，从小白到高手</p>
        </div>
        <div className="header-search">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="搜索函数名称或描述..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => onCategoryChange(cat.id)}
              style={{ '--category-color': cat.color } as React.CSSProperties}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
