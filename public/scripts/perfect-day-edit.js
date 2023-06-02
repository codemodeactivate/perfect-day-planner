let perfectDay;
let optionPairCount = 0;

window.onload = async function() {
    const id = window.location.pathname.split('/').pop();

    const response = await fetch(`/api/perfect-days/${id}`);
    perfectDay = await response.json();
  // Populate the form with the existing OptionSets.
  for (let option of perfectDay.options) {
    addOption(option);
  }
};

document.addEventListener('DOMContentLoaded', (event) => {
  const addOptionButton = document.getElementById('addOptionButton');
  const optionsContainer = document.getElementById('optionsContainer');

  addOptionButton.addEventListener('click', () => {
    addOption();
  });

  function addOption(optionData = { option1: { text: '', image: '' }, option2: { text: '', image: '' } }) {
    optionPairCount++;

    const createOption = (number) => {
      const optionDiv = document.createElement('div');
      // etc...
      textInput.value = optionData[`option${number}`].text;
      urlInput.value = optionData[`option${number}`].image;
      // etc...
    };

    const option1Div = createOption(1);
    const option2Div = createOption(2);
    // etc...
  }

  document.querySelector('#editPerfectDayForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');

    // Convert formData to a regular object, and add the 'options' property.
    const data = Object.fromEntries(formData);
    data.options = [];
    for (let i = 0; i < optionPairCount; i++) {
      data.options.push({
        option1: {
          text: formData.get(`options[${i}].option1.text`),
          image: formData.get(`options[${i}].option1.image`)
        },
        option2: {
          text: formData.get(`options[${i}].option2.text`),
          image: formData.get(`options[${i}].option2.image`)
        },
      });
    }

    fetch(`/api/perfect-days/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  });
});
