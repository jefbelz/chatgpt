$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Prevent form submission

        var username = $('#username').val();
        $.ajax({
            type: 'GET',
            url: 'https://zvo3uegtkk4lhnc7jtzabf6hdq0egsyx.lambda-url.eu-central-1.on.aws/?action=login&email=' + username, // Change to your server-side script for handling login

            success: function(response) {
                if (response[0].approved) {
                    $('#loginMessage').text('Login successful!');
                    // Redirect to dashboard or another page
                    window.location.href ="reels.html?email="+ username;  // Change to your dashboard page
                } else {
                    $('#loginMessage').text('Invalid username or password. Please try again.');
                }
            }
        });
    });
});
