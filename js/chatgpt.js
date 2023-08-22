   function fetchResponseAsStream(prompt) {
      key = getKey();
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace this with the actual API endpoint
      showWaitingModal(true);
      promptPrepareRequest(prompt, "user");
      promptPrepareRequest("", "system");
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
//          'Authorization': 'Bearer ' + decrypt(atob("bGlsaXlh"), "6b7335712175487b74705c2971685d6f5c514c79505b734c2b5a747a735e5229497b574c2a7c5461294d4e5f6f4e7575415f20")
            'Authorization': 'Bearer ' + decrypt(atob("bGlsaXlh"), key)
//            'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo-16k",
          "stream": true,
          "messages": globalPrompt
        })
      })
      .then(response => {
        // Check if the response is a readable stream
        if (!response.body) {
          throw new Error('Readable streams not supported in this browser.');
        }
        console.log(globalPrompt);
        const reader = response.body.getReader();
        let contentFinalResult = "";
        function readStream() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream is done.'); // End of the stream
              promptPrepareRequestStream(contentFinalResult, "system");
              displayResponse();
              closeWaitingModal();
              activateChat(true);
              return;
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
                  }
              });
              promptPrepareRequestStream(contentFinalResult, "system");
              displayResponse();
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
        promptPrepareRequestStream("we had a problem processing the request, please try again: " + error, "system");
        displayResponse();
        closeWaitingModal();
        activateChat(true);
      });
      displayResponse();
    }
