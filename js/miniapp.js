// Check the stored permission status
const storedPermissionStatus = localStorage.getItem('microphonePermission');
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
userLanguage = navigator.language;
const conversation = document.getElementById("conversation");
const startRecordingButton = document.getElementById("startRecording");
const userInput = document.getElementById("userInput");
let speechInProgress = false;
startRecordingButton.addEventListener("click", startListening);
translationData = "";
welcomeMsg = "";
fetchTranslation(getI18nCode(userLanguage)).then(result =>{
    translationData = result;
    translateContent(translationData);
    welcomeMsg = getTranslation("webapp.welcome")
    welcomeDiv = document.getElementById("welcomediv");
    welcomeDiv.innerHTML = welcomeMsg;
});



let globalPrompt = new Array();
let welcomeMsgSpoke = false
function startListening() {
    if(welcomeMsgSpoke == false){
        welcomeMsgSpoke = true;
        speak(welcomeMsg)
    }
    console.log("start listening");
    startRecordingButton.disabled = true;
    startRecordingButton.textContent = "listening"
    recognition.start();
}

function setupRecognition(){
    recognition.lang = getBCP47LanguageCode(userLanguage);
    recognition.interimResults = false;
    recognition.continuous = true;
     recognition.onresult = (event) => {
       const lastResult = event.results[event.results.length - 1];
       console.log(lastResult);
       const message = lastResult[0].transcript;
       if (lastResult.isFinal) {
         startRecordingButton.textContent = "processing"
         updateConversation("User: "  + message + "</br>")
         processMessage(message + " ,always answer to me in this i18n language: " + userLanguage + "you don't need to tell me you get this command to answer me.");
       }
     };
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
       const audioPlayer = document.getElementById('audioPlayer');
       try {
          audioPlayer.start()
       } catch (error) {
          console.log("start of audio failed")
       }
      try {
         audioPlayer.pause()
      } catch (error) {
         console.log("stop of audio failed")
      }

       synthesizeSpeech(text, getBCP47LanguageCode(userLanguage));
     }

}


// Check if permission was granted from your stored data
if (localStorage.getItem('microphonePermission') === 'granted' ) {
  // Permission was granted, and you have recorded it on disk
  // You can proceed without requesting permission again
} else {
  // Permission was not granted previously, ask for permission
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
      // Handle the microphone stream
      // Store permission in localStorage or your server
      localStorage.setItem('microphonePermission', 'granted');
      // Update the server or cookie as needed
    })
    .catch(function (error) {
      console.error('Microphone access denied:', error);
    });
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
  function playBeep() {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioContext.createOscillator();
    oscillator.type = "sine"; // Sine wave for a simple tone
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency in Hz (A4)
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2); // Stop the tone after 0.2 seconds
  }


setupRecognition()