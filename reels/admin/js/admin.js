$(document).ready(function() {
    $('#userTable').DataTable({
        ajax: {
            url: 'https://zvo3uegtkk4lhnc7jtzabf6hdq0egsyx.lambda-url.eu-central-1.on.aws/?action=list',
            dataSrc: ''
        },
        columns: [
            { data: 'id' },
            { data: 'username' },
            { data: 'approved' },
            {
                data: null,
                render: function(data, type, row) {
                    if (!data.approved) {
                        return '<button onclick="approveUser(' + data.id + ')" class="btn btn-primary">Approve</button>';
                    } else {
                        return 'Approved';
                    }
                }
            }
        ]
    });
});

function approveUser(userId) {
    $.ajax({
        type: 'POST',
        url: 'approve_user.php',
        data: { userId: userId },
        success: function(response) {
            // Reload the datatable after approval
            $('#userTable').DataTable().ajax.reload();
        }
    });
}
