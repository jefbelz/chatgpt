 var jsonData; // Variable to store JSON data

 var userXhr = new XMLHttpRequest();
userXhr.open('GET', 'users.json', false);
userXhr.send();

if (userXhr.status === 200) {
  var users = JSON.parse(userXhr.responseText);
  // Do something with users
} else {
  console.error('Failed to fetch users');
}


 function loadJSON() {
     var resultDiv = document.getElementById('result');
     var xhr = new XMLHttpRequest();

     xhr.onreadystatechange = function() {
         if (xhr.readyState === 4) {
             if (xhr.status === 200) {
                 try {
                     var jsonData = JSON.parse(xhr.responseText);
                     console.log(jsonData)


                     $('#example').DataTable({
                         data: jsonData,
                         rowGroup: {
                                dataSrc: 'username',
                            },
                            drawCallback: function (settings) {
                                // Initialize nested DataTable for reels
                                initNestedDataTableForReels();
                            },



//                         columns: [{
//                                 data: 'username',
//                                 width: '4%',
//
//                             },
//                             {
//                                 data: 'url',
//                                 render: function(data, type, row) {
//                                     return '<a href="' + data + '" target="_blank">reel</a>';
//                                 },
//                                 width: '4%'
//                             },
//
//                               {
//                                 data: 'like_count',
//                                 width: '4%',
//                                 render: function(data, type, row) {
//                                     return data.toLocaleString(); // Example: 1,234
//                                 }
//                             },
//                             {
//                                 data: 'view_count',
//                                 width: '4%',
//                                 render: function(data, type, row) {
//                                     return data.toLocaleString(); // Example: 1,234
//                                 }
//                             },
//                             {
//                                 data: 'comment_count',
//                                 width: '4%',
//                                 render: function(data, type, row) {
//                                     return data.toLocaleString(); // Example: 1,234
//                                 }
//                             },
//                             {
//                                 data: 'taken_at',
//                                 width: '4%',
//                                 render: function(data, type, row) {
//                                     // Convert the ISO date string to a Date object
//                                     var date = new Date(data);
//                                     var formattedDate = date.toLocaleString('en-RU', {
//                                         year: '2-digit',
//                                         month: '2-digit',
//                                         day: '2-digit',
//                                         hour: '2-digit',
//                                         minute: '2-digit'
//                                     });
//
//                                     return formattedDate;
//                                 }
//                             },{
//                                 data: 'video_analysis',
//                                 width: '16%',
//                                 render: function(data, type, row) {
//                                     var formattedText = data.replace(/\n/g, '<br>');
//                                     return formattedText;
//                                 }
//                             },
//                             {
//                                 data: 'video_transcription',
//                                 width: '17%',
//                                 render: function(data, type, row) {
//                                     var formattedText = data.replace(/\n/g, '<br>');
//                                     return formattedText;
//                                 }
//                             },
//                             {
//                                 data: 'text_on_video',
//                                 width: '15%',
//                                 render: function(data, type, row) {
//                                     var formattedText = data.replace(/\n/g, '<br>');
//                                     return formattedText;
//                                 }
//                             },
//                             {
//                                 data: 'text',
//                                 width: '17%',
//                                 render: function(data, type, row) {
//                                     var formattedText = data.replace(/\n/g, '<br>');
//                                     return formattedText;
//                                 }
//                             },
//
//
//
//                             {
//                                 data: 'video_url',
//                                 render: function(data, type, row) {
//                                     return '<a href="' + data + '" target="_blank">Video</a>';
//                                 },
//                                 width: '4%'
//                             },
//                             {
//                                 data: 'video_duration',
//                                 width: '4%'
//                             },
                         ],
                         lengthMenu: [
                             [20, 50, -1],
                             [20, 50, 'All']
                         ],
                         scrollCollapse: true,
                         scrollY: '50vh',
                         scrollX: true,
                          scrollX: '50vh',
                          searchPanes: {
                                threshold: 0.5,
                                initCollapsed: true
                            },

<!--                         responsive: true,-->
                         dom: 'PB<"top"l>rt<"bottom"ip><"clear">',
                         fixedColumns: true,
                         fixedHeader: true,
                         rowReorder: true,
                         colReorder: true,
                         select: true,
                         buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'createState', 'savedStates']
                     });
                     $('#example tbody').on('click', 'td:nth-child(1)', function () {
                        var cell = $(this);
                        var row = cell.closest('tr');
                        var username = cell.text();

                        // Find user details in userXhr based on the clicked username
                        var userDetails = users.find(user => user.username === username);

                        // Display user details in a modal or expandable row
                        if (userDetails) {
                            toggleExpandableRow(row, userDetails);
                            showModal(userDetails)
                        }
                    });


                     resultDiv.innerHTML = "<pre>" + JSON.stringify(jsonData, null, 2) + "</pre>";
                 } catch (error) {
                     resultDiv.innerHTML = "Error parsing JSON file: " + error.message;
                 }
             } else {
                 resultDiv.innerHTML = "Error loading JSON file. Status: " + xhr.status;
             }
         }
     };

     function toggleExpandableRow(row, userDetails) {
        var table = $('#example').DataTable();
        var currentRow = table.row(row);

        if (currentRow.child.isShown()) {
            // This row is already open - close it
            currentRow.child.hide();
            row.removeClass('shown');
        } else {
            // Open this row with user details
            currentRow.child(showModal(userDetails)).show();
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

    function showModal(userDetails) {
        var userModal = $('#userDetailsModal');
        userModal.find('#modalPicture').attr('src', 'data:image/jpeg;base64,' + userDetails.profile_pic_url_hd);;
        userModal.find('#modalFullName').text(userDetails.full_name);
        userModal.find('#modalCategory').text(userDetails.category);
        userModal.find('#modalBiography').text(userDetails.biography);
        userModal.find('#modalFollowers').text(userDetails.follower_count);
        userModal.find('#modalFollowing').text(userDetails.following_count);
        userModal.find('#modalPhone').text(userDetails.contact_phone_number);
        return userModal.html();
    }

     xhr.open('GET', 'reels.json', true);
     xhr.send();
}

loadJSON();
