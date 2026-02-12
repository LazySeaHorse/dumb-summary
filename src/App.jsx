import { useState } from 'preact/hooks';
import { AlgorithmCell } from './components/AlgorithmCell';
import { TextInput } from './components/TextInput';
import { algorithms } from './algorithms';

export function App() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState({});
  const [algorithmParams, setAlgorithmParams] = useState({});

  const handleParameterChange = (algoId, params) => {
    setAlgorithmParams(prev => ({ ...prev, [algoId]: params }));
  };

  const handleSummarizeOne = async (algoId, params) => {
    if (!inputText.trim()) return;

    const algo = algorithms.find(a => a.id === algoId);
    if (!algo) return;

    setLoading(prev => ({ ...prev, [algoId]: true }));
    
    try {
      const result = await algo.summarize(inputText, params);
      setResults(prev => ({ ...prev, [algoId]: result }));
    } catch (error) {
      setResults(prev => ({ 
        ...prev, 
        [algoId]: { error: error.message } 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [algoId]: false }));
    }
  };

  const handleSummarize = async () => {
    setLoading({});
    setResults({});
    
    const newResults = {};
    const newLoading = {};
    
    for (const algo of algorithms) {
      newLoading[algo.id] = true;
    }
    setLoading(newLoading);

    for (const algo of algorithms) {
      try {
        const params = algorithmParams[algo.id] || {};
        const result = await algo.summarize(inputText, params);
        setResults(prev => ({ ...prev, [algo.id]: result }));
      } catch (error) {
        setResults(prev => ({ 
          ...prev, 
          [algo.id]: { error: error.message } 
        }));
      } finally {
        setLoading(prev => ({ ...prev, [algo.id]: false }));
      }
    }
  };

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div class="container mx-auto px-4 py-8 max-w-7xl">
        <header class="mb-8">
          <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Text Summarization Playground
          </h1>
          <p class="text-slate-600 dark:text-slate-400">
            Compare non-AI text summarization algorithms side by side
          </p>
        </header>

        <TextInput 
          value={inputText}
          onChange={setInputText}
          onSummarize={handleSummarize}
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {algorithms.map(algo => (
            <AlgorithmCell
              key={algo.id}
              algorithm={algo}
              result={results[algo.id]}
              loading={loading[algo.id]}
              onParameterChange={handleParameterChange}
              onSummarize={handleSummarizeOne}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
