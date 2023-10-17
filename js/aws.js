function synthesizeSpeech(text) {
    fetch('https://4zrpvylsou2jnnvpodhop5nkq40ftnhw.lambda-url.eu-central-1.on.aws', {
        method: 'POST',
        body: text,
    })
    .then(response => {
        if (!response.ok) {
            updateConversation("syn error");
            throw new Error('Network response was not ok' );
        }
        return response.blob();
    })
    .then(blob => {
        console.log("here")
        const audioPlayer = document.getElementById('audioPlayer');
        const audioUrl = URL.createObjectURL(blob);
        audioPlayer.src = audioUrl;
        audioPlayer.type = "audio/mp3"
        // Add an event listener to play the audio after 2 seconds
        audioPlayer.addEventListener('loadeddata', function() {
            setTimeout(function() {
                audioPlayer.play();
            }, 1000); // 2000 milliseconds = 2 seconds
        });
         audioPlayer.addEventListener('ended', function() {
            enableUserInteraction();
        });
        audioPlayer.addEventListener('error', function(e) {
            const error = e.target.error;
            switch (error.code) {
                case MediaError.MEDIA_ERR_ABORTED:
                    console.error('The playback was aborted.');
                    updateConversation("The playback was aborted.</br>");
                    break;
                case MediaError.MEDIA_ERR_NETWORK:
                    console.error('A network error caused the audio download to fail.');
                updateConversation("A network error caused the audio download to fail.</br>");
                    break;
                case MediaError.MEDIA_ERR_DECODE:
                    console.error('An error occurred while decoding the audio.');
                    updateConversation("An error occurred while decoding the audio.</br>");
                    break;
                case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
                    console.error('The audio source is not supported.');
                     updateConversation("The audio source is not supported.</br>");
                    break;
                default:
                    console.error('An unknown error occurred.');
                     updateConversation("An unknown error occurred.</br>");
                    break;
            }
            speechInProgress = false;
        });
    })
    .catch(error => console.error('Error:', error));
}




