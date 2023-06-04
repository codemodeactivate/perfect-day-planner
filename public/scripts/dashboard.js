$(document).ready(function() {
    // Open the modal when the "Create New 'Perfect-Day'" button is clicked
    $('.btn-primary[data-target="#newDayModal"]').on('click', function() {
      $('#newDayModal').modal('show');
    });

    // Handle form submission
    $('#newDayForm').on('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the values from the form fields
      var title = $('#dayTitle').val();
      var description = $('#dayDescription').val();

      // Make an AJAX request to the server to create the new 'Perfect-Day'
      $.ajax({
        url: '/api/perfect-days', // This should match your server route for creating a new 'Perfect-Day'
        method: 'POST',
        data: {
          title: title,
          description: description
        },
        success: function(response) {
          // Handle the success response
          console.log('New Perfect-Day created:', response);

          // Close the modal
          $('#newDayModal').modal('hide');

          // Optionally, you can redirect to a different page or perform any other action
          // For example, redirect to the dashboard
          window.location.href = '/dashboard';
        },
        error: function(error) {
          // Handle the error response
          console.error('Failed to create Perfect-Day:', error);
        }
      });
    });
  });
