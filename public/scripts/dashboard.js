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

<<<<<<< HEAD
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
=======
      // Make an AJAX request to the server to create the new 'Perfect-Day'
      $.ajax({
        url: '/api/perfect-days', // This should match your server route for creating a new 'Perfect-Day'
        method: 'POST',
        data: {
          title: title,
          description: description,
          //guestKey: guestKey
        },
        success: function(response) {
          // Handle the success response
          console.log('New Perfect-Day created:', response);
>>>>>>> 925896016c2e2ddadd18d52bcbf7cd274cc7c073

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

<<<<<<< HEAD
  // Copy URL to clipboard
  $('#copyButton').on('click', function() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(window.location.href).select();
    document.execCommand("copy");
    $temp.remove();

    alert("URL copied to clipboard!");
  });
});


=======
  const dayId = document.getElementById('previewBtn').getAttribute('data-day-id');
  function showPreview(dayId, guestKey) {
    console.log('showPreview called with dayId:', dayId, 'guestKey:', guestKey);

    console.log(dayId);
    // Make a GET request to fetch the preview URL
    fetch(`/perfect-day/${dayId}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const guestKey = data.guestKey; // Extract the guestKey from the response JSON
        const previewUrl = `${window.location.origin}/perfect-day/${guestKey}/view`; // Use the extracted guestKey
        console.log('Preview URL:', previewUrl);
        //perfect-day/key/view
        // Update the URL display in your HTML
        const previewUrlElement = document.getElementById('previewUrl');
        const copyBtn = document.getElementById('copyBtn');
        copyBtn.style.display = 'inline-block'; // Show the copy button



        previewUrlElement.textContent = previewUrl;
      })
      .catch(error => console.error('Error:', error.message));
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
>>>>>>> 925896016c2e2ddadd18d52bcbf7cd274cc7c073
