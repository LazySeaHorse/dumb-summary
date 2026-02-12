# Text Summarization Playground

A modern, Jupyter-like interface for comparing non-AI text summarization algorithms side-by-side. Built with Vite, Preact, and Tailwind CSS v4.

## Features

- **Clean, Modern UI**: Inspired by Jupyter notebooks with a contemporary, responsive design
- **Multiple Algorithms**: Compare different summarization approaches simultaneously
- **Interactive Parameter Controls**: Adjust algorithm parameters in real-time with sliders and dropdowns
- **Individual & Batch Processing**: Run algorithms individually or all at once
- **Dark Mode**: Automatic dark mode support
- **No Backend Required**: All processing happens client-side in the browser

## Algorithms Included

### 1. Summer (TextRank)
**Source**: [luileito/summer](https://github.com/luileito/summer)

Graph-based summarization using the TextRank algorithm (inspired by PageRank). Identifies central sentences through similarity graphs.

**Adjustable Parameters:**
- Number of sentences (1-10)
- Algorithm selection (TextRank/NaiveRank)
- Skip sentences with min/max word counts

**Best for**: Academic papers, technical documentation, longer texts

---

### 2. JS Summarize
**Source**: [wkallhof/js-summarize](https://github.com/wkallhof/js-summarize)

NLP summarizer inspired by PyTeaser. Scores sentences using multiple factors including title relevance, position, length, and keyword density.

**Adjustable Parameters:**
- Number of sentences to return (1-10)
- Ideal sentence length for scoring (10-40 words)

**Best for**: News articles, blog posts, content with clear titles

---

### 3. Summary.js
**Source**: [Lian-D/Summary.js](https://github.com/Lian-D/Summary.js)

Lightweight LexRank-based summarizer using keyword frequency scoring with stopword filtering.

**Adjustable Parameters:**
- Number of sentences (1-10)
- Number of keywords to extract (5-20)

**Best for**: General content, provides keyword extraction as bonus

---

### 4. SMMRY API (Placeholder)
External API integration example using CORS proxy (requires API key).

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to the URL shown (typically http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

1. Paste or type text into the input area
2. Adjust parameters for each algorithm using the sliders and dropdowns
3. Click individual "Run" buttons to test specific algorithms
4. Or click "Summarize All" to run all algorithms at once
5. Compare the outputs side-by-side

## Architecture

- **Vite**: Lightning-fast build tool and dev server
- **Preact**: Lightweight React alternative (4KB)
- **Tailwind CSS v4**: Utility-first CSS framework
- **Modular Design**: Each algorithm is a separate module with wrapper
- **Dynamic Loading**: Libraries loaded on-demand via script tags

## Project Structure

```
text-summarizer-playground/
├── public/                    # Static assets & algorithm libraries
│   ├── summer.min.js         # Summer library
│   ├── js-summarize.js       # JS Summarize library
│   ├── summary_minified.js   # Summary.js library
│   └── lib/                  # Supporting libraries (tokenizer)
├── src/
│   ├── algorithms/           # Algorithm wrappers
│   │   ├── summerWrapper.js
│   │   ├── jsSummarizeWrapper.js
│   │   ├── summaryJsWrapper.js
│   │   ├── smmryAPI.js
│   │   └── index.js
│   ├── components/           # UI components
│   │   ├── AlgorithmCell.jsx
│   │   └── TextInput.jsx
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── index.html
├── vite.config.js
└── package.json
```

## Adding New Algorithms

1. Add the library file to the `public/` folder
2. Create a wrapper in `src/algorithms/`:

```javascript
export const myAlgorithm = {
  id: 'unique-id',
  name: 'Display Name',
  description: 'Brief description',
  parameters: [
    { 
      name: 'param1', 
      description: 'What it does',
      type: 'number', // or 'select'
      min: 1,
      max: 10,
      default: 5
    }
  ],
  defaultParams: {
    param1: 5
  },
  expectedResults: 'What to expect from this algorithm',
  async summarize(text, params = {}) {
    // Your implementation
    return { summary: 'result' };
  }
};
```

3. Import and add to `src/algorithms/index.js`

## CORS Proxy

For external APIs, the project uses AllOrigins (https://api.allorigins.win) as a CORS proxy. Alternatives:
- https://corsproxy.io
- https://cors.lol
- Your own CORS proxy server

## Credits

This project integrates the following open-source libraries:

- **Summer** by Luis Leiva - [GitHub](https://github.com/luileito/summer) - MIT License
- **JS Summarize** by Wade Kallhoff - [GitHub](https://github.com/wkallhof/js-summarize) - MIT License
- **Summary.js** by Lian Duan - [GitHub](https://github.com/Lian-D/Summary.js)

Special thanks to the authors of these libraries for making text summarization accessible in JavaScript.

## License

MIT

## Contributing

Contributions are welcome! Feel free to:
- Add new summarization algorithms
- Improve the UI/UX
- Add more parameter controls
- Enhance documentation
- Report bugs or suggest features
