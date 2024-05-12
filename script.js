// Get the form and result elements
const form = document.getElementById('shorten-form');
const resultElement = document.getElementById('result');

// Set up the Bitly API credentials
const bitlyApiKey = 'YOUR_BITLY_API';
const bitlyApiUsername = 'YOUR_BITLY_USERNAME';

// Set up the API endpoint and headers
const apiEndpoint = 'https://api-ssl.bitly.com/v4/shorten';
const headers = {
  'Authorization': `Bearer ${bitlyApiKey}`,
  'Content-Type': 'application/json'
};

// Add an event listener to the form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // Get the URL to shorten from the input field
  const urlToShorten = document.getElementById('url').value.trim();

  // Check if the URL is valid
  if (!urlToShorten || !isValidUrl(urlToShorten)) {
    resultElement.textContent = 'Invalid URL';
    return;
  }

  // Make the API request to shorten the URL
  try {
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        long_url: urlToShorten,
        domain: 'bit.ly'
      })
    });

    const data = await response.json();

    // Display the shortened URL
    resultElement.textContent = `Shortened URL: ${data.link}`;
  } catch (error) {
    resultElement.textContent = `Error: ${error.message}`;
  }
});

// Helper function to validate URLs
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

