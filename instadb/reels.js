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
    "columnAnalysis": "Анализ",
    "columnTranscription": "Транскрипция",
    "columnTextOnVideo": "Текст на видео",
    "columnText": "Текст",
    "columnVideo": "Видео",
    "title": "Reels Database",
      "searchLabel": "Поиск",
      "searchUserNameForm": "Введите имя пользователя Instagram",
      "searchReelsForm": "Введите количество",
      "searchReels": "Количество Reels:",
      "searchButton": "Поиск"
  };
var i18n = i18nRussian;
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
        dialog.dialog( "open" );
        return;
    }

     var searchButton = $("button.btn.btn-secondary:first");
    searchButton.click();
    syncSleep(1000);
    var searchButton = $("body");
    searchButton.click();

    var dtSearchDiv = document.querySelector('.dt-search');
    dtSearchDiv.innerHTML = `
        <div id="progressbar">
            <div class="progress-label">Loading...</div>
        </div>`;

   $( "#progressbar" ).progressbar({
        value: false
   });
    // Construct the URL for the request
    var apiUrl = 'https://xvzd4kqxcbg5x6yrrf7vy5fpiu0paque.lambda-url.eu-central-1.on.aws?account=' + encodeURIComponent(searchUserValue) + '&nrReels=' + encodeURIComponent(numberOfReelsValue);

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
    syncSleep(1000);
    var searchButton = $("body");
    searchButton.click();

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
    userXhr.open('GET', 'https://f4m7goevkzwb3wwft5wwis6k4i0sulif.lambda-url.eu-central-1.on.aws/?users=true', false);
    userXhr.send();

    if (userXhr.status === 200) {
      users = JSON.parse(userXhr.responseText);
      // Do something with users
    } else {
      console.error('Failed to fetch users');
    }
}

 function loadJSON() {
    var table = $('#example').DataTable({
              ajax: {
                url: 'https://f4m7goevkzwb3wwft5wwis6k4i0sulif.lambda-url.eu-central-1.on.aws/?reels=true',
                dataSrc: '' // Use an empty string to indicate that the data should be used directly without any modification
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
                     title: i18n.columnTextOnVideo,
                     render: function(data, type, row) {
                         if (data)
                             var formattedText = data.trim();
                         else
                             var formattedText = "";
                         return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                     }
                 },
                 {
                     data: 'text_on_video',
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
//                       searchPanes: {
//                           clearMessage: 'Clear Filters',
//                           emptyPanes: 'There are no panes to display. :/',
//                           collapse: { 0: 'Search Options', _: 'Search Options (%d)' },
//                            title: {
//                               _: 'Filters Selected - %d',
//                               0: 'No Filters Selected',
//                               1: 'One Filter Selected',
//
//                             }
//                       },
                         url: '//cdn.datatables.net/plug-ins/2.0.0/i18n/ru.json',
                               //cdn.datatables.net/plug-ins/2.0.0/i18n/es-ES.json
                               //cdn.datatables.net/plug-ins/2.0.0/i18n/pl.json
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
                            },
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
               { targets: [12], visible: false } // Hide columns 1 and 2 initially
             ],
    });


        table
            .row(0)
            .draw()
            .searchPanes.rebuildPane();

     $('#example tbody').on('click', 'td:nth-child(1)', function () {

                  var cell = $(this);
                  console.log(cell)
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
    userModal.find('#modalTextOnVideo').text(reelsDetails.text_on_video);
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

function replaceSearchDiv(){
   var dtSearchDiv = document.querySelector('.dt-search');
   dtSearchDiv.innerHTML = `
       <div id="searchDiv" class="searchDiv">
           <label for="searchUser" class="form-label">` + i18n['searchLabel'] + `</label>&nbsp;
           <input type="text" class="form-control" id="searchUser" placeholder="` + i18n['searchUserNameForm'] + `" aria-describedby="searchButton">
            &nbsp;
           <label for="numberOfReels" class="form-label">` + i18n['searchReels'] + `</label>&nbsp;
           <input type="number" class="form-control" id="numberOfReels" placeholder="` + i18n['searchReelsForm'] + `" aria-describedby="searchButton">
            &nbsp;
           <button class="btn btn-primary" type="button" onclick="searchNewReels()" id="searchButton">` + i18n['searchButton'] + `</button>
       </div>`;

}
 $(document).ajaxComplete(function() {
    replaceSearchDiv();
});
