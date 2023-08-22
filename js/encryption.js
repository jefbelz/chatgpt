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
      console.log(response.json())
        // Check if the response status is OK (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Parse the JSON response
      })
      .then(data => {
        // Here, 'data' contains the parsed JSON response
        // You can access and work with the data here
        console.log(data);
      })
      .catch(error => {
        console.error("Fetch error:", error);
      });
      return "6b7335536a214e4c7a2c5b542b2c4060765071517d6c504c2b5a747a735e522b554f73485b625c2d5d7d4d20482c69727a2a5c";
}


