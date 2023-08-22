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
      return "6b733572296174737d56555a6860525e544141206b6a7e4c2b5a747a735e526e2f2c4f6b774c594248402d5e61412d5d77557b";
}