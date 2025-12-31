import { defineStore } from 'pinia';

export const useIncorrectAnswersStore = defineStore('incorrectAnswers', {
  state: () => ({
    incorrectAnswers: [],
  }),
  getters: {

  },
  actions: {


    loadIncorrectAnswers(filePath) {

      const savedState = localStorage.getItem(filePath);
      const parsedState = JSON.parse(savedState);

      if (parsedState && parsedState[filePath] && parsedState[filePath].questionStates) {
        const questionStates = parsedState[filePath].questionStates;

        if (questionStates) {
          this.incorrectAnswers = questionStates.filter(q => (q.answerChecked && !q.didAnswerCorrect) || q.bookmarked === true);

        }
      }


    },




    resetIncorrectAnswers() {
      this.incorrectAnswers = [];
    },
  },
});
