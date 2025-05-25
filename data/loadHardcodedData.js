// This script exposes hardcoded data globally
document.addEventListener('DOMContentLoaded', function() {
  // Create a script element to load the hardcoded data
  const script = document.createElement('script');
  script.src = './data/hardcodedData.js';
  script.type = 'module';
  
  // When the script loads, make the data available globally
  script.onload = function() {
    // The module is loaded but we need to extract and expose the data
    fetch('./data/hardcodedData.js')
      .then(response => response.text())
      .then(text => {
        // Extract the data object from the module text
        const dataMatch = text.match(/export const hardcodedJobData = ({[\s\S]*})/);
        if (dataMatch && dataMatch[1]) {
          // Create a global reference to the data
          window.hardcodedJobData = eval('(' + dataMatch[1] + ')');
          console.log('Hardcoded data loaded globally');
          
          // Dispatch an event to notify the app
          document.dispatchEvent(new CustomEvent('hardcodedDataLoaded'));
        }
      });
  };
  
  document.head.appendChild(script);
});
