import { useState, useEffect } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import { ExcelFunction } from '../types';
import './InteractiveDemo.css';

interface InteractiveDemoProps {
  func: ExcelFunction;
}

export default function InteractiveDemo({ func }: InteractiveDemoProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 当函数切换时，重置所有状态
  useEffect(() => {
    setInputs({});
    setResult('');
    setError('');
  }, [func.id]);

  // 简单的函数计算逻辑（演示用）
  const calculateResult = () => {
    setError('');
    try {
      switch (func.id) {
        case 'sum':
          const sumValues = Object.values(inputs)
            .filter(v => v)
            .map(v => parseFloat(v) || 0);
          if (sumValues.length === 0) {
            setError('请输入至少一个数字');
            return;
          }
          setResult(sumValues.reduce((a, b) => a + b, 0).toString());
          break;
        
        case 'average':
          const avgValues = Object.values(inputs)
            .filter(v => v)
            .map(v => parseFloat(v) || 0);
          if (avgValues.length === 0) {
            setError('请输入至少一个数字');
            return;
          }
          const avg = avgValues.reduce((a, b) => a + b, 0) / avgValues.length;
          setResult(avg.toFixed(2));
          break;
        
        case 'max':
          const maxValues = Object.values(inputs)
            .filter(v => v)
            .map(v => parseFloat(v) || 0);
          if (maxValues.length === 0) {
            setError('请输入至少一个数字');
            return;
          }
          setResult(Math.max(...maxValues).toString());
          break;
        
        case 'min':
          const minValues = Object.values(inputs)
            .filter(v => v)
            .map(v => parseFloat(v) || 0);
          if (minValues.length === 0) {
            setError('请输入至少一个数字');
            return;
          }
          setResult(Math.min(...minValues).toString());
          break;
        
        case 'if':
          const condition = inputs.condition || '';
          const trueValue = inputs.trueValue || '';
          const falseValue = inputs.falseValue || '';
          if (!condition || !trueValue || !falseValue) {
            setError('请填写所有条件值');
            return;
          }
          // 简单的条件判断：如果condition是数字，判断是否>0
          const condValue = parseFloat(condition);
          if (!isNaN(condValue)) {
            setResult(condValue > 0 ? trueValue : falseValue);
          } else {
            setResult(condition ? trueValue : falseValue);
          }
          break;
        
        default:
          setResult('该函数的交互演示功能正在开发中...');
      }
    } catch (err) {
      setError('计算错误，请检查输入值');
    }
  };

  const resetDemo = () => {
    setInputs({});
    setResult('');
    setError('');
  };

  // 根据函数类型生成输入框
  const renderInputs = () => {
    if (func.id === 'sum' || func.id === 'average' || func.id === 'max' || func.id === 'min') {
      return (
        <div className="demo-inputs">
          <label>输入数字（用逗号分隔或分别输入）：</label>
          <div className="number-inputs">
            {[1, 2, 3, 4].map(i => (
              <input
                key={i}
                type="number"
                placeholder={`数字 ${i}`}
                value={inputs[`num${i}`] || ''}
                onChange={(e) => setInputs({ ...inputs, [`num${i}`]: e.target.value })}
                className="demo-input"
              />
            ))}
          </div>
        </div>
      );
    }
    
    if (func.id === 'if') {
      return (
        <div className="demo-inputs">
          <label>条件值：</label>
          <input
            type="text"
            placeholder="例如: 60"
            value={inputs.condition || ''}
            onChange={(e) => setInputs({ ...inputs, condition: e.target.value })}
            className="demo-input"
          />
          <label>条件为真时返回：</label>
          <input
            type="text"
            placeholder="例如: 及格"
            value={inputs.trueValue || ''}
            onChange={(e) => setInputs({ ...inputs, trueValue: e.target.value })}
            className="demo-input"
          />
          <label>条件为假时返回：</label>
          <input
            type="text"
            placeholder="例如: 不及格"
            value={inputs.falseValue || ''}
            onChange={(e) => setInputs({ ...inputs, falseValue: e.target.value })}
            className="demo-input"
          />
        </div>
      );
    }

    return (
      <div className="demo-placeholder">
        <p>该函数的交互演示功能正在开发中...</p>
        <p className="demo-hint">请查看上方的示例了解如何使用此函数</p>
      </div>
    );
  };

  return (
    <div className="interactive-demo">
      <div className="demo-header">
        <h2>🎮 交互式演示</h2>
        <p>输入参数值，实时查看函数计算结果</p>
      </div>
      
      {renderInputs()}
      
      {(func.id === 'sum' || func.id === 'average' || func.id === 'max' || func.id === 'if' || func.id === 'min') && (
        <>
          <div className="demo-actions">
            <button className="btn btn-primary" onClick={calculateResult}>
              <Play size={16} />
              计算
            </button>
            <button className="btn btn-secondary" onClick={resetDemo}>
              <RotateCcw size={16} />
              重置
            </button>
          </div>
          
          {error && (
            <div className="demo-error">
              ⚠️ {error}
            </div>
          )}
          
          {result && !error && (
            <div className="demo-result">
              <div className="result-label">计算结果：</div>
              <div className="result-value">{result}</div>
              <div className="result-formula">
                ={func.name}({Object.values(inputs).filter(v => v).join(', ')})
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
