function synthesizeSpeech(text) {

    fetch('https://4zrpvylsou2jnnvpodhop5nkq40ftnhw.lambda-url.eu-central-1.on.aws', {
        method: 'POST',
        body: text,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok' );
        }
        return response.blob();
    })
    .then(blob => {
        console.log("here")
        const audioPlayer = document.getElementById('audioPlayer');
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
        audioPlayer.type = "audio/wav"
        // Add an event listener to play the audio after 2 seconds
        audioPlayer.addEventListener('loadeddata', function() {
            setTimeout(function() {
                audioPlayer.play();
            }, 2000); // 2000 milliseconds = 2 seconds
        });
         audioPlayer.addEventListener('ended', function() {
            speechInProgress = false;
            startRecordingButton.disabled = false;
            startListening();
        });
    })
    .catch(error => console.error('Error:', error));
}




