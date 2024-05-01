$(document).ready(function() {
    $('#registrationForm').submit(function(event) {
        event.preventDefault();

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: 'register.php',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                $('#registrationMessage').text(response);
            }
        });
    });
});
