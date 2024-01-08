  async function fetchResponseAsStream(prompt) {
//    const key = await getKey();
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace this with the actual API endpoint
      showWaitingModal(true);
      promptPrepareRequest(prompt, "user");
      promptPrepareRequest("", "system");
//      fetch(apiUrl, {
//        method: 'POST',
//        headers: {
//          'Content-Type': 'application/json',
//          'Authorization': 'Bearer ' + decrypt(atob("bGlsaXlh"), key)
//        },
//        body: JSON.stringify({
//          "model": "gpt-3.5-turbo-16k",
//          "stream": true,
//          "messages": globalPrompt
//        })
//      })
      fetch("https://pis2lv2ircq2xvryj5bdkblnfa0rspzc.lambda-url.eu-central-1.on.aws/", {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          globalPrompt
        })
      })
      .then(response => {
          const reader = response.body.getReader();
        function readStream() {
        let contentFinalResult = "";
          return reader.read().then(({ done, value }) => {
                  // Check if the response is a readable stream
          //        if (!response.body) {
          //          throw new Error('Readable streams not supported in this browser.');
          //        }
//                  let contentFinalResult = "";
//
//          //        let jsonString = new TextDecoder().decode(response).replace(/data:\s*/g, '');
//                    contentFinalResult = response.body
//                    promptPrepareRequestStream(contentFinalResult, "system");
//                   displayResponse();
//                  closeWaitingModal();
//                   activateChat(true);
//
            if (done) {
              console.log('Stream is done.'); // End of the stream
              closeWaitingModal();
              displayResponse();
              activateChat(true);
              return;
            }
            let jsonString = new TextDecoder().decode(value).replace(/data:\s*/g, '');
            promptPrepareRequestStream(jsonString, "system");
            displayResponse();
//            try {
//              // Process data as it arrives
////              let jsonString = new TextDecoder().decode(value).replace(/data:\s*/g, '');
//
////              var dataAux = jsonString.split("}]}")
//               let jsonString = JSON.parse(new TextDecoder().decode(value).replace(/data:\s*/g, ''));
//               contentFinalResult = jsonString.body
//
////              dataAux.forEach( data=> {
////                  data = data.trim() + "}]}";
////                  if (data.length > "10") {
////                    var parsedContent = JSON.parse(data);
////                    const content = parsedContent.choices[0].delta.content.replace("undefined","");
////                    contentFinalResult += content;
////                  }
////              });
//              promptPrepareRequestStream(contentFinalResult, "system");
//              displayResponse();
//              // Continue reading the stream
//            } catch(error){
//              console.log("");
//            }
            return readStream();
          });
        }
//
        return readStream();
      })
      .catch(error => {
        console.error('Error:', error);
        promptPrepareRequestStream("we had a problem processing the request, please try again: " + error, "system");
        displayResponse();
        closeWaitingModal();
        activateChat(true);
      });
      displayResponse();
    }

async function miniAppFetchResponse(prompt) {
  const key = await getKey();
  updateConversation("AnswerMeAi: ")
  promptPrepareRequest("", "system");
  const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace this with the actual API endpoint
  fetch(apiUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + decrypt(atob("bGlsaXlh"), key)

    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo-16k",
      "stream": true,
      "messages": prompt
    })
  })
  .then(response => {
    // Check if the response is a readable stream
    if (!response.body) {
      throw new Error('Readable streams not supported in this browser.');
    }
    const reader = response.body.getReader();
    let contentFinalResult = "";
    function readStream() {
      return reader.read().then(({ done, value }) => {
        if (done) {
          promptPrepareRequestStream(contentFinalResult, "system");
          speak(contentFinalResult);
          updateConversation("</br>")
          console.log('Stream is done.'); // End of the stream
          return contentFinalResult;
        }
        try {
          // Process data as it arrives
          let jsonString = new TextDecoder().decode(value).replace(/data:\s*/g, '');
          var dataAux = jsonString.split("}]}")

          dataAux.forEach( data=> {
              data = data.trim() + "}]}";
              if (data.length > "10") {
                var parsedContent = JSON.parse(data);
                const content = parsedContent.choices[0].delta.content.replace("undefined","");
                contentFinalResult += content;
                updateConversation(content.replace("\n", "</br>"))
              }
          });
          // Continue reading the stream
        } catch(error){
          console.log("");
        }
        return readStream();
      });
    }

    return readStream();
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

