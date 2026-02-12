// Load summer from public folder
let isLoaded = false;

function loadSummer() {
  return new Promise((resolve, reject) => {
    if (window.Summer) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = '/summer.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Summer'));
    document.head.appendChild(script);
  });
}

export const summer = {
  id: 'summer',
  name: 'Summer (TextRank)',
  description: 'Responsive text summarization using TextRank algorithm. Graph-based approach using PageRank on sentence similarity.',
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
      name: 'algorithm',
      description: 'Summarization algorithm to use',
      type: 'select',
      options: ['TextRank', 'NaiveRank'],
      default: 'TextRank'
    },
    {
      name: 'skipMinWords',
      description: 'Skip sentences with fewer words',
      type: 'number',
      min: 0,
      max: 20,
      default: 0
    },
    {
      name: 'skipMaxWords',
      description: 'Skip sentences with more words',
      type: 'number',
      min: 0,
      max: 100,
      default: 0
    }
  ],
  defaultParams: {
    sentences: 3,
    algorithm: 'TextRank',
    skipMinWords: 0,
    skipMaxWords: 0
  },
  expectedResults: 'Uses PageRank-style algorithm to identify central sentences. Excellent for longer texts and academic content. Preserves sentence order and handles complex documents well.',
  
  async summarize(text, params = {}) {
    try {
      if (!text || text.trim().length === 0) {
        throw new Error('Empty text provided');
      }

      if (!isLoaded) {
        await loadSummer();
        isLoaded = true;
      }

      // Create a temporary container
      const container = document.createElement('div');
      container.style.display = 'none';
      container.textContent = text;
      document.body.appendChild(container);

      // Use Summer's standalone mode
      window.Summer.standalone = true;
      window.Summer.algorithm = params.algorithm === 'NaiveRank' ? window.NaiveRank : window.TextRank;
      window.Summer.skipMinWords = params.skipMinWords || 0;
      window.Summer.skipMaxWords = params.skipMaxWords || 0;
      
      // Get sentences using Summer
      const sentences = window.Summer.getSentences(container, false);
      
      // Rank and get top sentences
      const sentenceCount = params.sentences || 3;
      const ranked = window.Summer.rankSentences(container, sentenceCount);
      
      // Clean up
      document.body.removeChild(container);
      
      if (!ranked || ranked.length === 0) {
        throw new Error('No summary generated');
      }

      return { 
        summary: ranked.join(' '),
        totalSentences: sentences.length,
        selectedSentences: ranked.length
      };
    } catch (error) {
      throw new Error(`Summer failed: ${error.message}`);
    }
  }
};
