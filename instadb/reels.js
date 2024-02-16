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
         columns: [{
                 data: 'username',

             },
             {
                 data: 'url',
                 render: function(data, type, row) {
                     return '<a href="' + data + '" target="_blank">reel</a>';
                 },
             },

               {
                 data: 'like_count',
                 render: function(data, type, row) {
                     return data.toLocaleString(); // Example: 1,234
                 }
             },
             {
                 data: 'view_count',
                 render: function(data, type, row) {
                     return data.toLocaleString(); // Example: 1,234
                 }
             },
             {
                 data: 'comment_count',
                 render: function(data, type, row) {
                     return data.toLocaleString(); // Example: 1,234
                 }
             },
             {
                 data: 'taken_at',
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
                data: 'video_duration'
               },
             {
                data: null,
                render: function(data, type, row) {
                          var userDetails = users.find(user => user.username === row.username);
                          var factor = Math.pow(10, 2);
                         return Math.round((((row.like_count + row.comment_count)/userDetails.follower_count) * 100)* factor) / factor;

                   }
            },
             {
                 data: 'video_analysis',
                 render: function(data, type, row) {
                     var formattedText = data.trim();
                     return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                 }
             },
             {
                 data: 'video_transcription',
                 render: function(data, type, row) {
                     var formattedText = data.trim();
                     return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                 }
             },
             {
                 data: 'text_on_video',
                   render: function(data, type, row) {
                    var formattedText = data.trim();
                    return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                }
             },
             {
                 data: 'text',
                    render: function(data, type, row) {
                     var formattedText = data.trim();
                     return '<textarea class="form-control" rows="3"  style="width: 450px;">'+formattedText+'</textarea>';
                 }
             },
             {
                 data: 'video_url',
                 render: function(data, type, row) {
                     return '<a href="' + data + '" target="_blank">Video</a>';
                 }
             },

         ],
         lengthMenu: [
             [20, 50, -1],
             [20, 50, 'All']
         ],
          searchPanes: {
                threshold: 0.2,
                initCollapsed: true
            },

         dom: 'PB<"top"l>rt<"bottom"ip><"clear">',
         fixedColumns: true,
         fixedHeader: true,
         rowReorder: true,
         colReorder: true,
         scrollY: '350px',
         scrollX: true,
         scrollCollapse: true,
         select: true,
         buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'createState', 'savedStates'],
//         columnDefs: [
//               { targets: [12], visible: false } // Hide columns 1 and 2 initially
//             ],


     });
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

function formatUserDetails(userDetails) {
    // Create HTML structure for user details
    var html = '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">';
    html += '<tr><td><strong>Full Name:</strong></td><td>' + userDetails.full_name + '</td></tr>';
    html += '<tr><td><strong>Category:</strong></td><td>' + userDetails.category + '</td></tr>';
    // Add more properties as needed...
    html += '</table>';
    return html;
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

document.getElementById('searchButton').addEventListener('click', function () {
   var searchUserValue = document.getElementById('searchUser').value;
   var numberOfReelsValue = document.getElementById('numberOfReels').value;
    if (searchUserValue.trim() === '' || numberOfReelsValue.trim() === '') {
        dialog = $( "#dialog-message" )
        dialog.dialog( "open" );
        return;
    }


   document.getElementById('progressbar').style.display = 'block';
   $( "#progressbar" ).progressbar({
        value: false
   });
   document.getElementById('searchDiv').style.display = 'none';


    // Construct the URL for the request
    var apiUrl = 'https://xvzd4kqxcbg5x6yrrf7vy5fpiu0paque.lambda-url.eu-central-1.on.aws?account=' + encodeURIComponent(searchUserValue) + '&nrReels=' + encodeURIComponent(numberOfReelsValue);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Process the retrieved data, e.g., update the table with new results
            console.log('Data received:', data);
            loadUsers();
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error fetching data:', error);
        })
        .finally(() => {
            // Hide the progress bar when the request is complete
            document.getElementById('progressbar').style.display = 'none';
            document.getElementById('searchDiv').style.display = 'flex';
        });
});

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
