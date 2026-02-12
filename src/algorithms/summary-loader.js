// Load summary_minified.js without strict mode by using a script tag
export function loadSummaryJs() {
  return new Promise((resolve, reject) => {
    if (window.summarize) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = '/summary_minified.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Summary.js'));
    document.head.appendChild(script);
  });
}
