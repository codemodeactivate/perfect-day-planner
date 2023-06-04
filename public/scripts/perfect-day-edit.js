let perfectDay;
let optionPairCount = 0;

const createOption = (number, optionData) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "mb-3 option-input";

    const textLabel = document.createElement("label");
    textLabel.htmlFor = `dayOption${optionPairCount}${number}`;
    textLabel.innerText = `Option ${number} Description`;

    const textInput = document.createElement("textarea");
    textInput.className = "form-control";
    textInput.id = `dayOption${optionPairCount}${number}`;
    textInput.name = `options[${optionPairCount}].option${number}Text`;
    textInput.placeholder = `Option ${number} Description`;
    textInput.rows = "3";

    const urlLabel = document.createElement("label");
    urlLabel.htmlFor = `dayOption${optionPairCount}${number}Url`;
    urlLabel.innerText = `Option ${number} Image URL`;

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.className = "form-control mt-2";
    urlInput.id = `dayOption${optionPairCount}${number}Url`;
    urlInput.name = `options[${optionPairCount}].option${number}ImageUrl`;
    urlInput.placeholder = `Option ${number} Image URL`;

    if (optionData) {
      textInput.value = optionData.text || "";
      urlInput.value = optionData.image || "";
    } else {
      textInput.value = "";
      urlInput.value = "";
    }

    optionDiv.appendChild(textLabel);
    optionDiv.appendChild(textInput);
    optionDiv.appendChild(urlLabel);
    optionDiv.appendChild(urlInput);

    return optionDiv;
  };

const addOption = (optionData, optionsContainer) => {
    // console.log("Adding option:", optionData);
    const optionPairDiv = document.createElement("div");
    optionPairDiv.className = "mb-5 option-pair row";

    const option1Div = createOption(1, optionData ? optionData.option1 : null);
    const option2Div = createOption(2, optionData ? optionData.option2 : null);

    option1Div.className += " col-lg-6";
    option2Div.className += " col-lg-6";

    const optionPairLabel = document.createElement("h5");
    optionPairLabel.innerText = `Option Pair ${optionPairCount}`;

    optionPairDiv.appendChild(optionPairLabel);
    optionPairDiv.appendChild(option1Div);
    optionPairDiv.appendChild(option2Div);

    optionsContainer.appendChild(optionPairDiv);
    optionPairCount++;
    return [option1Div, option2Div];
  };


const updateFormFields = (data) => {
    const day = data.day; // Access the 'day' object within the 'data' object
    const titleElement = document.getElementById("title");
    const descriptionElement = document.getElementById("dayDescription");

    if (titleElement) {
      titleElement.value = day.title || "";
    } else {
      console.error("Title element not found");
    }

    if (descriptionElement) {
      descriptionElement.value = day.description || "";
    } else {
      console.error("Description element not found");
    }

    // Update other form fields if necessary
  };


  window.onload = async function () {
    console.log("Window loaded");
    const editPerfectDayForm = document.querySelector("#editPerfectDayForm");
    function getOptionsData() {
        const optionPairs = Array.from(document.querySelectorAll(".option-pair"));

        return optionPairs.map((optionPair, index) => {
          const option1TextElement = optionPair.querySelector(`textarea[id='dayOption${index}1']`);
          const option1ImageElement = optionPair.querySelector(`input[id='dayOption${index}1Url']`);
          const option2TextElement = optionPair.querySelector(`textarea[id='dayOption${index}2']`);
          const option2ImageElement = optionPair.querySelector(`input[id='dayOption${index}2Url']`);

          return {
            option1: {
              text: option1TextElement ? option1TextElement.value : "",
              image: option1ImageElement ? option1ImageElement.value : ""
            },
            option2: {
              text: option2TextElement ? option2TextElement.value : "",
              image: option2ImageElement ? option2ImageElement.value : ""
            }
          };
        });
      }





    if (!editPerfectDayForm) {
      console.error("Edit form not found");
    } else {
        editPerfectDayForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(event.target);
            const id = formData.get("id");

            const options = getOptionsData();
            console.log('Options:', options); // Let's log the options before they are added to the jsonData object.

            const jsonData = {
              id,
              title: formData.get("title"),
              description: formData.get("description"),
              options: options,
            };

            console.log("Form Data:", Object.fromEntries(formData));
            console.log("JSON Data:", jsonData);
            console.log("Updated data:", jsonData);

            const url = `/api/perfect-days/${id}`;

            try {
              const response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(jsonData),
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                console.log("Perfect Day updated successfully.");
              } else {
                console.error("Error:", response.status);
              }
            } catch (error) {
              console.error("Error:", error);
            }
          });

          editPerfectDayForm.addEventListener("submit", () => {
            console.log("Form Data:", new FormData(editPerfectDayForm));
          });







    }

  const url = new URL(window.location.href);
  const perfectDayId = url.pathname.split("/").slice(-2, -1)[0]; // Assuming the ID is the second-to-last segment in the URL




  if (!perfectDayId) {
    console.error("Perfect Day ID is missing in the URL.");
    return;
  }

  const response = await fetch(`/api/perfect-days/${perfectDayId}`);
  console.log("Response:", response);
  perfectDay = await response.json();
  console.log("Perfect Day:", perfectDay);
  const optionsContainer = document.getElementById("optionsContainer");

  if (!optionsContainer) {
    console.error("Options container not found.");
    return;
  }


  if (perfectDay.options) {
    console.log("Adding option:", optionData);
    for (let option of perfectDay.options) {
      addOption(option, optionsContainer);
    }
  }


  const addOptionButton = document.getElementById("addOptionButton");
  addOptionButton.addEventListener("click", () => {
    console.log("Add option button clicked");
    addOption(null,optionsContainer);
    optionPairCount++;
  });


  updateFormFields(perfectDay);


};
