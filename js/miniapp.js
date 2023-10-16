const conversation = document.getElementById("conversation");
const startRecordingButton = document.getElementById("startRecording");
const userInput = document.getElementById("userInput");
const synth = window.speechSynthesis;
startRecordingButton.addEventListener("click", startListening);
let globalPrompt = new Array();
function startListening() {
    const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
    recognition.interimResults = true;
	console.log("start listening");
	fullMsg = ""
    recognition.onresult = (event) => {
        const lastResult = event.results[event.results.length - 1];
        const message = lastResult[0].transcript;
        fullMsg = fullMsg + "" + message;
        if (lastResult.isFinal) {
            updateConversation(message)
            processMessage(message);
        }
	};

    recognition.start();
}

function processMessage(message) {
    promptPrepareRequest( message,"user")
    miniAppFetchResponse(globalPrompt).then(() => {

        startListening();
     })
     .catch(error => {
         console.error(error);
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


