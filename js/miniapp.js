// Check the stored permission status
const storedPermissionStatus = localStorage.getItem('microphonePermission');

const conversation = document.getElementById("conversation");
const startRecordingButton = document.getElementById("startRecording");
const userInput = document.getElementById("userInput");

let speech = new SpeechSynthesisUtterance();
startRecordingButton.addEventListener("click", startListening);

let globalPrompt = new Array();
function startListening() {

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = false;
    recognition.continuous = true;
    startRecordingButton.disabled = true;
    startRecordingButton.textContent = "listening"
	console.log("start listening");
    recognition.onresult = (event) => {

        const lastResult = event.results[event.results.length - 1];
                console.log(lastResult);
        const message = lastResult[0].transcript;
        if (lastResult.isFinal) {
            startRecordingButton.textContent = "processing"
            updateConversation("User: "  + message + "</br>")
            processMessage(message);
        }
	};

    recognition.start();
}

function processMessage(message) {
    promptPrepareRequest( message,"user")
    miniAppFetchResponse(globalPrompt)
    .then(result => {
        startRecordingButton.textContent = "message received"
      }).catch(error => {
         console.error(error);
         startRecordingButton.textContent = "error"
     });
}

function updateConversation(userInput) {
    conversation.innerHTML = conversation.innerHTML + userInput;
	const convDiv = document.getElementById("conversation");
    convDiv.scrollTop = convDiv.scrollHeight;
}
let speechInProgress = false;

function disableUserInteraction() {
  if (startRecordingButton) {
    startRecordingButton.textContent = "answering..."
    startRecordingButton.disabled = true;
  }
}


function speak(text) {
  if (speechInProgress) {
    return; // Prevent multiple speech requests
  }

  speechInProgress = true;
  disableUserInteraction();

//  const speech = new SpeechSynthesisUtterance(text);

//  speech.onend = () => {
//    speechInProgress = false;
//    startRecordingButton.disabled = false;
//    startListening();
//  };

   synthesizeSpeech(text);

//  speech.text = text;

//  window.speechSynthesis.speak(speech);
}


function initializeGlobalPrompt(){
  globalPrompt.length = 0;
    globalPrompt = [{
      role: 'system',
      content: 'You are a helpful assistant.'
    }];
}
initializeGlobalPrompt();
function promptPrepareRequest(prompt, role){
  globalPrompt.push({
      role: role,
      content: prompt
    });
}
function promptPrepareRequestStream(prompt, role){
   globalPrompt[globalPrompt.length-1].role = role;
   globalPrompt[globalPrompt.length-1].content = prompt;
}

