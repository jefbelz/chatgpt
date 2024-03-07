
//var myHtml = `
//            <head>
//                <link rel="stylesheet" href="https://chatgpt.lilia.by/instadb/css/styles.css">
//                <style>
//                    body {
//                        margin: 0;
//                        padding: 0;
//                        overflow: hidden;
//                    }
//
//                    #chatbox-container {
//                        font-size: small;
//                        position: fixed;
//                        bottom: 65px;
//                        right: 20px;
//                        width: 480px;
//                        height: 750px;
//                        background-color: #fff;
//                        border: 1px solid #ccc;
//                        border-radius: 8px;
//                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//                        overflow: hidden;
//                        display: none;
//                    }
//
//                    #toggle-chatbox-btn {
//                        position: fixed;
//                        bottom: 20px;
//                        right: 50px;
//                        padding: 10px;
//                    }
//
//                    iframe {
//                        width: 100%;
//                        height: 100%;
//                        border: none;
//                    }
//
//                    /* Simple CSS reset to avoid interference from parent styles */
//                    .mydivcontent html, body, div, iframe {
//                        margin: 0;
//                        padding: 0;
//                        border: 0;
//                        outline: 0;
//                        font-size: 100%;
//                        vertical-align: baseline;
//                        background: transparent;
//                    }
//
//                    #toggle-chatbox-btn {
//                      display: flex;
//                      align-items: center;
//                    }
//
//                    .logo {
//                      width: 50px; /* Adjust the width of your logo as needed */
//                      margin-right: 4px; /* Adjust the margin between the logo and text as needed */
//                    }
//
//                </style>
//            </head>
//            <body >
//                <button id="toggle-chatbox-btn" class="btn btn-primary">
//                    <img src="https://chatgpt.lilia.by/instadb/logo.png" alt="Logo" class="logo">
//                    ИИ помощник
//                </button>
//                <div id="chatbox-container">
//                    <iframe id="gradio-iframe" src="https://belzarena-ffmpeg.hf.space" frameborder="0"></iframe>
//                </div>
//            </body>        `;

// Assuming you have an existing "mydiv" div
const myDiv = document.getElementById('loadmyapp');

// Create a Shadow DOM for "mydiv"
const shadowRoot = myDiv.attachShadow({ mode: 'open' });

// Link to the external stylesheet within the Shadow DOM
const externalStylesheet = document.createElement('link');
externalStylesheet.setAttribute('rel', 'stylesheet');
externalStylesheet.setAttribute('href', 'https://chatgpt.lilia.by/instadb/css/styles.css');

// Add additional styles to the Shadow DOM
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    /* Additional styles specific to the Shadow DOM */
    #chatbox-container {
        /* Add or modify styles as needed */
        position: fixed;
        bottom: 85px;
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

    /* Add or modify other styles as needed */
    #toggle-chatbox-btn {
       position: fixed;
           bottom: 12px;
           border-radius: 20px;
           right: 75px;
           width: 170px;
       }
    }

    /* Add or modify styles for other elements as needed */
    iframe {
        width: 100%;
        height: 100%;
        border: none;
    }

    /* Simple CSS reset for the Shadow DOM */
    .mydivcontent html, body, div, iframe {
        margin: 0;
        padding: 0;
        border: 0;
        outline: 0;
        font-size: 100%;
        vertical-align: baseline;
        background: transparent;
    }

    /* Add or modify styles for .logo as needed */
    #toggle-chatbox-btn .logo {
        width: 50px;
        height: 50px;
        margin-right: 4px;

    }
`;

// Append the linked stylesheet and additional styles to the Shadow DOM
shadowRoot.appendChild(externalStylesheet);
shadowRoot.appendChild(additionalStyles);

// Add the HTML content to the Shadow DOM
shadowRoot.innerHTML += `
    <button id="toggle-chatbox-btn" class="btn btn-primary">
        <img src="https://chatgpt.lilia.by/instadb/logo.png" alt="Logo" class="logo">
        ИИ помощник
    </button>
    <div id="chatbox-container">
        <iframe id="gradio-iframe" src="https://belzarena-ffmpeg.hf.space" frameborder="0"></iframe>
    </div>
`;

//document.getElementById('loadmyapp').innerHTML = myHtml;
    const toggleButton = shadowRoot.getElementById('toggle-chatbox-btn');
    const chatboxContainer = shadowRoot.getElementById('chatbox-container');

    toggleButton.addEventListener('click', () => {
        if (chatboxContainer.style.display === 'none' || chatboxContainer.style.display === '') {
            chatboxContainer.style.display = 'block';
            toggleButton.innerHTML = `<img src='https://chatgpt.lilia.by/instadb/logo.png' alt='Logo' class='logo'> закрыть`;
        } else {
            chatboxContainer.style.display = 'none';
            toggleButton.innerHTML = `<img src='https://chatgpt.lilia.by/instadb/logo.png' alt='Logo' class='logo'> ИИ помощник`;
        }
    });