// Check the stored permission status
const storedPermissionStatus = localStorage.getItem('microphonePermission');
const audioPlayer = document.getElementById('audioPlayer');
recognition = "";
try {
     recognition = new SpeechRecognition();
}catch(error) {
    recognition = new webkitSpeechRecognition() ;
}
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
        try {
            let speech = new SpeechSynthesisUtterance();
        } catch (error){
            audioPlayer.play();
        }
        welcomeMsgSpoke = true;
        speak(welcomeMsg);
    } else {
        console.log("start listening");
        startRecordingButton.disabled = true;
        startRecordingButton.textContent = "listening"
        try {
             recognition.start();
        }
        playBeep()
    }
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
         recognition.stop();
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
    startRecordingButton.textContent = "answering..."
    startRecordingButton.disabled = true;
//    try{
//        recognition.stop();
//    } catch(error){}
}

function enableUserInteraction(){
    speechInProgress = false;
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
        speech.addEventListener('end', function(event) {
            console.log("Speech has finished speaking.");
            enableUserInteraction()
        });

        window.speechSynthesis.speak(speech);
        speechInProgress = false;
     } catch(error){
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

if (localStorage.getItem('microphonePermission') === 'granted' ) {
} else {
  // Permission was not granted previously, ask for permission
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (stream) {
       localStorage.setItem('microphonePermission', 'granted');
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
const audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Create an audio context
function playBeep() {
    try{
        const oscillator = audioContext.createOscillator(); // Create an oscillator
        oscillator.type = 'sine'; // Set the oscillator type to sine wave (simple tone)
        oscillator.frequency.setValueAtTime(500, audioContext.currentTime); // Set the frequency in Hz
        oscillator.connect(audioContext.destination); // Connect the oscillator to the audio output
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.1); // Stop the oscillator after 0.5 seconds
    } catch(error) {
        console.log("cant play bip");
    }
}
setupRecognition()

document.addEventListener("DOMContentLoaded", function () {
    const musicDiv = document.getElementById("musicTest");
    const playButton = document.getElementById("startRecording");
    const audioPlayer = document.getElementById("audioPlayer");

    playButton.addEventListener("click", function () {
        audioPlayer.play();
    });
});
