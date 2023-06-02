let perfectDay;
let optionPairCount = 0;

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const perfectDayId = urlParams.get('id'); // Assuming the ID is passed as a query parameter in the URL
    const response = await fetch(`/api/perfect-days/${perfectDayId}`);
    const perfectDay = await response.json();
  // Populate the form with the existing OptionSets.
  for (let option of perfectDay.options) {
    addOption(option);
  }
};
document.addEventListener('DOMContentLoaded', (event) => {
    const addOptionButton = document.getElementById('addOptionButton');
    const optionsContainer = document.getElementById('optionsContainer');
    let optionPairCount = optionsContainer.getElementsByClassName('option-pair').length;

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
