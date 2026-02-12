import _ from 'lodash';
import { resolvePublicPath } from '../utils/basePath.js';

// Make lodash available globally for js-summarize with compatibility shims
window._ = _;

// Add compatibility for old lodash API (v3 -> v4)
if (!_.contains) {
  _.contains = _.includes;
}

// Add pluck to lodash chain
_.mixin({
  pluck: function(collection, property) {
    return _.map(collection, property);
  }
});

let isLoaded = false;

function loadJsSummarize() {
  return new Promise((resolve, reject) => {
    if (window.JsSummarize) {
      resolve();
      return;
    }
    
    // Load tokenizer first
    const tokenizerScript = document.createElement('script');
    tokenizerScript.src = resolvePublicPath('lib/tokenizer/tokenizer.js');
    tokenizerScript.onload = () => {
      // Then load js-summarize
      const summarizeScript = document.createElement('script');
      summarizeScript.src = resolvePublicPath('js-summarize.js');
      summarizeScript.onload = () => resolve();
      summarizeScript.onerror = () => reject(new Error('Failed to load JS Summarize'));
      document.head.appendChild(summarizeScript);
    };
    tokenizerScript.onerror = () => reject(new Error('Failed to load Tokenizer'));
    document.head.appendChild(tokenizerScript);
  });
}

export const jsSummarize = {
  id: 'js-summarize',
  name: 'JS Summarize',
  description: 'NLP summarizer inspired by PyTeaser. Scores sentences based on title relevance, position, length, and keyword density.',
  parameters: [
    { 
      name: 'returnCount', 
      description: 'Number of sentences to return',
      type: 'number',
      min: 1,
      max: 10,
      default: 3
    },
    { 
      name: 'idealSentenceLength', 
      description: 'Ideal sentence length for scoring (words)',
      type: 'number',
      min: 10,
      max: 40,
      default: 20
    }
  ],
  defaultParams: {
    returnCount: 3,
    idealSentenceLength: 20
  },
  expectedResults: 'Returns sentences ranked by multiple factors including title keywords, position in text, sentence length proximity to ideal, and keyword frequency. Best for news articles and blog posts.',
  
  async summarize(text, params = {}) {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Empty text provided');
      }

      if (!isLoaded) {
        await loadJsSummarize();
        isLoaded = true;
      }

      // Extract a title from first sentence or use generic
      const firstSentence = text.match(/[^.!?]+[.!?]/)?.[0] || 'Article';
      const title = firstSentence.substring(0, 50);

      const summarizer = new window.JsSummarize({
        returnCount: params.returnCount || 3,
        idealSentenceLength: params.idealSentenceLength || 20
      });

      const summary = summarizer.summarize(title, text);
      
      if (!summary || summary.length === 0) {
        throw new Error('No summary generated');
      }

      return { summary: summary.join(' ') };
    } catch (error) {
      throw new Error(`JS Summarize failed: ${error.message}`);
    }
  }
};
