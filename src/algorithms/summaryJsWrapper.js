import { loadSummaryJs } from './summary-loader.js';

let isLoaded = false;

export const summaryJs = {
  id: 'summary-js',
  name: 'Summary.js',
  description: 'Lightweight LexRank-based summarizer. Scores sentences using keyword frequency and filters out stopwords.',
  parameters: [
    { 
      name: 'sentences', 
      description: 'Number of sentences to return',
      type: 'number',
      min: 1,
      max: 10,
      default: 3
    },
    { 
      name: 'keywordsInt', 
      description: 'Number of keywords to extract',
      type: 'number',
      min: 5,
      max: 20,
      default: 10
    }
  ],
  defaultParams: {
    sentences: 3,
    keywordsInt: 10
  },
  expectedResults: 'Extracts top keywords then ranks sentences by keyword presence. Returns sentences in original order. Works well for general content and provides keyword extraction as bonus.',
  
  async summarize(text, params = {}) {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Empty text provided');
      }

      // Load the library if not already loaded
      if (!isLoaded) {
        await loadSummaryJs();
        isLoaded = true;
      }

      // The summarize function is globally available from the minified file
      const sentenceCount = params.sentences || 3;
      const keywordCount = params.keywordsInt || 10;
      const result = window.summarize(text, sentenceCount, keywordCount);
      
      if (!result || !result.text) {
        throw new Error('No summary generated');
      }

      return { 
        summary: result.text.trim(),
        keywords: result.keywords,
        reductionFactor: result.reductionfactor.toFixed(1) + '%'
      };
    } catch (error) {
      throw new Error(`Summary.js failed: ${error.message}`);
    }
  }
};
