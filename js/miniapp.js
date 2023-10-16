// Check the stored permission status
const storedPermissionStatus = localStorage.getItem('microphonePermission');

const conversation = document.getElementById("conversation");
const startRecordingButton = document.getElementById("startRecording");
const userInput = document.getElementById("userInput");
const synth = window.speechSynthesis;
startRecordingButton.addEventListener("click", getMicPermission);
startRecordingButton.addEventListener("click", startListening);

let globalPrompt = new Array();
function startListening() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = true;
    startRecordingButton.textContent = "listening"
	console.log("start listening");
    recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const message = lastResult[0].transcript;
        if (lastResult.isFinal) {
            startRecordingButton.textContent = "processing"
            updateConversation(message)
            processMessage(message);
        }
	};

    recognition.start();
}

// Function to request microphone access
async function requestMicrophonePermission() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Store the permission status in localStorage
        localStorage.setItem('microphonePermission', 'granted');
    } catch (error) {
        console.error('Microphone access denied or failed:', error);
        localStorage.setItem('microphonePermission', 'denied');
    }
}

// Event listener for chat button click
function getMicPermission() {
    if (storedPermissionStatus === 'granted') {
        // Microphone access has been granted, proceed with the chat
    } else if (storedPermissionStatus === 'denied') {
        // Microphone access has been denied, display a message to the user
    } else {
        // Microphone access hasn't been requested yet, so request it
        requestMicrophonePermission();
    }
};

function processMessage(message) {
    promptPrepareRequest( message,"user")
         miniAppFetchResponse(globalPrompt).then(() => {
        startListening();
     })
     .catch(error => {
         console.error(error);
         startRecordingButton.textContent = "error"
     });
}

function updateConversation(userInput) {
    conversation.innerHTML = conversation.innerHTML + userInput;
	const convDiv = document.getElementById("conversation");
    convDiv.scrollTop = convDiv.scrollHeight;
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
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


