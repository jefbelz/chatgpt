var i18nEnglish = {
    "columnUser": "User",
    "columnURL": "URL",
    "columnLikes": "Likes",
    "columnViews": "Views",
    "columnComments": "Comments",
    "columnTakenAt": "Taken at",
    "columnDuration": "Duration",
    "columnEngagementRate": "Engagement Rate",
    "columnAnalysis": "Analysis",
    "columnTranscription": "Transcription",
    "columnTextOnVideo": "Text On video",
    "columnText": "Text",
    "columnVideo": "Video",
    "title": "База данных анализа Reels",
    "searchLabel" : "Search",
    "searchUserNameForm" : "Enter instagram username",
    "searchReelsForm" : "Enter number",
    "searchReels" : "NrReels:",
    "searchButton" : "Search",
    "noDataSearch": "There is no data, please search for it before using this functionality",
    "pleaseFillAllData": "Please fill both fields before proceed",
    "loading": "Processing request please wait..."
  };
  // Sample i18n object with Russian translations
  var i18nRussian = {
    "columnUser": "Пользователь",
    "columnURL": "URL",
    "columnLikes": "Лайки",
    "columnViews": "Просмотры",
    "columnComments": "Комментарии",
    "columnTakenAt": "Дата",
    "columnDuration": "Длительность",
    "columnEngagementRate": "Уровень вовлеченности",
    "columnAnalysis": "Описание видео",
    "columnTranscription": "Голос на видео",
    "columnTextOnVideo": "Текст на видео",
    "columnText": "Текст под reels",
    "columnVideo": "Видео",
    "title": "Reels Database",
      "searchLabel": "Поиск",
      "searchUserNameForm": "Введите имя пользователя Instagram",
      "searchReelsForm": "Введите количество",
      "searchReels": "Количество Reels:",
      "searchButton": "Поиск",
      "noDataSearch": "Данных нет, найдите их, прежде чем использовать эту функцию.",
    "pleaseFillAllData": "Пожалуйста, заполните оба поля, прежде чем продолжить",
    "loading" : "Обработка запроса, пожалуйста, подождите…"
  };
var i18n = i18nRussian;

//GET PAGE PARAMETERS

const urlParams = new URLSearchParams(window.location.search);
const email = urlParams.get('email');
if (email == null)
    window.location.href = 'index.html';

//----------------------------------------


  // Function to set DataTable language based on language parameter
  function setDataTableLanguage(language) {
    i18n = (language === 'english') ? i18nEnglish : i18nRussian;
    var i18n = Object.values(i18nEnglish);
    var table = $('#example').DataTable()
    table.columns().header().to$().each(function(index) {
      $(this).text(i18n[index]); // Replace 'columnLabel' with your actual column label key
    });

  }

function searchNewReels(){

   var searchUserValue = document.getElementById('searchUser').value;
   var numberOfReelsValue = document.getElementById('numberOfReels').value;
    if (searchUserValue.trim() === '' || numberOfReelsValue.trim() === '') {
        dialog = $( "#dialog-message" )
        $( "#messageModal" ).text(i18n.pleaseFillAllData)

        dialog.dialog( "open" );
        return;
    }

     var searchButton = $("button.btn.btn-secondary:first");
    searchButton.click();
    syncSleep(500);
    var searchButton = $("body");
    searchButton.click();
    syncSleep(500);
    document.body.click();

    var dtSearchDiv = document.querySelector('.dt-search');
    dtSearchDiv.innerHTML = `
        <div id="progressbar">
            <div class="progress-label">Loading...</div>
        </div>`;

   $( "#progressbar" ).progressbar({
        value: false
   });
    // Construct the URL for the request
    var apiUrl = 'https://xvzd4kqxcbg5x6yrrf7vy5fpiu0paque.lambda-url.eu-central-1.on.aws?account=' + encodeURIComponent(searchUserValue) + '&nrReels=' + encodeURIComponent(numberOfReelsValue) + '&email=' + encodeURIComponent(email);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {

            console.log('Data received:', data);
            loadUsers();
             reloadTableAndSelectUser(searchUserValue);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        })
        .finally(() => {
              replaceSearchDiv();
        });
};

function syncSleep(ms) {
  var start = new Date().getTime();
  while (new Date().getTime() < start + ms) {}
}

function reloadTableAndSelectUser(userName){
    var searchButton = $("button.btn.btn-secondary:first");
    searchButton.click();
    var table = $('#example').DataTable();
    table.ajax.reload();
    var tableSearch = $('#DataTables_Table_0').DataTable()

    var tableData = tableSearch.data().toArray();
    var foundObject = tableData.find(function(item) {
        return item.display === userName;
    });
    if (foundObject)
        var foundIndex = foundObject.index;
        tableSearch.row(':eq('+ foundIndex +')', { page: 'current' }).select()
    syncSleep(500);
    var searchButton = $("body");
    searchButton.click();
    syncSleep(500);
    document.body.click();
}

function limitTextTo40Characters(inputText) {
  inputText = inputText.replace(/\n/g, '<br>');
  if (inputText.length > 40) {
    // Use substring to extract the first 40 characters and add an ellipsis
    var limitedText = inputText.substring(0, 37) + "...";
    return limitedText;
  } else {
    // Return the original text if it's already 40 characters or less
    return inputText;
  }
}
var users = ""
function loadUsers(){
    var userXhr = new XMLHttpRequest();
    userXhr.open('GET', 'https://f4m7goevkzwb3wwft5wwis6k4i0sulif.lambda-url.eu-central-1.on.aws/?users=true&email=' + email, false);
    userXhr.send();

    if (userXhr.status === 200) {
      users = JSON.parse(userXhr.responseText);
    } else {
      console.error('Failed to fetch users');
    }
}

 function loadJSON() {
    var table = $('#example').DataTable({
              ajax: {
                url: 'https://f4m7goevkzwb3wwft5wwis6k4i0sulif.lambda-url.eu-central-1.on.aws/?reels=true&email=' + email,
                dataSrc: ''
              },
             columns: [
                 {
                    data: 'username',
                    title: i18n.columnUser
                 },
                 {
                     data: 'url',
                     title: i18n.columnURL,
                     render: function(data, type, row) {
                         return '<a href="' + data + '" target="_blank">reel</a>';
                     },
                 },
                 {
                     data: 'like_count',
                     title: i18n.columnLikes ,
                     render: function(data, type, row) {
                         return data.toLocaleString(); // Example: 1,234
                     }
                 },
                 {
                     data: 'view_count',
                      title: i18n.columnViews ,
                     render: function(data, type, row) {
                         return data.toLocaleString(); // Example: 1,234
                     }
                 },
                 {
                     data: 'comment_count',
                     title: i18n.columnComments,
                     render: function(data, type, row) {
                         return data.toLocaleString(); // Example: 1,234
                     }
                 },
                 {
                     data: 'taken_at',
                     title: i18n.columnTakenAt,
                     render: function(data, type, row) {
                         // Convert the ISO date string to a Date object
                         var date = new Date(data);
                         var formattedDate = date.toLocaleString('en-RU', {
                             year: '2-digit',
                             month: '2-digit',
                             day: '2-digit',
                             hour: '2-digit',
                             minute: '2-digit'
                         });

                         return formattedDate;
                     }
                 },
                 {
                    data: 'video_duration',
                    title: i18n.columnDuration
                   },
                 {
                    data: null,
                    title: i18n.columnEngagementRate,
                    render: function(data, type, row) {
                              var userDetails = users.find(user => user.username === row.username);
                              var factor = Math.pow(10, 2);
                             return Math.round((((row.like_count + row.comment_count)/userDetails.follower_count) * 100)* factor) / factor;

                       }
                },
                 {
                     data: 'video_analysis',
                     title: i18n.columnAnalysis ,
                     render: function(data, type, row) {
                        if (data)
                            var formattedText = data.trim();
                        else
                            var formattedText = "";
                         return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                     }
                 },
                 {
                     data: 'video_transcription',
                     title: i18n.columnTranscription,
                     render: function(data, type, row) {
                         if (data)
                             var formattedText = data.trim();
                         else
                             var formattedText = "";
                         return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                     }
                 },
                 {
                     data: 'text',
                     title: i18n.columnText ,
                        render: function(data, type, row) {
                        if (data)
                            var formattedText = data.trim();
                        else
                            var formattedText = "";
                         return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                     }
                 },
                 {
                     data: 'video_url',
                       title: i18n.columnVideo,
                     render: function(data, type, row) {
                         return '<a href="' + data + '" target="_blank">Video</a>';
                     }
                 },

             ],language: {
                         url: '//cdn.datatables.net/plug-ins/2.0.0/i18n/ru.json',
                               //cdn.datatables.net/plug-ins/2.0.0/i18n/es-ES.json
                               //cdn.datatables.net/plug-ins/2.0.0/i18n/pl.json
                   "emptyTable": i18n.noDataSearch
                   },
                layout: {
                    topStart: {
                        buttons: [
                            {
                                extend: 'searchPanes',
                                config: {
                                    cascadePanes: true,
                                    collapse: false
                                }
                            }

                        ]
                    },
                    bottomStart: {
                        buttons: [
                            'copy', 'csv', 'excel', 'pdf', 'print'
                           ]
                    }
                },    columnDefs: [
                  {
                      searchPanes: {
                          show: true,
                          dtOpts: {
                                  select: {
                                      style: 'multi',
                                      targets: [1,2,3]
                                  }
                              }
                      },
                      targets: [0]
                  },

              ],
                       fixedColumns: true,
                       fixedHeader: true,
                       rowReorder: true,
                       colReorder: true,
                       scrollY: '370px',
                       scrollX: true,
                       scrollCollapse: true,
                       select: true,

            select: {
                style: 'multi',
                selector: 'td'
            },
       columnDefs: [
               { targets: [11], visible: false } // Hide columns 1 and 2 initially
             ],
    });


        table
            .row(0)
            .draw()
            .searchPanes.rebuildPane();

     $('#example tbody').on('click', 'td:nth-child(1)', function () {

                  var cell = $(this);

                  var row = cell.closest('tr');
                  var username = cell.text();

                  // Find user details in userXhr based on the clicked username
                  var userDetails = users.find(user => user.username === username);
                  var reelsDetails = table.row($(this).closest('tr')).data();

                  // Display user details in a modal or expandable row
                  if (userDetails) {
                      toggleExpandableRow(row, userDetails, reelsDetails);

                  }
              })
 };

 function toggleExpandableRow(row, userDetails, reelsDetails) {
    var table = $('#example').DataTable();
    var currentRow = table.row(row);

    if (currentRow.child.isShown()) {
        // This row is already open - close it
        currentRow.child.hide();
        row.removeClass('shown');
    } else {
        // Open this row with user details
        currentRow.child(showModal(userDetails, reelsDetails)).show();
        row.addClass('shown');

    }
}



function showModal(userDetails, reelsDetails) {
    var userModal = $('#userDetailsModal').clone();
    userModal.find('#modalPicture').attr('src', 'data:image/jpeg;base64,' + userDetails.profile_pic_url_hd);;
    userModal.find('#modalFullName').text(userDetails.full_name);
    userModal.find('#modalCategory').text(userDetails.category);
    userModal.find('#modalBiography').text(userDetails.biography);
    userModal.find('#modalFollowers').text(userDetails.follower_count);
    userModal.find('#modalFollowing').text(userDetails.following_count);
    userModal.find('#modalPhone').text(userDetails.contact_phone_number);
    userModal.find('#modalTranscription').text(reelsDetails.video_transcription);
    userModal.find('#modalAnalysis').text(reelsDetails.video_analysis);
    userModal.find('#modalCaption').text(reelsDetails.text);
    return userModal.html();
}
$( function() {
$( "#dialog-message" ).dialog({
  modal: true,
   autoOpen: false,
   height: 250,
      width: 380,
  buttons: {
    Ok: function() {
      $( this ).dialog( "close" );
    }
  }
});
} );

loadUsers();
loadJSON();

function openModal() {
   var productArea = document.getElementById('market');
    productArea.innerHTML = ""
    $('#gpt4Modal').modal('show');
    document.getElementById("buttonSend").disabled = false;

}
function closeModal() {
    globalPrompt = new Array()
    document.getElementById("responseContainer").style.display = "none";
    document.getElementById("gptDivAdditionalQuestion").style.display = "none";

    $('#gpt4Modal').modal('hide');
  }
function replaceSearchDiv(){
   var dtSearchDiv = document.querySelector('.dt-search');
   dtSearchDiv.innerHTML = `
       <div id="searchDiv" class="searchDiv">
           <label for="searchUser" class="form-label">` + i18n['searchLabel'] + `</label>&nbsp;
           <input type="text" class="form-control" id="searchUser" placeholder="` + i18n['searchUserNameForm'] + `" aria-describedby="searchButton">
            &nbsp;
           <label for="numberOfReels" class="form-label">` + i18n['searchReels'] + `</label>&nbsp;
           <input type="number" class="form-control" id="numberOfReels" value="10" placeholder="` + i18n['searchReelsForm'] + `" aria-describedby="searchButton">
            &nbsp;
           <button class="btn btn-primary" type="button" onclick="searchNewReels()" id="searchButton">` + i18n['searchButton'] + `</button>
       </div>`;

}
 $(document).ajaxComplete(function() {
    replaceSearchDiv();
});

function populateText(product, reels) {
//  let text = `Действуй как профессиональный SMM  менеджер и reels мейкер. Далее будут приведены несколько сценариев роликов reels с описанием о чем видеоряд, а также субтитрами.
//              Эти reels  являются популярными  и набрали много тысяч просмотров. Тебе необходимо проанализировать сюжеты, описание, субтитры, длительность ролика, заголовок, смыслы и предложить минимум 5 идей со сценариями для моего продукта.
//              Мой продукт - это ${product}
//                Учитывай боль, желания, потребности моей целевой аудитории, чтобы максимально хорошо адаптировать сюжет ролика под мой продукт или услугу.
//                Обрати внимание, что крайне важным для успеха reels, чтобы он набрал много просмотров, является цепляющий заголовок.
//                Предложи не менее 5 сценариев для привлечения внимания к моему продукту.
//                Предоставь, пожалуйста, ответ по следующей структуре: номер сценария,цепляющий заголовок, короткое описание видеоряда, субтитры.
//                Далее привожу сценарии  и описание видеоряд популярных видео.\n
//`;

  let reelsData = `Duration,views,Описание видеоряда,описание, текст на видео\n`;
  reels.forEach(reel => {
    reelsData += `${reel.video_duration}, ${reel.view_count}, ${reel.video_analysis.replace(/\n/g, "<br>")}, ${reel.text.replace(/\n/g, "<br>")},  ${reel.video_transcription.replace(/\n/g, "<br>")}\n\n`;
  });


     let text = `Далее будут приведены несколько сценариев роликов reels с описанием о чем видеоряд, а также субтитрами. Эти reels  являются популярными  и набрали много тысяч просмотров. Тебе необходимо проанализировать сюжеты, описание, субтитры, длительность ролика, заголовок, смыслы и действовать как первоклассный специалист по reels. Твоя задача проанализировать приведенные ниже reels  и составить как  минимум 5 идей со сценариями для моего продукта.
                 Мой продукт - это ${product}
                \n
                 Далее привожу сценарии  и описание видеоряд популярных видео.
                 ${reelsData}\n
                 \n
                 Учитывай боль, желания, потребности моей целевой аудитории, чтобы максимально хорошо адаптировать сюжет ролика под мой продукт или услугу. Очень важно адаптировать идеи из сценариев ниже под мою аудиторию и мой продукт. Будь креативным и адаптируй сценарии, которые описаны выше, под моих потенциальных клиентов.
                 Обрати внимание, что крайне важным для успеха reels, чтобы он набрал много просмотров, является цепляющий заголовок. Заголовок должен привлекать внимание, быть интригующим или эмоциональным. Избегай общий фраз и клише.
                 Предложи не менее 5 сценариев для привлечения внимания к моему продукту.\n\n
    `;

  return text;
}

function autoResizeAllTextAreas(){
    for(var i=1; i< globalPrompt.length;i++){
        textarea = document.getElementById("answerDiv"+i);
        if(textarea)
            autoResize(textarea);
     }
}
//to work with chatgpt history
let globalPrompt = new Array();
globalPrompt.length = 0;
function initializePrompt(prompt){

      globalPrompt = [{
         role: 'system',
         content: 'Действуй как профессиональный SMM  менеджер и reels мейкер'
      }];
       addPrompt(prompt, 'user')
       return globalPrompt
}

function addPrompt(prompt, role){
       globalPrompt.push({
          role: role,
          content: prompt
       });

}

async function sendToGptTheReel(){
   document.getElementById("buttonSend").disabled = true;
   var productArea = document.getElementById('market');
   var table = $('#example').DataTable();
   var selectedRows = table.rows({ selected: true }).data().toArray();
   productArea.style.enabled = "False";
   prompt = populateText(productArea.value, selectedRows)
   initializePrompt(prompt)
   requestGptAnswer()
}


async function requestGptAnswer(){
    $( "#gptprogressbar" ).show();
    $( "#answerGroup" ).hide();
    $( "#market" ).attr("disabled", true);
    $( "#gptprogressbar" ).progressbar({
        value: false
    });
    $( "#gptProgressBarLabel" ).text(i18n.loading);

    fetchResponseReels(globalPrompt).then(response => {
              const reader = response.body.getReader();
            function readStream() {
            let contentFinalResult = "";
              return reader.read().then(({ done, value }) => {
                if (done) {
                  return contentFinalResult;
                }
                let jsonString = new TextDecoder().decode(value).replace(/data:\s*/g, '');
                 $( "#gptprogressbar" ).hide();
                 addPrompt(jsonString, 'system')
                 $( "#answerGroup" ).show();
                 displayResponse()
              });
            }
            return readStream();
          })
          .catch(error => {
            console.error('Error:', error);
            return "error";
          });
}

function autoResize(textarea) {
  textarea.style.height = "auto"; // Reset the height to its default auto value
  textarea.style.height = textarea.scrollHeight + "px"; // Set the height to match the content
}
function scrollToBottom() {
 var answerGroup = document.getElementById('answerGroup');

 // Scroll to the bottom of the scrollbar
 answerGroup.scrollTop = answerGroup.scrollHeight;


}
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
    globalPrompt.splice(answerId);
    requestGptAnswer();

}

function additionalReelsQuestion(){
    const additionalReelsQuestion = document.getElementById('gptAdditionalQuestion')
    addPrompt(additionalReelsQuestion.value, 'user')
    additionalReelsQuestion.value = ""
    requestGptAnswer();
}


function displayResponse() {

    document.getElementById("responseContainer").style.display = "block";
    const responseContainer = document.getElementById('responseContainer');
    let responseText = ""
    var copyButtonLabel = "";
    for(var i=1; i< globalPrompt.length; i++) {
      let buttons="";
      item = globalPrompt[i];
      copyButtonLabel = "Copy";
      if(item.role == "system") {
        //copy answer
        copyButtonLabel = "Скопировать ответ"
        buttons =  "<button class='btn btn-primary' onclick='regenerateAnswer("+ i +")'>перегенерировать</button>&nbsp;&nbsp;";
        responseText = responseText +  "<label for='answerDiv"+i+ "'>Это приглашение, которое мы сделаем для чата GPT.</label>"
      } else {
      //copy prompt
        copyButtonLabel = "Скопировать запрос"
        responseText = responseText +  "<label for='answerDiv"+i+ "'>Это ChatGPT. Ответ на наш вопрос.</label>"
      }

      buttons += "<button class='btn btn-primary' onclick='copyAnswer("+ i +")'>"+ copyButtonLabel +"</button>";
      responseText = responseText + "<div class='form-group' ><textarea  class='form-control' id='answerDiv"+i+ "' rows='4' oninput='autoResize(this)'>" + item.content + "</textarea><br>" + buttons + "</div>";
      responseContainer.innerHTML = responseText;
      document.getElementById("gptDivAdditionalQuestion").style.display = "block";

      //once we add the textarea to screen we then make sure it autoresize to match the content it has on it.
      autoResizeAllTextAreas();
      scrollToBottom() ;

    };
}