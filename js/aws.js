function synthesizeSpeech(text) {
    processMessage("syn 1");
    fetch('https://4zrpvylsou2jnnvpodhop5nkq40ftnhw.lambda-url.eu-central-1.on.aws', {
        method: 'POST',
        body: text,
    })
    .then(response => {
        if (!response.ok) {
            processMessage("syn error");
            throw new Error('Network response was not ok' );
        }
        return response.blob();
    })
    .then(blob => {
        console.log("here")
          processMessage("syn answer");
        const audioPlayer = document.getElementById('audioPlayer');
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
        audioPlayer.type = "audio/wav"
        // Add an event listener to play the audio after 2 seconds
        audioPlayer.addEventListener('loadeddata', function() {
              processMessage("dataLoaded");
            setTimeout(function() {
                audioPlayer.play();
            }, 5000); // 2000 milliseconds = 2 seconds
        });
         audioPlayer.addEventListener('ended', function() {
            processMessage("data completed");
            speechInProgress = false;
            startRecordingButton.disabled = false;
            startListening();
        });
        processMessage("end of syn");
    })
    .catch(error => console.error('Error:', error));
}




