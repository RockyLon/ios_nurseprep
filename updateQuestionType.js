const fs = require('fs');

// Load the JSON data from the file
const questions = require('./src/assets/nutrition_health.json');

//Fix multiple answers type checked as singles

// Iterate through each question
questions.forEach(question => {
  if (question.Question) {
    // Remove backslashes and newline characters from the Question field
    question.Question = question.Question.replace(/\r?\n|\r/g, '').replace(/\\/g, '');
    question.Question = question.Question.replace(/^Test\sBank\d+\./g, '');
  }
  if (question.Answer) {
    const answerArray = question.Answer.split(',').map(answer => answer.trim());

    // Check if the answer contains multiple options
    if (answerArray.length > 1) {
      // If yes, update the "Type" to "Multiple"
      question.Type = 'Multiple';
    }
  }
  // Split the answer string by commas

});

// Iterate through each question
questions.forEach(question => {
  if (question.Type === 'MULTI') {
    question.Type = 'Single';
  }
});



//Change letter to numbers

// Define a mapping of letters to numbers
const letterToNumberMap = {
  'A': '1',
  'B': '2',
  'C': '3',
  'D': '4',
  'E': '5',
  'F': '6'
  // Add more mappings as needed
};

// Iterate through each Multiple question replace A,B,C etc.. with 1,2,3 etc..

questions.forEach(question => {
  if (question.Answer) {
    // Replace letters with corresponding numbers in the answer string
    question.Answer = question.Answer.split(',').map(answer => {
      // Trim whitespace
      answer = answer.trim();
      // Check if answer is already a number, if not, map letter to number
      return isNaN(parseInt(answer)) ? letterToNumberMap[answer] : answer;
    }).join(', '); // Join the elements back into a string separated by commas
  }
});


// Iterate through each question replace Single questions Answers from letters to numbers
questions.forEach(question => {




  // Check if question.Answer is defined before proceeding
  if (question.Answer) {
    // Replace letter with corresponding number
    question.Answer = letterToNumberMap[question.Answer] || question.Answer;
  }
});








//"Test Number" values follow a sequential numerical order

// // Iterate through each question and renumber them sequentially
questions.forEach((question, index) => {
  // Update the "Test Number" field to the current index plus one
  question['Test Number'] = (index + 1).toString();
});

// // Save the updated JSON data back to the file
fs.writeFileSync('./src/assets/nutrition_health.json', JSON.stringify(questions, null, 4));

console.log('Question types updated successfully.');
