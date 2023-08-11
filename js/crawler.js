// Function to load the text content of a website
function loadWebsiteText(url) {
  // Use the fetch API to make the HTTP request
  return fetch(url)
    .then((response) => {
      // Check if the request was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Return the text content of the response
      return response.text();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Usage example:
const websiteUrl = 'https://lilia.by/about'; // Replace with the desired website URL
loadWebsiteText(websiteUrl)
  .then((textContent) => {
    console.log('Text content:', textContent);
    // You can use the textContent variable here for further processing
  });
