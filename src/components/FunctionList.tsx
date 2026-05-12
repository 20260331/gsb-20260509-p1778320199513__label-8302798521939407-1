import { ExcelFunction } from '../types';
import './FunctionList.css';

interface FunctionListProps {
  functions: ExcelFunction[];
  selectedFunction: ExcelFunction | null;
  onSelectFunction: (func: ExcelFunction) => void;
  favorites: string[];
  onToggleFavorite: (functionId: string) => void;
  showFavoritesOnly: boolean;
  hasFavorites: boolean;
}

export default function FunctionList({ functions, selectedFunction, onSelectFunction, favorites, onToggleFavorite, showFavoritesOnly, hasFavorites }: FunctionListProps) {
  const handleFavoriteClick = (e: React.MouseEvent, functionId: string) => {
    e.stopPropagation();
    onToggleFavorite(functionId);
  };

  const renderEmptyState = () => {
    if (showFavoritesOnly && !hasFavorites) {
      return (
        <div className="empty-state">
          <p>⭐ 还没有收藏任何函数</p>
          <p className="empty-hint">关闭"只显示收藏"，点击函数卡片上的 ☆ 按钮开始收藏</p>
        </div>
      );
    }
    if (showFavoritesOnly && hasFavorites) {
      return (
        <div className="empty-state">
          <p>收藏的函数中没有匹配结果</p>
          <p className="empty-hint">尝试调整搜索条件或选择其他分类</p>
        </div>
      );
    }
    return (
      <div className="empty-state">
        <p>没有找到匹配的函数</p>
        <p className="empty-hint">尝试调整搜索条件或选择其他分类</p>
      </div>
    );
  };

  return (
    <div className="function-list">
      <div className="function-list-header">
        <h2>函数列表</h2>
        <span className="function-count">{functions.length} 个函数</span>
      </div>
      <div className="function-items">
        {functions.length === 0 ? (
          renderEmptyState()
        ) : (
          functions.map(func => (
            <div
              key={func.id}
              className={`function-item ${selectedFunction?.id === func.id ? 'active' : ''}`}
              onClick={() => onSelectFunction(func)}
            >
              <div className="function-item-header">
                <div className="function-name-wrapper">
                  <h3 className="function-name">{func.name}</h3>
                  <button
                    className={`favorite-btn ${favorites.includes(func.id) ? 'active' : ''}`}
                    onClick={(e) => handleFavoriteClick(e, func.id)}
                    aria-label={favorites.includes(func.id) ? '取消收藏' : '收藏'}
                  >
                    {favorites.includes(func.id) ? '★' : '☆'}
                  </button>
                </div>
                <span className="function-category">{func.category}</span>
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
