
var myHtml = `
            <head>
                <link rel="stylesheet" href="instadb/css/styles.css">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        overflow: hidden;
                    }

                    #chatbox-container {
                        font-size: small;
                        position: fixed;
                        bottom: 65px;
                        right: 20px;
                        width: 480px;
                        height: 750px;
                        background-color: #fff;
                        border: 1px solid #ccc;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        overflow: hidden;
                        display: none;
                    }

                    #toggle-chatbox-btn {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        padding: 10px;
                    }

                    iframe {
                        width: 100%;
                        height: 100%;
                        border: none;
                    }

                    /* Simple CSS reset to avoid interference from parent styles */
                    .mydivcontent html, body, div, iframe {
                        margin: 0;
                        padding: 0;
                        border: 0;
                        outline: 0;
                        font-size: 100%;
                        vertical-align: baseline;
                        background: transparent;
                    }

                    #toggle-chatbox-btn {
                      display: flex;
                      align-items: center;
                    }

                    .logo {
                      width: 60px; /* Adjust the width of your logo as needed */
                      margin-right: 8px; /* Adjust the margin between the logo and text as needed */
                    }

                </style>
            </head>
            <body>
                <button id="toggle-chatbox-btn" class="btn btn-primary">
                    <img src="logo.png" alt="Logo" class="logo">
                    ИИ помощник
                </button>
                <div id="chatbox-container">
                    <iframe id="gradio-iframe" src="https://belzarena-ffmpeg.hf.space" frameborder="0"></iframe>
                </div>
            </body>        `;
document.getElementById('loadmyapp').innerHTML = myHtml;
    var chatbox = document.getElementById("chatbox-container");
    var button = document.getElementById("toggle-chatbox-btn");

    button.addEventListener("click", function() {
        if (chatbox.style.display === "none" || chatbox.style.display === "") {
            chatbox.style.display = "block";
            button.innerText = "Close Chat";
        } else {
            chatbox.style.display = "none";
            button.innerText = "Open Chat";
        }
    });