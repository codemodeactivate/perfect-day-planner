let perfectDay;
let optionPairCount = 0;
window.onload = async function() {
    const url = new URL(window.location.href);
    const perfectDayId = url.pathname.split('/').slice(-2, -1)[0]; // Assuming the ID is the second-to-last segment in the URL

    if (!perfectDayId) {
      console.error('Perfect Day ID is missing in the URL.');
      return;
    }

    const response = await fetch(`/api/perfect-days/${perfectDayId}`);
    console.log(`/api/perfect-days/${perfectDayId}`);
    perfectDay = await response.json();
    // Populate the form with the existing OptionSets.
    for (let option of perfectDay.options) {
      addOption(option);
    }
  };
document.addEventListener('DOMContentLoaded', (event) => {
    const addOptionButton = document.getElementById('addOptionButton');
    const optionsContainer = document.getElementById('optionsContainer');
    optionPairCount = optionsContainer.getElementsByClassName('option-pair').length;


    const createOption = (number) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'mb-3 option-input';

      const textLabel = document.createElement('label');
      textLabel.htmlFor = `dayOption${optionPairCount}${number}`;
      textLabel.innerText = `Option ${number} Description`;

      const textInput = document.createElement('textarea');
      textInput.className = 'form-control';
      textInput.id = `dayOption${optionPairCount}${number}`;
      textInput.name = `options[${optionPairCount}].option${number}.text`;
      textInput.placeholder = `Option ${number} Description`;
      textInput.rows = '3';

      const urlLabel = document.createElement('label');
      urlLabel.htmlFor = `dayOption${optionPairCount}${number}Url`;
      urlLabel.innerText = `Option ${number} Image URL`;

      const urlInput = document.createElement('input');
      urlInput.type = 'url';
      urlInput.className = 'form-control mt-2';
      urlInput.id = `dayOption${optionPairCount}${number}Url`;
      urlInput.name = `options[${optionPairCount}].option${number}.image`;
      urlInput.placeholder = `Option ${number} Image URL`;

      optionDiv.appendChild(textLabel);
      optionDiv.appendChild(textInput);
      optionDiv.appendChild(urlLabel);
      optionDiv.appendChild(urlInput);

      return optionDiv;
    };

    const addOption = () => {
      optionPairCount++;

      const optionPairDiv = document.createElement('div');
      optionPairDiv.className = 'mb-5 option-pair row';

      const option1Div = createOption(1);
      const option2Div = createOption(2);

      option1Div.className += ' col-lg-6';
      option2Div.className += ' col-lg-6';

      const optionPairLabel = document.createElement('h5');
      optionPairLabel.innerText = `Option Pair ${optionPairCount}`;

      optionPairDiv.appendChild(optionPairLabel);
      optionPairDiv.appendChild(option1Div);
      optionPairDiv.appendChild(option2Div);

      optionsContainer.appendChild(optionPairDiv);
    };

    addOptionButton.addEventListener('click', addOption);
  });


  document.addEventListener('DOMContentLoaded', (event) => {
    const updateFormFields = (data) => {
      const titleElement = document.getElementById('title');
      const descriptionElement = document.getElementById('dayDescription');

      if (titleElement) {
        titleElement.value = data.title || '';
      } else {
        console.error('Title element not found');
      }

      if (descriptionElement) {
        descriptionElement.value = data.description || '';
      } else {
        console.error('Description element not found');
      }

      // Update other form fields if necessary
    };

    document.querySelector('#editPerfectDayForm').addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const id = formData.get('id');

      const url = `/api/perfect-days/${id}`;

      try {
        const response = await fetch(url, {
          method: 'PUT',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const updatedPerfectDay = await response.json();
          console.log(updatedPerfectDay);

          // Retrieve the updated data and update the form fields
          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              updateFormFields(data);
            })
            .catch((error) => {
              console.error('Error:', error);
            });

          console.log('Perfect Day updated successfully.');
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });

    // Fetch the initial data and update the form fields
    const id = document.getElementById('id').value;
    const initialDataUrl = `/api/perfect-days/${id}`;

    fetch(initialDataUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        updateFormFields(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
