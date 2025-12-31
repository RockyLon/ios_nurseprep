const fs = require('fs');
const jsonfile = require('./src/assets/info.json');


const letterToNumberMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6'
  // Add more mappings as needed
};


function transformJSON(inputData) {
  // Transform each object in the array
  const transformedData = inputData.map(item => {

    // Convert the Type field
    const typeMapping = {
      'ONE': 'Single',
      // Add more mappings as needed
    };
    const transformedType = typeMapping[item["QustionType"]] || item["QustionType"];

    // Convert the Answer field
    const transformedAnswer = letterToNumberMap[item["Answer"]] || item["Answer"];



    // Remove the specified section from the passage and remove backslashes
    const cleanedPassage = cleanHTML(item["passage"]).replace(/Passage pertains to questions\s*\d+-\d+(,\s*)?/, '');




    // Construct the transformed object
    const transformedItem = {
      "Exam Name": "Basic Nursing",
      "Test Number": item["ID"],
      "Question": cleanHTML(item["Question"]),
      "Choice 1": cleanHTML(item["OptA"]),
      "Choice 2": cleanHTML(item["OptB"]),
      "Choice 3": cleanHTML(item["OptC"]),
      "Choice 4": cleanHTML(item["OptD"]),
      "Type": transformedType,
      "Answer": transformedAnswer,
      "Explanation": cleanHTML(item["Explanation"]),
      // "ImageURL": extractImageURL(item["Question"]),
      // "Passage": cleanHTML(item["passage"]),
      // "Passage": cleanedPassage
    };

    return transformedItem;
  });

  return transformedData;
}

// Function to clean HTML elements
function cleanHTML(html) {
  if (html) {
    // Remove HTML tags, entities, and all whitespace characters
    return html.replace(/<[^>]*>?/gm, '').replace(/\&nbsp;/g, '').replace(/\s+/g, ' ').trim();
  }
  return ''; // Return empty string if html is undefined or null
}

// Function to extract image URL from HTML content
// function extractImageURL(html) {
//   const regex = /<img.*?src=\"(.*?)\".*?>/; // Regular expression to match image URL within <img> tag
//   const match = regex.exec(html);
//   if (match) {
//     const imageURL = match[1].replace(/\\/g, '/'); // Replace backslashes with forward slashes
//     return encodeURI(imageURL); // Encode URI components, including spaces
//   } else {
//     // If no <img> tag is found, try to directly extract the image URL from the HTML content
//     const imageURLRegex = /src=\"(.*?)\"/; // Regular expression to match image URL directly
//     const imageURLMatch = imageURLRegex.exec(html);
//     if (imageURLMatch) {
//       const imageURL = imageURLMatch[1].replace(/\\/g, '/'); // Replace backslashes with forward slashes
//       return encodeURI(imageURL); // Encode URI components, including spaces
//     } else {
//       return ''; // Return empty string if no match found
//     }
//   }
// }




// Transform the JSON data
const transformedData = transformJSON(jsonfile);

// Write the transformed data back to the JSON file
fs.writeFile('./src/assets/basic_nursing.json', JSON.stringify(transformedData, null, 2), err => {
  if (err) {
    console.error('Error writing transformed JSON file:', err);
    return;
  }
  console.log('Transformation complete. Transformed data has been written to info_transformed.json');
});
