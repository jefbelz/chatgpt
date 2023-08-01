
let globalPrompt = new Array();
let modalContent = "";
function copyAnswer(divId) {
  // Get the div containing the answer
  const answerDiv = document.getElementById('answerDiv' + divId);
  // Get the answer content
  const answerContent = answerDiv.innerHTML.replace(/<button.*<\/button>.*/, ''); ;
  // Get the invisible textarea
  navigator.clipboard.writeText(answerContent)
        .then(() => {
          console.log('Content copied to clipboard!');
        })
        .catch((error) => {
          console.error('Failed to copy content: ', error);
        });

  // Deselect the content
  window.getSelection().removeAllRanges();
}

function regenerateAnswer(answerId){
    if(answerId > 0 && (answerId % 2) == 0 ){
        answerId = answerId -1;
    }
    globalPrompt.splice(answerId);
    fetchResponseAsStream(document.getElementById("answerDiv" + answerId).value)

}

function activateChat(value){
  if (value == true) {
    document.getElementById("additionalPrompt").style.display = "block";
  } else {
    document.getElementById("additionalPrompt").style.display = "none";

  }
}

function initializeGlobalPrompt(){
  globalPrompt.length = 0;
    globalPrompt = [{
      role: 'system',
      content: 'You are a helpful assistant.'
    }];
}
function prepareScreen() {
  initializeGlobalPrompt();

  document.getElementById("goBackButton").style.display = "none";
  document.getElementById("responseContainer").style.display = "none";
  activateChat(false);
  closeWaitingModal();
}

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

function processRequest(){
  const newQuestion = document.getElementById('userPrompt').value;
  document.getElementById('userPrompt').value = "";
  fetchResponseAsStream(newQuestion);
}
function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight - 15);
}
    function fetchResponseAsStream(prompt) {
      const apiUrl = 'https://api.openai.com/v1/chat/completions'; // Replace this with the actual API endpoint
      showWaitingModal(true);
      promptPrepareRequest(prompt, "user");
      promptPrepareRequest("", "system");
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + decrypt(atob("bGlsaXlh"), "6b73352b546b705b547f742b7d4c61695e6d7d576b576b4c2b5a747a735e524c6f2d50542d77295b61567d2f5929746d7c7e5a")
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "stream": true,
          "messages": globalPrompt
        })
      })
      .then(response => {
        // Check if the response is a readable stream
        if (!response.body) {
          throw new Error('Readable streams not supported in this browser.');
        }
        console.log(globalPrompt);
        const reader = response.body.getReader();
        let contentFinalResult = "";
        function readStream() {
          return reader.read().then(({ done, value }) => {
            if (done) {
              console.log('Stream is done.'); // End of the stream
              promptPrepareRequestStream(contentFinalResult, "system");
              displayResponse();
              closeWaitingModal();
              activateChat(true);
              return;
            }
            try {
              // Process data as it arrives
              let jsonString = new TextDecoder().decode(value).replace(/data:\s*/g, '');
              var dataAux = jsonString.split("}]}")

              dataAux.forEach( data=> {
                  data = data.trim() + "}]}";
                  if (data.length > "10") {
                    var parsedContent = JSON.parse(data);
                    const content = parsedContent.choices[0].delta.content.replace("undefined","");
                    contentFinalResult += content;
                  }
              });
              promptPrepareRequestStream(contentFinalResult, "system");
              displayResponse();
              // Continue reading the stream
            } catch(error){
              console.log("");
            }
            return readStream();
          });
        }

        return readStream();
      })
      .catch(error => {
        console.error('Error:', error);
        promptPrepareRequestStream("we had a problem processing the request, please try again: " + error, "system");
        displayResponse();
        closeWaitingModal();
        activateChat(true);
      });
      displayResponse();
    }

function autoResizeAllTextAreas(){
    for(var i=1; i< globalPrompt.length;i++){
        textarea = document.getElementById("answerDiv"+i);
        if(textarea)
            autoResize(textarea);
     }
}

function autoResize(textarea) {
  textarea.style.height = "auto"; // Reset the height to its default auto value
  textarea.style.height = textarea.scrollHeight + "px"; // Set the height to match the content
}

 function displayResponse() {
    document.getElementById("responseContainer").style.display = "block";
    const responseContainer = document.getElementById('responseContainer');
    let responseText = ""
    document.getElementById("generateButton").style.display = "none";
    document.getElementById("goBackButton").style.display = "block";
    const systemLabel = "<hr><h2 data-i18n='SYSTEM_LABEL'>This is ChatGPT Answer to our question</h2>";
    const userLabel = "<hr><h2 data-i18n='USER_LABEL'>This is the prompt we will do for chatGPT: </h2>";
    //we ignore first item as it's just preparation for chatgpt prompt
    var copyButtonLabel = "";
    for(var i=1; i< globalPrompt.length; i++) {
      item = globalPrompt[i];
      if(item.role == "system") {
        copyButtonLabel = getTranslation("COPY_ANSWER");
        responseText = responseText + systemLabel;
      } else {
        copyButtonLabel = getTranslation("COPY_PROMPT");
        responseText = responseText + userLabel;
      }
      let buttons="";
      buttons =  "<button class='regenerate-button' onclick='regenerateAnswer("+ i +")'>"+ getTranslation("REGENERATEBUTTON") +"</button>";
      buttons += "<button class='copy-button' onclick='copyAnswer("+ i +")'>"+ copyButtonLabel +"</button>";
      responseText = responseText + "<div class='answer-container'><textarea  class='editable-textarea' id='answerDiv"+i+ "' rows='4' oninput='autoResize(this)'>" + item.content + "</textarea><br><br><br>" + buttons + "</div>";
      responseContainer.innerHTML = responseText;
      //once we add the textarea to screen we then make sure it autoresize to match the content it has on it.
      autoResizeAllTextAreas();

    };
    autoResizeAllTextAreas();
    translateContent(translationData);
    scrollToBottom();
}
    // MODAL SCREEN DETAILS - PROGRESS BAR
    //need to move this to a javascript for the modal
    function showWaitingModal() {
      document.getElementById("myStatusModal").style.display = "block";
      simulateProgress(true);
    }

  function closeWaitingModal() {
    document.getElementById("myStatusModal").style.display = "none";
    simulateProgress(false);
  }
 let width = 0;
  function simulateProgress() {
    const progressBar = document.getElementById("progress");
    if (width >= 100) {
         width = 0;
    }
    width += 2;
    progressBar.style.width = width + "%";
  }

  // Start the progress interval
  let progressInterval = setInterval(simulateProgress, 150);

  // Function to stop the progress and reset the progress bar
  function stopProgress() {
    width = 100;
    clearInterval(progressInterval);
    width = 0;
    progressBar.style.width = width + "%";
  }
  //-----------------------------------------------------------------
  //JAVASCRIPT TO GENERATE THE FORM DYNAMICALLY HAVE TO MOVE IT TO another class

   // Function to show tooltips based on the provided parameter name
function showTooltip(parameterName) {
      // Get the corresponding tooltip text from the object and display it
      const tooltipText = getTranslation( parameterName);

      const tooltipDiv = document.getElementById('tooltip');
      const tooltipContent = document.getElementById('tooltipText');
      if (tooltipText) {
        tooltipContent.innerHTML = tooltipText;
        tooltipDiv.style.display = 'block';

        const tooltipIcon = event.currentTarget;
        const iconRect = tooltipIcon.getBoundingClientRect();
        tooltipDiv.style.top = `${iconRect.top}px`;
        tooltipDiv.style.left = `${iconRect.right + 10}px`;
      }
    }
    function closeToolTip() {
      const tooltipDiv = document.getElementById('tooltip');
        tooltipDiv.style.display = 'none';
    }

    function createDynamicForm(formItems) {
      const formContainer = document.getElementById("inputFields");
      let formTemplate = '<table>';
      formItems.forEach((item) => {
        formTemplate += `
          <tr>
            <td class="left-cell">
              <label for="${item.name}" data-i18n="LABEL_${item.name}" onmouseout="closeToolTip()" onmouseover="showTooltip('${item.name}')">${item.label}:</label><label onclick="showTooltip('${item.name}')"><b>?</b></label>
            </td>
            <td class="right-cell">
              <input class="special-textbox" type="text" id="${item.name}">
            </td>
          </tr>
        `;
      });
      formTemplate += '<tr><td colspan="2"><h6 data-i18n="TOOLTIP_TEXT">* Pass the mouse over the text for a tooltip</h6></td></tr>';
      formTemplate += '</table>';
      formContainer.innerHTML = formTemplate;
    }
   //-----------------------------------------------------------------------------------

    function generateText() {
        const selection = document.getElementById("selection").value;
        modalContent = "";
        const WHOYOUARE = extractFormValues("WHOYOUARE");
        const YOURPOWERPOINTS = extractFormValues("YOURPOWERPOINTS");
        const TARGETAUDIENCE = extractFormValues("TARGETAUDIENCE");
        const TARGETLANGUAGE = extractFormValues("TARGETLANGUAGE");
        const TOPIC = extractFormValues("TOPIC");
        const KEYWORDS = extractFormValues("KEYWORDS");
        const PROMPT = extractFormValues("PROMPT");

        const PROFESSION = extractFormValues("PROFESSION");
        const CITY = extractFormValues("CITY");
        const NICHE = extractFormValues("NICHE");

        if (selection === "SEO Text promotion") {
            modalContent = `I am ${WHOYOUARE} I want you help me attract potential clients to my website.
            I want you to act as a professional SEO and high-end copywriter who speaks and writes fluently ${TARGETLANGUAGE} . Let me introduce yourself ${YOURPOWERPOINTS} My target audience ${TARGETAUDIENCE}  Take into consideration the interests of my target audience  ${PAINPOINTS}

            I want you to pretend that you can write content so well in  ${PROMPT} that it can outrank other websites to attract potential clients.
            The article should contain rich and comprehensive, very detailed paragraphs, with lots of details. Do not echo my prompt. Do not remind me what I asked you for. Do not apologize. Do not self-reference. Do now use generic filler phrases. Do use useful subheadings with keyword-rich titles. Get to the point precisely and accurately. Do not explain what and why, just give me your best possible article. Must write a minimum 2000+ words article in active voice as like as human-like style, simple ${TARGETLANGUAGE}, using contractions, idioms, transitional phrases, interjections, dangling modifiers, and colloquialisms and avoiding repetitive phrases and unnatural grammatically correct sentence structure. Avoid all grammatical mistakes.

            You will need to research a given  ${TOPIC}, formulate a thesis statement, and create a persuasive piece of work that is informative and engaging, with proofreading. Optimize for voice search and include the latest data and information on the keyword of ${KEYWORDS}

            Place «underscore" at the end of the paragraphs and in the middle of sentences.**Heading:** Write an SEO-friendly, eye-catching, and engageable Heading Following ${TOPIC} and keywords. Make headings bold. Put in heading a hook which attract the target audience, show them the advantage to choose me.

            Write more than 5 long tail keywords related to the topic ${TOPIC}. Follow human search intention for writing better long tail. Write an SEO-friendly meta description following the above written keywords. Write meta description under 155 to 160 character. Write this introduction more than 200 words. That is important to write H2, H3, H4 headings with  ${KEYWORDS} . Add  And write a long details SEO friendly description for each headings. Write with relative semantic keywords. Write every paraphrase with a minimum of 2% of keyword density. Match each keyword with the people's search intent. Make sub headings bold. Don't stop here, continue write. Write details description about above written headings, keywords and sub headings. Don’t copy from others, you must write plagiarism-free unique details with 2%-3.5% keywords density. You have to deep research about, written keywords and ${TOPIC}.

            You must follow the copywriting formula which called the "AIDA formula". Don't stop here let’s continue writing. Ask more than 5 searchable questions with the keyword. Write human search intention and follow  ${PROMPT}  and above written.

            After that write SEO friendly short answer every questions using keywords and related semantic words. Don't stop here lets continue writing and finish the task.**Conclusion:** Write an SEO-friendly conclusion using mentioned the heading, keywords and summaries above written. Finish the piece with an excellent engageable ending of ${TOPIC}. Don't stop writing until finishing the article. Continue. Remember, heading, sub heading and question answer must be bold. Finish with a  nice call to action. Write the answer in ${TARGETLANGUAGE}
            `;
        } else if (selection === "Instagram Stories") {
            modalContent = `I want you to act as a high-end copywriter who speaks and writes fluently ${TARGETLANGUAGE}. Write linked storytelling for Instagram stories from unstructured events of the day. With short headlines for each story. In the template, I will have to fill in who I am a Photographer, what I want to sell (some product features). The post should be broken into paragraphs and no more than 200 characters. It will be important to specify what style it will be written in, maybe for the tone of voice, you will need to leave the option to be in that prompt too. The first post should definitely start with intrigue, engagement, or somehow motivate to watch the content further. There should be elements of engagement in storytelling. You can add guidelines for selecting visuals for each story. Do you understand? Here is what happened to me today: ${PROMPT}"`;
        } else if (selection === "Ideas for reels") {
            modalContent = `Ideas for reels will require the following parameters to be populated by user:
            I want you to act as a very proficient social media manager and high-end copywriter that speaks and writes fluently ${TARGETLANGUAGE}. I’m a ${PROFESSION}, working in ${CITY}, my target audience is ${TARGETAUDIENCE} provide me content for Instagram Script for ${TOPIC}. There must be Intro, body, and conclusion parts. The body must contain 3 segments. Script length must be 30 seconds. If there is a subheading than change them into bold characters. You can make a call-to-action to like or leave a comment if it’s appropriate to the subject. My main objective is to erase pain points from my clients so they can order. You need to make Call-to-actions like “leave a comment”, “leave a like”,  “take a look at my recent stories before they go out”.  Ask me for clarifications before answering.
             Make sure the language of your answer is: ${TARGETLANGUAGE}`;
        } else if (selection === "Create a content plan for Instagram posts for a week/month (2-steps Prompt)") {
            modalContent = `Create a content plan for Instagram posts for a week/month (2-steps Prompt)
            You act as a very proficient social media manager and high-end copywriter that speaks and writes fluently ${TARGETLANGUAGE}. Create a content plan for posts on Instagram for a week/month. You need to make Call-to-actions like “leave a comment”, “leave a like”,  “take a look at my recent stories before they go out”. Ask me for clarifications before answering.
             Make sure the language of your answer is: ${TARGETLANGUAGE}

            (Answer each point like this 1.xx
            2.xx
            3.xx and so on)`;
        } else if (selection === "A template for emailing clients about a photo day") {
            modalContent = `Neural network to generate ideas for collaborations
            You act as a very proficient social media manager and high-end copywriter that speaks and writes fluently ${TARGETLANGUAGE}. Create a template for mailing clients about a ${NICHE} photoshoot that starts with a catchy headline, benefits, and benefits to the client. Describe the essence of the offer, at the end  with a call to action, for example: "send any word if you want to know more details" Ask me for clarifications before answering.
            Make sure the language of your answer is: ${TARGETLANGUAGE}

            (Answer each point like this 1.xx
            2.xx
            3.xx and so on)`;
        } else if (selection === "Neural network to generate ideas for collaborations") {
            // JavaScript code for handling the "Neural network to generate ideas for collaborations" selection goes here
            // ...
        }
        // Hide the selection content and show the generated content
        document.getElementById("inputFields").style.display = "none";
        document.getElementById("generateButton").style.display = "none";
        fetchResponseAsStream(modalContent);
    }

    const labels = {
      TARGETLANGUAGE: 'Language',
      PROMPT: 'Core of your message',
      WHOYOUARE: 'Who you are',
      YOURPOWERPOINTS: 'Your power points',
      TARGETAUDIENCE: 'Your target audience',
      PAINPOINTS: 'Pain points of your target audience',
      TOPIC: 'Topic to work on',
      KEYWORDS: 'Keywords',
      PROFESSION: 'Your Profession',
      CITY: 'The city from where you are',
      NICHE: 'Your Niche',
    };

    // Define the form items for each selection in an object
    const formItems = {
      "SEO Text promotion": [
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'YOURPOWERPOINTS', label: labels.YOURPOWERPOINTS },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'PAINPOINTS', label: labels.PAINPOINTS },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'PROMPT', label: labels.PROMPT },
        { name: 'TOPIC', label: labels.TOPIC },
        { name: 'KEYWORDS', label: labels.KEYWORDS },
        // Add other items for "SEO Text promotion"
      ],
      "Instagram Stories": [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'PROMPT', label: labels.PROMPT },
         { name: 'TOPIC', label: labels.TOPIC },
        // Add other items for "Instagram Stories"
      ],
      "Ideas for reels": [
        { name: 'PROFESSION', label: labels.PROFESSION },
        { name: 'CITY', label: labels.CITY },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        // Add other items for "Ideas for reels"
      ],
      "Create a content plan for Instagram posts for a week/month (2-steps Prompt)": [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        // Add other items for "Create a content plan for Instagram posts for a week/month (2-steps Prompt)"
      ],
      "A template for emailing clients about a photo day": [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'NICHE', label: labels.NICHE },
        // Add other items for "A template for emailing clients about a photo day"
      ],
    };

    // Get the selected form items based on the selection
    const selectedItems = formItems[selection];

    // Check if the selectedItems is defined and not empty before calling the createDynamicForm function
    if (selectedItems && selectedItems.length > 0) {
      createDynamicForm(selectedItems);
    }

    function handleSelectionChange() {
        const selection = document.getElementById("selection").value;
        const inputFieldsDiv = document.getElementById("inputFields");
        inputFieldsDiv.innerHTML = ""; // Clear previous input fields
        globalPrompt = "";
        const selectedItems = formItems[selection];
        // Check if the selectedItems is defined and not empty before calling the createDynamicForm function
        if (selectedItems && selectedItems.length > 0 && selection != "cleanChat") {
          createDynamicForm(selectedItems);
          prepareScreen();
          goBack();
        } else if(selection == "cleanChat"){
            prepareScreen();
            activateChat(true);
            document.getElementById("generateButton").style.display = "none";
        }
        translateContent(translationData);
    }

    function extractFormValues(item) {
      const inputField = document.getElementById(item);
      let formValue = "";
      if (inputField) {
          formValue = inputField.value;
      }
      return formValue;
    }
    function goBack() {
        // Hide the generated content and show the selection content
        document.getElementById("inputFields").style.display = "block";
        document.getElementById("selection").style.display = "block";
        document.getElementById("responseContainer").style.display = "none";
        document.getElementById("goBackButton").style.display = "none";
        document.getElementById("generateButton").style.display = "block";
        activateChat(false)
    }
    document.getElementById("generateButton").addEventListener("click", generateText);
    document.getElementById("selection").addEventListener("change", handleSelectionChange);
    document.getElementById("goBackButton").addEventListener("click", goBack);
    document.getElementById("processPromptButton").addEventListener("click", processRequest);
    const closeButton = document.querySelector('.close-button');

    // Add an event listener to the language selector dropdown
    const languageSelect = document.getElementById('languageSelect');
    languageSelect.addEventListener('change', async () => {
      const selectedLanguage = languageSelect.value;
      const translationData = await fetchTranslation(selectedLanguage);
      translateContent(translationData);
    });


    // Get the tooltip element
    const tooltip = document.getElementById('tooltip');
    tooltip.addEventListener('click', () => { tooltip.style.display = 'none';});
    // Trigger the selection change event initially to set up the input fields based on the default
    handleSelectionChange();
    prepareScreen();
