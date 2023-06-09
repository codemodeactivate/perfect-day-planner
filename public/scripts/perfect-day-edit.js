let perfectDay;
let optionPairCount = 0;

const url = new URL(window.location.href);
const perfectDayId = url.pathname.split("/").slice(-2, -1)[0]; // Assuming the ID is the second-to-last segment in the URL


//trying to get a visual status of whether the option is done or not but couldn't figure this out in time.


document.addEventListener("DOMContentLoaded", () => {
  console.log("Number of options:", perfectDay.options.length);
  perfectDay.options.forEach(option => {
    console.log("Option ID:", option.id);
    console.log("Option:", option);
    const option1Input = document.querySelector(`#dayOption${option.id}option1`);
    const option2Input = document.querySelector(`#dayOption${option.id}option2`);

    console.log("Option 1 Input:", option1Input);
    console.log("Option 2 Input:", option2Input);

    if (option1Input) {
      const parentDiv = option1Input.parentElement;
      console.log("Selected Option:", option.selected_option?.SelectedOption);
      console.log("Option 1 Value:", option.option1);

      if (option.selected_option && option.selected_option.SelectedOption === option.option1) {
        console.log(`Option 1 is selected for Option ${option.id}`);
        parentDiv.classList.add("selected-option");
      } else {
        parentDiv.classList.remove("selected-option");
      }
    }

    if (option2Input) {
      const parentDiv = option2Input.parentElement;
      console.log("Selected Option:", option.selected_option?.SelectedOption);
      console.log("Option 2 Value:", option.option2);

      if (option.selected_option && option.selected_option.SelectedOption === option.option2) {
        console.log(`Option 2 is selected for Option ${option.id}`);
        parentDiv.classList.add("selected-option");
      } else {
        parentDiv.classList.remove("selected-option");
      }
    }
  });
});


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
    optionPairDiv.style.marginBottom = "20px"; // Add a margin-bottom style
    const optionIndex = optionsContainer.children.length;
    // const option1Div = createOption(1, optionData ? optionData.option1 : null, optionIndex);
    // const option2Div = createOption(2, optionData ? optionData.option2 : null, optionIndex);
    const option1Div = createOption(1, optionData ? optionData.option1 : null, optionPairCount);
    const option2Div = createOption(2, optionData ? optionData.option2 : null, optionPairCount);
    option1Div.className += " col-lg-6";
    option2Div.className += " col-lg-6";

    const optionPairLabel = document.createElement("h5");
    //optionPairLabel.innerText = `Option Pair ${optionIndex}`;

    optionPairDiv.appendChild(optionPairLabel);
    optionPairDiv.appendChild(option1Div);
    optionPairDiv.appendChild(option2Div);

    optionsContainer.appendChild(optionPairDiv);
    optionPairCount++;
    return [option1Div, option2Div];
  };


  const updateFormFields = (data) => {
    const day = data.day;
    // console.log(data);
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
    // console.log(day);
    // console.log("DAY", { day });













    // Update other form fields if necessary

    // Update options fields
    const options = day.options;
    const optionPairs = Array.from(document.querySelectorAll(".input-group"));

    optionPairs.forEach((optionPair, index) => {
      const option1TextElement = optionPair.querySelector(`input[id='dayOption${index}option1']`);
      const option1ImageElement = optionPair.querySelector(`input[id='dayOption${index}Img1']`);
      const option2TextElement = optionPair.querySelector(`input[id='dayOption${index}option2']`);
      const option2ImageElement = optionPair.querySelector(`input[id='dayOption${index}Img2']`);

      if (option1TextElement) {
        option1TextElement.value = options[index]?.option1?.text || "";
      }

      if (option1ImageElement) {
        option1ImageElement.value = options[index]?.option1?.image || "";
      }

      if (option2TextElement) {
        option2TextElement.value = options[index]?.option2?.text || "";
      }

      if (option2ImageElement) {
        option2ImageElement.value = options[index]?.option2?.image || "";
      }
    });
  }

  window.onload = async function () {
    // console.log("Window loaded");
    const editPerfectDayForm = document.querySelector("#editPerfectDayForm");
    function getOptionsData() {
        const optionPairs = Array.from(document.querySelectorAll(".option-pair"));

        return optionPairs.map((optionPair, index) => {

          const option1TextElement = optionPair.querySelector(`textarea[name="options[${index}].option1.text"]`);
          const option1ImageElement = optionPair.querySelector(`input[name="options[${index}].option1.image"]`);
          const option2TextElement = optionPair.querySelector(`textarea[name="options[${index}].option2.text"]`);
          const option2ImageElement = optionPair.querySelector(`input[name="options[${index}].option2.image"]`);
          const optionIdElement = optionPair.querySelector(`input[name="options[${index}].id"]`);
          // console.log("Get Options", {option1TextElement});
          // console.log("INDEX", {index});
          //the index doesn't start at the proper number when the window is reloaded.

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
            //console.log(optionsPair);
            // console.log(options);
            const formData = new FormData(event.target);
            //console.log(event.log);
            //console.log(formData.get("id"));
            const id = perfectDayId;



            const jsonData = {
              id,
              title: formData.get("title"),
              description: formData.get("description"),
              options
            };
            console.log("JSON", jsonData);
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

          // editPerfectDayForm.addEventListener("submit", () => {
          //   //console.log("Form Data:", new FormData(editPerfectDayForm));


          // });

    }





  if (!perfectDayId) {
    console.error("Perfect Day ID is missing in the URL.");
    return;
  }

  const response = await fetch(`/api/perfect-days/${perfectDayId}`);
    // console.log("Response:", response);
    perfectDay = await response.json();
    // console.log("Perfect Day:", perfectDay);
    const optionsContainer = document.getElementById("optionsContainer");
    updateFormFields(perfectDay);
  if (!optionsContainer) {
    console.error("Options container not found.");
    return;
  }


  if (perfectDay.options) {
    // console.log("Adding option:", optionData);
    optionPairCount = perfectDay.options.length;
    for (let option of perfectDay.options) {
      addOption(option, optionsContainer);
    }
  }


  const addOptionButton = document.getElementById("addOptionButton");
  addOptionButton.addEventListener("click", () => {
    // console.log("Add option button clicked");
    addOption(null,optionsContainer);
    //optionPairCount++;
  });





};
