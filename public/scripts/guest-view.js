console.log("LOADED");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM LOADED");
    setTimeout(() => {
        console.log("Timeout");
        document.querySelectorAll('.option-pick').forEach(option => {
            option.addEventListener('click', function(e) {
                console.log("Option Clicked");
                const optionId = this.getAttribute('data-option-id');
                const optionValue = this.getAttribute('data-option-value');

                saveSelectedOption(optionId, optionValue);
            });
        });
    }, 250);  // Adjust this delay as necessaryc
});


const saveSelectedOption = (optionId, optionValue) => {
    fetch('/api/selected-option', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            option_set_id: optionId,
            selectedOption: optionValue
        })
    })
    .then ( res => res.json())

    .then (data => {
        console.log(data);
    })
    .catch (error => {
        console.log('Error:', error);
    });
};












//below is somewhat old code from the dashboard view. Originally thought we'd need most if not all for this, but I think I
//get handlebars and packages a LITTLE better now. I'm leaving it here for now in case we need to reference it later.

// let perfectDay;
// let optionPairCount = 0;


// const createOption = (number, optionData) => {
//     const optionDiv = document.createElement("div");
//     optionDiv.className = "mb-3 option-input";

//     const textLabel = document.createElement("label");
//     textLabel.htmlFor = `dayOption${optionPairCount}${number}`;
//     textLabel.innerText = `Option ${number} Description`;

//     const textInput = document.createElement("textarea");
//     textInput.className = "form-control";
//     textInput.id = `dayOption${optionPairCount}${number}`;
//     textInput.name = `options[${optionPairCount}].option${number}.text`;
//     textInput.placeholder = `Option ${number} Description`;
//     textInput.rows = "3";

//     const urlLabel = document.createElement("label");
//     urlLabel.htmlFor = `dayOption${optionPairCount}${number}Url`;
//     urlLabel.innerText = `Option ${number} Image URL`;

//     const urlInput = document.createElement("input");
//     urlInput.type = "url";
//     urlInput.className = "form-control mt-2";
//     urlInput.id = `dayOption${optionPairCount}${number}Url`;
//     urlInput.name = `options[${optionPairCount}].option${number}.image`;
//     urlInput.placeholder = `Option ${number} Image URL`;

//     if (optionData) {
//         textInput.value = optionData[`option${number}`] || "";
//         urlInput.value = optionData[`option${number}_image`] || "";
//     }

//     optionDiv.appendChild(textLabel);
//     optionDiv.appendChild(textInput);
//     optionDiv.appendChild(urlLabel);
//     optionDiv.appendChild(urlInput);

//     return optionDiv;
// };
// // Define addOption function in the global scope
// const addOption = (optionData, optionsContainer) => {
//     optionPairCount++;

//     const optionPairDiv = document.createElement("div");
//     optionPairDiv.className = "mb-5 option-pair row";

//     const option1Div = createOption(1, optionData);
//     const option2Div = createOption(2, optionData);

//     option1Div.className += " col-lg-6";
//     option2Div.className += " col-lg-6";

//     const optionPairLabel = document.createElement("h5");
//     optionPairLabel.innerText = `Option Pair ${optionPairCount}`;

//     optionPairDiv.appendChild(optionPairLabel);
//     optionPairDiv.appendChild(option1Div);
//     optionPairDiv.appendChild(option2Div);

//     optionsContainer.appendChild(optionPairDiv);
// };

// window.onload = async function () {
//     const url = new URL(window.location.href);
//     const perfectDayId = url.pathname.split("/").slice(-2, -1)[0]; // Assuming the ID is the second-to-last segment in the URL

//     if (!perfectDayId) {
//         console.error("Perfect Day ID is missing in the URL.");
//         return;
//     }

//     const response = await fetch(`/api/perfect-days/${perfectDayId}`);
//     console.log(`/api/perfect-days/${perfectDayId}`);
//     perfectDay = await response.json();
//     const optionsContainer = document.getElementById("optionsContainer");

//     if (!optionsContainer) {
//         console.error("Options container not found.");
//         return;
//     }

//     // for (let option of perfectDay.options) {
//     //     addOption(option);
//     // }


//         // Populate the form with the existing OptionSets.
//         if (perfectDay.options) {
//             for (let option of perfectDay.options) {
//                 addOption(option, optionsContainer);
//             }
//         }
//     };

//     document.addEventListener("DOMContentLoaded", (event) => {
//         const addOptionButton = document.getElementById("addOptionButton");
//         const optionsContainer = document.getElementById("optionsContainer");
//         optionPairCount = optionsContainer.getElementsByClassName("option-pair").length;
//         addOptionButton.addEventListener("click", () => addOption({}, optionsContainer));
//     });
//         // for (let option of perfectDay.options) {
//         //     addOption(option, optionsContainer);
//         // // }
//         // optionPairCount =
//         //     optionsContainer.getElementsByClassName("option-pair").length;



//         // const addOption = (optionData) => {
//         //     optionPairCount++;

//         //     const optionPairDiv = document.createElement("div");
//         //     optionPairDiv.className = "mb-5 option-pair row";

//         //     const option1Div = createOption(1, optionData);
//         //     const option2Div = createOption(2, optionData);

//         //     option1Div.className += " col-lg-6";
//         //     option2Div.className += " col-lg-6";

//         //     const optionPairLabel = document.createElement("h5");
//         //     optionPairLabel.innerText = `Option Pair ${optionPairCount}`;

//         //     optionPairDiv.appendChild(optionPairLabel);
//         //     optionPairDiv.appendChild(option1Div);
//         //     optionPairDiv.appendChild(option2Div);

//         //     optionsContainer.appendChild(optionPairDiv);
//         // };

//     //     addOptionButton.addEventListener("click", () => addOption({}, optionsContainer));
//     // });

//     document.addEventListener("DOMContentLoaded", (event) => {
//         const updateFormFields = (data) => {
//             const titleElement = document.getElementById("title");
//             const descriptionElement = document.getElementById("dayDescription");

//             if (titleElement) {
//                 titleElement.value = data.title || "";
//             } else {
//                 console.error("Title element not found");
//             }

//             if (descriptionElement) {
//                 descriptionElement.value = data.description || "";
//             } else {
//                 console.error("Description element not found");
//             }

//             // Update other form fields if necessary
//         };

//         document
//             .querySelector("#editPerfectDayForm")
//             .addEventListener("submit", async (event) => {
//                 event.preventDefault();

//                 const formData = new FormData(event.target);
//                 const id = formData.get("id");

//                 let jsonData = {
//                     id: formData.get("id"),
//                     title: formData.get("title"),
//                     description: formData.get("description"),
//                 };

//                 const optionsContainer =
//                     document.getElementById("optionsContainer");
//                 optionPairCount =
//                     optionsContainer.getElementsByClassName("option-pair").length;

//                 let optionArray = [];
//                 for (let i = 0; i < optionPairCount; i++) {
//                     optionArray.push({
//                         option1: formData.get(
//                             `options[${optionPairCount}].option${1}.text`
//                         ),
//                         option1_image: formData.get(
//                             `options[${optionPairCount}].option${1}.image`
//                         ),
//                         option2: formData.get(
//                             `options[${optionPairCount}].option${2}.text`
//                         ),
//                         option2_image: formData.get(
//                             `options[${optionPairCount}].option${2}.image`
//                         ),
//                     });
//                 }

//                 jsonData = { ...jsonData, options: optionArray };

//                 console.log("what have i created...");
//                 console.log(jsonData);

//                 const url = `/api/perfect-days/${id}`;

//                 try {
//                     const response = await fetch(url, {
//                         method: "PUT",
//                         body: JSON.stringify(jsonData),
//                         options: perfectDay.options,
//                         headers: {
//                             "Content-Type": "application/json",
//                         },
//                     });
//                     //console.log(response);
//                     if (response.ok) {
//                         const updatedPerfectDay = await response.json();
//                         //console.log(updatedPerfectDay);
//                         console.log("Request Payload:", JSON.stringify(jsonData));

//                         // Retrieve the updated data and update the form fields
//                         fetch(url)
//                             .then((response) => response.json())
//                             .then((data) => {
//                                 updateFormFields(data);
//                             })
//                             .catch((error) => {
//                                 console.error("Error:", error);
//                             });

//                         console.log("Perfect Day updated successfully.");
//                     } else {
//                         console.error("Error:", response.status);
//                     }
//                 } catch (error) {
//                     console.error("Error:", error);
//                 }
//             });

//         // Fetch the initial data and update the form fields
//         const id = document.getElementById("id").value;
//         const initialDataUrl = `/api/perfect-days/${id}`;

//         fetch(initialDataUrl)
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 updateFormFields(data);
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     });
