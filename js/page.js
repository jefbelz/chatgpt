
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
    const selection = document.getElementById("selection").value;
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
      responseText += "<br>" + this.getAdditionalQuestionsTip(selection);
      responseContainer.innerHTML = responseText;
      //once we add the textarea to screen we then make sure it autoresize to match the content it has on it.
      autoResizeAllTextAreas();

    };
    autoResizeAllTextAreas();
    translateContent(translationData);
    scrollToBottom();
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

    function createDynamicForm(formItems, selection) {
      const formContainer = document.getElementById("inputFields");
      let formTemplate = `<p class='formDescription' data-i18n="description.${selection}"></p> `

      formTemplate += '<table>';
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
      formTemplate += '</table></br>';
      formTemplate += this.getAdditionalQuestionsTip(selection);

      formContainer.innerHTML = formTemplate;
    }
    function getAdditionalQuestionsTip(selection){

      if(getTranslation("additionalQuestions." +selection) === null) {
         formTemplate = ""
      } else {
        formTemplate = '<b><label data-i18n="LABEL_additionalQuestions"></label></b><br>'
        formTemplate += `<div data-i18n="additionalQuestions.${selection}"></div>`
      }

      return formTemplate;
     }

   //-----------------------------------------------------------------------------------

    function generateText() {
        const selection = document.getElementById("selection").value;
        modalContent = "";
        const WHOYOUARE = extractFormValues("WHOYOUARE");
        const TARGETAUDIENCE = extractFormValues("TARGETAUDIENCE");
        const TARGETLANGUAGE = extractFormValues("TARGETLANGUAGE");
        const WHATDOYOUWANTTOSELL = extractFormValues("WHATDOYOUWANTTOSELL");
        const WHATHAPPENEDTODAY = extractFormValues("WHATHAPPENEDTODAY");
        const FOCUSTHEME = extractFormValues("FOCUSTHEME");
        const SUBJECTPOST = extractFormValues("SUBJECTPOST");
        const TONEOFVOICE = extractFormValues("TONEOFVOICE");
        const PRODUCT = extractFormValues("PRODUCT");
        const REGION = extractFormValues("REGION");
        const YOURBENEFITS = extractFormValues("YOURBENEFITS");
        const BLOGGERNAME = extractFormValues("BLOGGERNAME");
        const SUBJECT = extractFormValues("SUBJECT");
        const PAGETHEME = extractFormValues("PAGETHEME");
        const PAINPOINTS = extractFormValues("PAINPOINTS");
        const TASK = extractFormValues("TASK");
        const TOPIC = extractFormValues("TOPIC");
        const KEYWORDS = extractFormValues("KEYWORDS");
      if (selection === "advantagesSteps") {
        modalContent = `Я ${WHOYOUARE}. Моя целевая аудитория ${TARGETAUDIENCE} Помоги мне описать, чем я отличаюсь от других фотографов, чтобы моя target audience выбрала меня среди сотни других фотографов. Задай мне несколько вопросов, чтобы мы вместе смогли донести ценность моих услуг для target audience. Ответь на мне на ${TARGETLANGUAGE} языке.`;
      } else if (selection === "painDesires") {
        modalContent = `Я ${WHOYOUARE}. Моя целевая аудитория ${TARGETAUDIENCE} Помоги мне описать, в чем заключаются боли и желания моей целевой аудитории. Ответь мне на  ${TARGETLANGUAGE} языке.`
      } else if (selection === "ideasStories") {
        modalContent = `Я — ${WHOYOUARE}. Вы — высококлассный SMM менеджер, который свободно говорит и пишет на ${TARGETLANGUAGE} языке . Придумай для меня  10 идей для и Instagram Stories на сегодня. Вы можете задать мне несколько конкретных вопросов, чтобы получился надлежащий ответ.`
      } else if (selection === "storytellingStories") {
        modalContent = `Я - ${WHOYOUARE}. Ты - опытный SMM-менеджер высокого класса, свободно владеющий ${TARGETLANGUAGE} языком. Напишите сторителлинг для Instagram Stories на основе событий моего дня. События этого дня я предоставлю далее. Используйте передовую практику и техники, чтобы удержать внимание аудитории, такие, которые обычно используются для создания интересных сюжетов в книгах и фильмах.
                        Вот, что произошло со мной сегодня: ${WHATHAPPENEDTODAY}. Создайте на основе этих событий интересную и вовлекающую историю из 7-13 логически связанных блоков. Для каждого блока используйте номера. Каждый блок должен содержать заголовок и максимум 2-3 предложения, которые кратко объясняют суть события или мотивируют аудиторию предпринять действие: поставить реакцию (сердечко, огонь, emoji, лайк и т.д.), участвовать в опросе, выбрать один из вариантов ответа, оставить комментарий и так далее. Вы можете добавить рекомендации по выбору визуальных элементов для каждой истории.
                        Первый пост обязательно должен начаться с интриги, вовлечения или кликбейтного заголовка, мотивирующего целевую аудиторию смотреть контент далее. Основная идея сегодняшней истории - ${WHATDOYOUWANTTOSELL}.
                        Моя целевая аудитория - ${TARGETAUDIENCE}. Основная цель сторителлинга - привлечь внимание моей целевой аудитории и убедить их, что я хороший специалист и очень приятный человек, разделяющий жизненные и личные ценности с моей целевой аудиторией. Используй дружелюбный тон.
                        Напиши ответ на ${TARGETLANGUAGE} языке.`
      } else if (selection === "ideasReels") {
        modalContent = `Действуй как искусный SMM менеджер и высококлассный копирайтер, свободно говорящий и пишущий на ${TARGETLANGUAGE} языке . Я - ${WHOYOUARE}, моя целевая аудитория - ${TARGETAUDIENCE}. Придумай 5 идей для Instagram Reels и напиши сценарий для каждой идеи. Каждый сценарий должен иметь вступление, основную часть и заключение. Длина сценария должна составлять от 15 до 45 секунд. Каждый сценарий должен начинаться с кликбейтного заголовка, связанного с болевой точкой или желанием моей целевой аудитории. Если есть подзаголовки, выдели их жирным шрифтом.
                        Моя основная цель - устранить болевые точки  моих клиентов, чтобы мотивировать их сделать заказ. Добавь призывы к действию в конце сценария, такие как "оставьте комментарий", "поставьте лайк", "посмотрите мои последние истории, пока они не исчезли" и т.д. Просьба уточнить, если нужны дополнительные пояснения, перед тем как отвечать. Напишите ответ на ${TARGETLANGUAGE} языке.`
      } else if (selection === "contentPlanWeek") {
        modalContent = `Я - ${WHOYOUARE}. Я хотела бы, чтобы ты помог мне создать график публикаций для моего блога на следующие 5 дней, который наиболее вероятно поможет мне занять высокие позиции по ключевым словам . Я сообщу тебе моё основное целевое ключевое слово в подсказке ниже. Придумай кликбейтные заголовки  для этих постов, а затем напиши сами тексты постов согласно маркетинговой структуре, которую я обозначу далее.
                        Моя целевая аудитория - ${TARGETAUDIENCE}. Посты должны быть разделены на абзацы и иметь длину от 400 до 1200 знаков. Используй emoji. Не используй общие фразы. Заверши каждый пост мощным призывом к действию.
                        Пожалуйста, создай названия для каждого поста блога в виде таблицы. Над таблицей напиши "Календарь публикаций по ключевому слову" и замени "КЛЮЧЕВОЕ СЛОВО" на то,что указано в далее заглавными буквами.
                        Ключевое слово, на которое я фокусируюсь: ${FOCUSTHEME}
                        Пожалуйста, предоставьте все ответы на ${TARGETLANGUAGE} языке.`
      } else if (selection === "postInstagram") {
        modalContent = `Напиши пост в Instagram согласно определенной маркетинговой структуре, которая мне понадобится (например, внимание-интерес-желание-действие или боль-решение и так далее). Я - ${WHOYOUARE}. Я хочу, чтобы ты написал пост на тему ${SUBJECTPOST}. Моя целевая аудитория - ${TARGETAUDIENCE}. Пост должен быть разбит на абзацы и не превышать 1500 знаков. Используй emoji. Стиль должен быть ${TONEOFVOICE}. Заголовок обязательно должен начаться с интриги, вовлечения, кликбейтного заголовка или чего-то, что покажет преимущества для целевой аудитории, чтобы они продолжили читать контент. Не используй общие фразы. Заверши призывом к действию. Напиши ответ на ${TARGETLANGUAGE} языке.`
      } else if (selection === "textClientNewsletter") {
        modalContent = `Я - ${WHOYOUARE}. Ты действуешь как опытный маркетолог и высококлассного копирайтер, свободно говорящий и пишущий на ${TARGETLANGUAGE} языке. Создай шаблон для рассылки клиентам о ${PRODUCT} в соответствии со следующей структурой:
                        1.	Цепляющий заголовок с преимуществами для потенциального клиента,
                        2.	Вежливое приветствие
                        3.	Предложение с некоторыми преимуществами
                        4.	Призыв к действию
                        Опиши суть предложения и в конце добавь призыв к действию, например: "отправьте любое слово, если хотите узнать подробности". Спроси меня, если нужны уточнения, перед тем как отвечать. Используй продающие техники, чтобы убедить потенциальных клиентов совершить действие. Письмо не должно превышать 1500 знаков. Постарайся быть конкретным, кратким и вежливым. Пожалуйста, предоставь все ответы на ${TARGETLANGUAGE} языке.`
      } else if (selection === "generateCollabIdeas") {
        modalContent = `Ты действуешь, как опытный бизнес-менеджер и высококлассный копирайтер, свободно говорящий и пишущий на ${TARGETLANGUAGE} языке . Я - ${WHOYOUARE}, из ${REGION}, и в основном использую Instagram для продвижения. Моя целевая аудитория - ${TARGETAUDIENCE}. Предложи идеи для сотрудничества. Как найти и что именно написать эксперту, с которым я хочу взаимодействовать, чтобы он/она согласились на сотрудничество для обмена аудиторией. Пожалуйста, предоставь все ответы на ${TARGETLANGUAGE} языке.`
      } else if (selection === "letterBloggerCollab") {
        modalContent = `Я - ${WHOYOUARE}. Мои сильные стороны - ${YOURBENEFITS}. Ты выступаешь как высококлассный копирайтер, свободно говорящий и пишущий на ${TARGETLANGUAGE} языке.  Создай шаблон для обращения к блогерам о проведении совместной фотосессии, чтобы они согласились на сотрудничество для   обмена аудиториями.
                        Шаблон должен иметь следующую структуру: вежливое и приятное приветствие  ${BLOGGERNAME}, очень краткая информация обо мне и моих сильных сторонах, предложение, что я ожидаю от блогера, возможная дата будущей фотосессии, ссылки на возможные фотосессии (приложенные фотографии к сообщению), хороший призыв к действию. Пожалуйста, предоставь все ответы на ${TARGETLANGUAGE} языке. Постарайся быть кратким и конкретным.`
      } else if (selection === "profileHeader") {
        modalContent = `Ты выступаешь в роли высококлассного SMM менеджера, свободно говорящего и пишущего на ${TARGETLANGUAGE} языке . Я - ${WHOYOUARE} из ${REGION}. Мои сильные стороны - ${YOURBENEFITS}. Я главным образом использую Instagram как социальную платформу для привлечения клиентов. Помоги мне составить био для моего профиля в Instagram, не более 150 символов. Предоставь как минимум 5 лучших идей для био.
                        В био полезно упомянуть мои сильные стороны, преимущества для клиентов, лид- магнит для привлечения подписчиков. Добавь ссылку на мой веб-сайт в конце, чтобы привлечь новых потенциальных клиентов. Пожалуйста, предоставь все ответы на ${TARGETLANGUAGE} языке.`
      } else if (selection === "gatherInstagramTags") {
        modalContent = `Ты выступаешь в роли опытного SMM менеджера и высококлассного копирайтера, свободно говорящего и пишущего на  ${TARGETLANGUAGE} языке. Напиши для меня как минимум 30 хэштегов для публикаций, связанных с темой ${SUBJECT}. Используй высокочастотные и низкочастотные хэштеги, локализацию. Моё местоположение - ${REGION}. Пожалуйста, предоставьте все ответы на ${TARGETLANGUAGE} языке.`
      } else if (selection === "selectSEOKeywords") {
        modalContent = `Я ${WHOYOUARE}.  Моя целевая аудитория ${ TARGETAUDIENCE }.  Помоги мне составить семантическое ядро для продвижения моего сайта по теме ${PAGETHEME} для целевой аудитории. Напиши мне не менее 10 ключевых слов. Включая высокочастотные, среднечастотные и низкочастотные запросы. Я работаю в следующих городах ${REGION}
                        Напишите ответ на ${TARGETLANGUAGE} языке.`
      } else if (selection === "seoTextWebsite") {
        modalContent = ``
      }

        // Hide the selection content and show the generated content
        document.getElementById("inputFields").style.display = "none";
        document.getElementById("generateButton").style.display = "none";
        fetchResponseAsStream(modalContent);
    }

    const labels = {
      WHOYOUARE: 'Your Identity',
      TARGETAUDIENCE: 'Target Audience',
      TARGETLANGUAGE: 'Target Language',
      WHATDOYOUWANTTOSELL: 'What You Want to Sell',
      WHATHAPPENEDTODAY: 'What Happened Today',
      FOCUSTHEME: 'Focus Theme',
      SUBJECTPOST: 'Subject of Post',
      TONEOFVOICE: 'Tone of Voice',
      PRODUCT: 'Product',
      REGION: 'Region',
      YOURBENEFITS: 'Your Benefits',
      BLOGGERNAME: 'Blogger Name',
      SUBJECT: 'Subject',
      PAGETHEME: 'Page Theme',
      PAINPOINTS: 'Pain Points',
      TASK: 'Task',
      KEYWORDS: 'Keywords',
    };
    // Define the form items for each selection in an object
    const formItems = {
      'advantagesSteps': [
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE }
      ],
      'painDesires': [
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE }
      ],
      'ideasStories': [
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
      ],
      'storytellingStories': [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'WHATDOYOUWANTTOSELL', label: labels.WHATDOYOUWANTTOSELL },
        { name: 'WHATHAPPENEDTODAY', label: labels.WHATHAPPENEDTODAY },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
      ],
      'ideasReels': [
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        // Add other items for "ideasReels"
      ],
      'contentPlanWeek': [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'FOCUSTHEME', label: labels.FOCUSTHEME },
      ],
      'postInstagram': [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        { name: 'SUBJECTPOST', label: labels.SUBJECTPOST },
        { name: 'TONEOFVOICE', label: labels.TONEOFVOICE },
      ],
      'textClientNewsletter': [
        { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
        { name: 'WHOYOUARE', label: labels.WHOYOUARE },
        { name: 'PRODUCT', label: labels.PRODUCT },
      ],
      'generateCollabIdeas': [
          { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'WHOYOUARE', label: labels.WHOYOUARE },
          { name: 'REGION', label: labels.REGION },
          { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
        ],
      'letterBloggerCollab': [
          { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'WHOYOUARE', label: labels.WHOYOUARE },
          { name: 'YOURBENEFITS', label: labels.YOURBENEFITS },
          { name: 'BLOGGERNAME', label: labels.BLOGGERNAME },
        ],
        'profileHeader': [
          { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'WHOYOUARE', label: labels.WHOYOUARE },
          { name: 'REGION', label: labels.REGION },
          { name: 'YOURBENEFITS', label: labels.YOURBENEFITS },
        ],
      'gatherInstagramTags': [
          { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'SUBJECT', label: labels.SUBJECT },
          { name: 'REGION', label: labels.REGION },
        ],
      'selectSEOKeywords': [
       { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'PAGETHEME', label: labels.PAGETHEME },
          { name: 'WHOYOUARE', label: labels.WHOYOUARE },
          { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
          { name: 'REGION', label: labels.REGION },
        ],
      'seoTextWebsite': [
          { name: 'WHOYOUARE', label: labels.WHOYOUARE },
          { name: 'YOURBENEFITS', label: labels.YOURBENEFITS },
          { name: 'TARGETAUDIENCE', label: labels.TARGETAUDIENCE },
          { name: 'PAINPOINTS', label: labels.PAINPOINTS },
          { name: 'TARGETLANGUAGE', label: labels.TARGETLANGUAGE },
          { name: 'TASK', label: labels.TASK },
          { name: 'PAGETHEME', label: labels.PAGETHEME },
          { name: 'KEYWORDS', label: labels.KEYWORDS },

        ],
    };

    // Get the selected form items based on the selection
    const selectedItems = formItems[selection];

    // Check if the selectedItems is defined and not empty before calling the createDynamicForm function
    if (selectedItems && selectedItems.length > 0) {
      createDynamicForm(selectedItems, selection);
    }

    function handleSelectionChange() {
        const selection = document.getElementById("selection").value;
        const inputFieldsDiv = document.getElementById("inputFields");
        inputFieldsDiv.innerHTML = ""; // Clear previous input fields
        globalPrompt = "";
        const selectedItems = formItems[selection];
        // Check if the selectedItems is defined and not empty before calling the createDynamicForm function
        if (selectedItems && selectedItems.length > 0 && selection != "cleanChat") {
          createDynamicForm(selectedItems, selection);
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
    // Get the header element
    window.addEventListener("load", function() {
       document.documentElement.style.setProperty('--header-height', document.getElementById("header").getBoundingClientRect().height + 'px');

    });


