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


  function showPreview() {
    const dayId = document.getElementById('previewBtn').getAttribute('data-day-id');
    console.log(dayId);
    // Make a GET request to fetch the preview URL
    fetch(`/perfect-day/${dayId}`)
      .then(response => response.json())
      .then(data => {
        const previewUrl = `/perfect-day/${data.day.guestKey}/view`; // Use the extracted guestKey property
        //console.log('Preview URL:', previewUrl);
        const previewUrlElement = document.getElementById('previewUrl');
        const copyBtn = document.getElementById('copyBtn');

        previewUrlElement.textContent = previewUrl;
        copyBtn.style.display = 'inline-block'; // Show the copy button
        // Update the URL display in your HTML
        //const previewUrlElement = document.getElementById('previewUrl');
        //previewUrlElement.textContent = previewUrl;
      })
      .catch(error => console.error('Error:', error));
  }


  function copyToClipboard() {
    const previewUrlElement = document.getElementById('previewUrl');
    const copyIndicator = document.getElementById('copyIndicator');

    // Copy the text to the clipboard
    const tempInput = document.createElement('input');
    tempInput.value = previewUrlElement.textContent;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    // Show the indicator briefly
    copyIndicator.style.display = 'inline';
    setTimeout(() => {
      copyIndicator.style.display = 'none';
    }, 1500);
  }
