import { X, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { ExcelFunction } from '../types';
import InteractiveDemo from './InteractiveDemo';
import './FunctionDetail.css';

interface FunctionDetailProps {
  function: ExcelFunction | null;
  onClose: () => void;
  showEmptyFavoritesHint?: boolean;
}

export default function FunctionDetail({ function: func, onClose, showEmptyFavoritesHint }: FunctionDetailProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (showEmptyFavoritesHint) {
    return (
      <div className="function-detail empty">
        <div className="empty-state">
          <h2>⭐ 还没有收藏任何函数</h2>
          <p>先去收藏一些常用函数吧，点击函数卡片上的 ☆ 按钮即可收藏</p>
          <p className="empty-hint">收藏后可以在这里快速访问它们</p>
        </div>
      </div>
    );
  }

  if (!func) {
    return (
      <div className="function-detail empty">
        <div className="empty-state">
          <h2>👈 选择一个函数开始学习</h2>
          <p>从左侧列表中选择一个Excel函数，查看详细的语法、参数说明和示例</p>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="function-detail">
      <div className="detail-header">
        <div>
          <h1 className="detail-title">{func.name}</h1>
          <span className="detail-category">{func.category}</span>
        </div>
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      <div className="detail-section">
        <h2>📖 函数说明</h2>
        <p className="detail-description">{func.description}</p>
      </div>

      <div className="detail-section">
        <h2>📝 语法</h2>
        <div className="syntax-box">
          <code className="syntax-code">{func.syntax}</code>
          <button
            className="copy-btn"
            onClick={() => copyToClipboard(func.syntax, -1)}
            title="复制语法"
          >
            {copiedIndex === -1 ? <Check size={16} /> : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="detail-section">
        <h2>🔧 参数说明</h2>
        <div className="parameters-list">
          {func.parameters.map((param, index) => (
            <div key={index} className="parameter-item">
              <div className="parameter-header">
                <code className="parameter-name">{param.name}</code>
                <span className={`parameter-type ${param.required ? 'required' : 'optional'}`}>
                  {param.type}
                </span>
              </div>
              <p className="parameter-description">{param.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="detail-section">
        <h2>💡 示例演示</h2>
        <div className="examples-list">
          {func.examples.map((example, index) => (
            <div key={index} className="example-item">
              <div className="example-header">
                <h3 className="example-title">{example.description}</h3>
                <button
                  className="copy-btn small"
                  onClick={() => copyToClipboard(example.formula, index)}
                  title="复制公式"
                >
                  {copiedIndex === index ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <div className="example-formula">
                <code>{example.formula}</code>
              </div>
              <div className="example-result">
                <span className="result-label">结果：</span>
                <span className="result-value">{example.result}</span>
              </div>
              <p className="example-explanation">{example.explanation}</p>
            </div>
          ))}
        </div>
      </div>

      {func.tips && func.tips.length > 0 && (
        <div className="detail-section">
          <h2>💡 使用技巧</h2>
          <ul className="tips-list">
            {func.tips.map((tip, index) => (
              <li key={index} className="tip-item">{tip}</li>
            ))}
          </ul>
        </div>
      )}

      <InteractiveDemo func={func} />
    </div>
  );
}
