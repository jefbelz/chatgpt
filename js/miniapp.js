// Check the stored permission status
const storedPermissionStatus = localStorage.getItem('microphonePermission');
userLanguage = navigator.language;
const conversation = document.getElementById("conversation");
const startRecordingButton = document.getElementById("startRecording");
const userInput = document.getElementById("userInput");
let speechInProgress = false;
startRecordingButton.addEventListener("click", startListening);
translationData = "";
welcomeMsg = "";
fetchTranslation(userLanguage).then(result =>{
    translationData = result;
    translateContent(translationData);
    welcomeMsg = getTranslation("webapp.welcome")
    welcomeDiv = document.getElementById("welcomediv");
    welcomeDiv.innerHTML = welcomeMsg;
});



let globalPrompt = new Array();
let welcomeMsgSpoke = false
function startListening() {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.pause()
    if(welcomeMsgSpoke == false){
        welcomeMsgSpoke = true;
        speak(welcomeMsg)
    }

    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.lang = getBCP47LanguageCode(userLanguage);
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
            processMessage(message + " always answer to me in this i18n language: " + userLanguage);
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

function disableUserInteraction() {
  if (startRecordingButton) {
    startRecordingButton.textContent = "answering..."
    startRecordingButton.disabled = true;
  }
}

function enableUserInteraction(){
    speechInProgress = false;
    startRecordingButton.disabled = false;
    startListening();
}

function speak(text) {
  if (speechInProgress) {
    return; // Prevent multiple speech requests
  }

  speechInProgress = true;
  disableUserInteraction();
   try {
        let speech = new SpeechSynthesisUtterance();
        speech.lang = getBCP47LanguageCode(userLanguage);
        speech.text = text;
        window.speechSynthesis.speak(speech);
        speechInProgress = false;
     } catch(error){
       synthesizeSpeech(text);
     }

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



