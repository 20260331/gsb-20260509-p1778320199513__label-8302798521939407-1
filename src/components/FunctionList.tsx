import { ExcelFunction } from '../types';
import './FunctionList.css';

interface FunctionListProps {
  functions: ExcelFunction[];
  selectedFunction: ExcelFunction | null;
  onSelectFunction: (func: ExcelFunction) => void;
  favorites: Set<string>;
  onToggleFavorite: (funcId: string) => void;
}

export default function FunctionList({ functions, selectedFunction, onSelectFunction, favorites, onToggleFavorite }: FunctionListProps) {
  return (
    <div className="function-list">
      <div className="function-list-header">
        <h2>函数列表</h2>
        <span className="function-count">{functions.length} 个函数</span>
      </div>
      <div className="function-items">
        {functions.length === 0 ? (
          <div className="empty-state">
            <p>没有找到匹配的函数</p>
            <p className="empty-hint">尝试调整搜索条件或选择其他分类</p>
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
                <div className="function-item-header-right">
                  <button
                    className={`favorite-btn ${favorites.has(func.id) ? 'favorited' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(func.id);
                    }}
                    title={favorites.has(func.id) ? '取消收藏' : '收藏'}
                  >
                    {favorites.has(func.id) ? '★' : '☆'}
                  </button>
                  <span className="function-category">{func.category}</span>
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
