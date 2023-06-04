let perfectDay;
let optionPairCount = 0;

const createOption = (number, optionData, index) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "mb-3 option-input";

    const textLabel = document.createElement("label");
    textLabel.htmlFor = `dayOption${index}${number}`;
    textLabel.innerText = `Option ${number} Description`;

    const textInput = document.createElement("textarea");
    textInput.className = "form-control";
    textInput.id = `dayOption${index}${number}`;
    textInput.name = `options[${index}].option${number}.text`;
    textInput.placeholder = `Option ${number} Description`;
    textInput.rows = "3";

    const urlLabel = document.createElement("label");
    urlLabel.htmlFor = `dayOption${index}${number}Url`;
    urlLabel.innerText = `Option ${number} Image URL`;

    const urlInput = document.createElement("input");
    urlInput.type = "url";
    urlInput.className = "form-control mt-2";
    urlInput.id = `dayOption${index}${number}Url`;
    urlInput.name = `options[${index}].option${number}.image`;
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
    const optionPairDiv = document.createElement("div");
    optionPairDiv.className = "mb-5 option-pair row";

    const optionIndex = optionsContainer.children.length;
    const option1Div = createOption(1, optionData ? optionData.option1 : null, optionIndex);
    const option2Div = createOption(2, optionData ? optionData.option2 : null, optionIndex);

    option1Div.className += " col-lg-6";
    option2Div.className += " col-lg-6";

    const optionPairLabel = document.createElement("h5");
    optionPairLabel.innerText = `Option Pair ${optionIndex}`;

    optionPairDiv.appendChild(optionPairLabel);
    optionPairDiv.appendChild(option1Div);
    optionPairDiv.appendChild(option2Div);

    optionsContainer.appendChild(optionPairDiv);

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
          const option1TextElement = optionPair.querySelector(`textarea[name="options[${index}].option1.text"]`);
          const option1ImageElement = optionPair.querySelector(`input[name="options[${index}].option1.image"]`);
          const option2TextElement = optionPair.querySelector(`textarea[name="options[${index}].option2.text"]`);
          const option2ImageElement = optionPair.querySelector(`input[name="options[${index}].option2.image"]`);
          const optionIdElement = optionPair.querySelector(`input[name="options[${index}].id"]`);

          return {
            id: optionIdElement ? optionIdElement.value : null,
            option1: {
              text: option1TextElement ? option1TextElement.value : "",
              image: option1ImageElement ? option1ImageElement.value : "",
            },
            option2: {
              text: option2TextElement ? option2TextElement.value : "",
              image: option2ImageElement ? option2ImageElement.value : "",
            },
          };
        });
      }





    if (!editPerfectDayForm) {
      console.error("Edit form not found");
    } else {
        editPerfectDayForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const options = getOptionsData(); // Add this line to retrieve the options data

            const formData = new FormData(event.target);
            const id = formData.get("id");

            const jsonData = {
              id,
              title: formData.get("title"),
              description: formData.get("description"),
              options: options,
            };

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
    //optionPairCount++;
  });


  updateFormFields(perfectDay);


};
