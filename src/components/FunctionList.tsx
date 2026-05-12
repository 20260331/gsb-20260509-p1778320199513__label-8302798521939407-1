import { Star } from 'lucide-react';
import { ExcelFunction } from '../types';
import './FunctionList.css';

interface FunctionListProps {
  functions: ExcelFunction[];
  selectedFunction: ExcelFunction | null;
  onSelectFunction: (func: ExcelFunction) => void;
  favorites: Set<string>;
  onToggleFavorite: (funcId: string) => void;
  showFavoritesOnly: boolean;
  onToggleShowFavorites: () => void;
}

export default function FunctionList({ 
  functions, 
  selectedFunction, 
  onSelectFunction,
  favorites,
  onToggleFavorite,
  showFavoritesOnly,
  onToggleShowFavorites
}: FunctionListProps) {
  const handleFavoriteClick = (e: React.MouseEvent, funcId: string) => {
    e.stopPropagation();
    onToggleFavorite(funcId);
  };

  return (
    <div className="function-list">
      <div className="function-list-header">
        <h2>函数列表</h2>
        <div className="function-list-header-right">
          <span className="function-count">{functions.length} 个函数</span>
          <button
            className={`favorite-filter-btn ${showFavoritesOnly ? 'active' : ''}`}
            onClick={onToggleShowFavorites}
            title={showFavoritesOnly ? '显示全部函数' : '只显示收藏'}
          >
            <Star size={16} fill={showFavoritesOnly ? '#fbbf24' : 'none'} color={showFavoritesOnly ? '#fbbf24' : 'currentColor'} />
            <span>收藏</span>
          </button>
        </div>
      </div>
      <div className="function-items">
        {functions.length === 0 ? (
          <div className="empty-state">
            <p>{showFavoritesOnly ? '还没有收藏任何函数' : '没有找到匹配的函数'}</p>
            <p className="empty-hint">{showFavoritesOnly ? '点击函数旁的星标收藏常用函数' : '尝试调整搜索条件或选择其他分类'}</p>
          </div>
        ) : (
          functions.map(func => (
            <div
              key={func.id}
              className={`function-item ${selectedFunction?.id === func.id ? 'active' : ''}`}
              onClick={() => onSelectFunction(func)}
            >
              <div className="function-item-header">
                <h3 className="function-name">{func.name}</h3>
                <div className="function-item-actions">
                  <span className="function-category">{func.category}</span>
                  <button
                    className={`favorite-btn ${favorites.has(func.id) ? 'favorited' : ''}`}
                    onClick={(e) => handleFavoriteClick(e, func.id)}
                    title={favorites.has(func.id) ? '取消收藏' : '收藏'}
                  >
                    <Star size={16} fill={favorites.has(func.id) ? '#fbbf24' : 'none'} color={favorites.has(func.id) ? '#fbbf24' : 'currentColor'} />
                  </button>
                </div>
              </div>
              <p className="function-description">{func.description}</p>
              <div className="function-meta">
                <span className="function-examples-count">
                  {func.examples.length} 个示例
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
