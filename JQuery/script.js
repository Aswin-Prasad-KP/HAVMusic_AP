$(document).ready(function () {
    $('#addBtn').click(function () {
        var task = $('#taskInput').val();
        if (task !== '') {
            $('#taskList').append('<li>' + task + '<span class="delete-btn">Delete</span></li>');
            $('#taskInput').val('');
        }
    });

    $(document).on('click', '.delete-btn', function () {
        var listItem = $(this).parent();
        listItem.animate({ opacity: 0 }, 300, function () {
            listItem.remove();
        });
    });
});