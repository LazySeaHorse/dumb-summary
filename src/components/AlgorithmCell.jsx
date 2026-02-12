import { useState } from 'preact/hooks';

export function AlgorithmCell({ algorithm, result, loading, onParameterChange, onSummarize }) {
  const [params, setParams] = useState(algorithm.defaultParams || {});

  const handleParamChange = (paramName, value) => {
    const newParams = { ...params, [paramName]: value };
    setParams(newParams);
    if (onParameterChange) {
      onParameterChange(algorithm.id, newParams);
    }
  };

  return (
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 flex flex-col">
      <div class="mb-4">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {algorithm.name}
        </h3>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-3">
          {algorithm.description}
        </p>
        
        <div class="space-y-2">
          <details class="group" open>
            <summary class="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 
                           hover:text-blue-700 dark:hover:text-blue-300 list-none flex items-center gap-2">
              <span class="group-open:rotate-90 transition-transform">▶</span>
              Parameters
            </summary>
            <div class="mt-3 pl-6 space-y-3">
              {algorithm.parameters.map(param => (
                <div key={param.name} class="space-y-1">
                  <label class="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <span class="font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                      {param.name}
                    </span>
                    <span class="text-blue-600 dark:text-blue-400 font-semibold">
                      {params[param.name] ?? param.default}
                    </span>
                  </label>
                  <p class="text-xs text-slate-500 dark:text-slate-400 mb-1">
                    {param.description}
                  </p>
                  {param.type === 'number' && (
                    <input
                      type="range"
                      min={param.min}
                      max={param.max}
                      step={param.step || 1}
                      value={params[param.name] ?? param.default}
                      onInput={(e) => handleParamChange(param.name, parseFloat(e.target.value))}
                      class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  )}
                  {param.type === 'select' && (
                    <select
                      value={params[param.name] ?? param.default}
                      onChange={(e) => handleParamChange(param.name, e.target.value)}
                      class="w-full px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg"
                    >
                      {param.options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>
          </details>

          <details class="group">
            <summary class="cursor-pointer text-sm font-semibold text-blue-600 dark:text-blue-400 
                           hover:text-blue-700 dark:hover:text-blue-300 list-none flex items-center gap-2">
              <span class="group-open:rotate-90 transition-transform">▶</span>
              Expected Results
            </summary>
            <p class="mt-2 pl-6 text-sm text-slate-700 dark:text-slate-300">
              {algorithm.expectedResults}
            </p>
          </details>
        </div>
      </div>

      <div class="flex-1 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between mb-2">
          <h4 class="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Summary Output
          </h4>
          <button
            onClick={() => onSummarize && onSummarize(algorithm.id, params)}
            class="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Run
          </button>
        </div>
        {loading ? (
          <div class="flex items-center justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : result?.error ? (
          <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p class="text-sm text-red-600 dark:text-red-400">
              Error: {result.error}
            </p>
          </div>
        ) : result ? (
          <div class="space-y-2">
            <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <p class="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                {result.summary || result}
              </p>
            </div>
            {result.keywords && (
              <div class="text-xs text-slate-500 dark:text-slate-400">
                Keywords: {result.keywords.join(', ')}
              </div>
            )}
            {result.reductionFactor && (
              <div class="text-xs text-slate-500 dark:text-slate-400">
                Reduction: {result.reductionFactor}
              </div>
            )}
          </div>
        ) : (
          <div class="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p class="text-sm text-slate-400 italic">
              No summary yet. Enter text and click "Run"
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
