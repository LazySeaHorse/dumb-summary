export function TextInput({ value, onChange, onSummarize }) {
  return (
    <div class="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
      <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
        Input Text
      </label>
      <textarea
        value={value}
        onInput={(e) => onChange(e.target.value)}
        placeholder="Paste your text here to summarize..."
        class="w-full h-48 px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg 
               bg-white dark:bg-slate-900 text-slate-900 dark:text-white
               focus:ring-2 focus:ring-blue-500 focus:border-transparent
               placeholder:text-slate-400 resize-none"
      />
      <button
        onClick={onSummarize}
        disabled={!value.trim()}
        class="mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 
               disabled:cursor-not-allowed text-white font-semibold rounded-lg
               transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Summarize All
      </button>
    </div>
  );
}
