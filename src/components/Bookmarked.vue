<template v-if="questionStates">
  <q-page>

    <q-header class="bgGradient">
      <q-toolbar>
        <q-btn :to="`/quizstats/${urlParam}`" flat icon="chevron_left"></q-btn>
        <q-toolbar-title class="text-body1">
          <q-icon name="bookmark"></q-icon>
          Bookmarked {{ humanReadableName }}</q-toolbar-title>

      </q-toolbar>
    </q-header>

    <!-- <div class="text-caption text-center q-pt-sm text-grey q-mx-md">Update when ready. Review any remaining questions
      later.</div> -->


    <q-scroll-area style="height: 90vh; max-height: 80vh;" class="q-my-lg">
      <div v-for="(question, qIndex) in incorrectQuestions" :key="`question-${qIndex}`" class="q-mb-md">


        <div class="row justify-between q-mb-md">
          <div class="text-caption q-mb-sm q-mx-md">Question {{ question['Test Number'] }}</div>

          <!-- <q-btn size="sm" icon="bookmark" :color="questionStates[qIndex].bookmarked ? 'green' : 'grey'" flat
            @click="toggleBookmark(question['Test Number'])">
          </q-btn> -->
          <!-- {{ store.incorrectAnswers }} -->


          <q-btn size="sm" icon="bookmark" :color="getBookmarkIcon(question['Test Number'])" flat
            @click="toggleBookmark(question['Test Number'])">
          </q-btn>




        </div>

        <div class="q-mb-xs text-bold q-mx-md" style="font-size: 17px;">{{ question.Question }}</div>

        <div class="row justify-center" v-if="question.ImageURL">
          <img style="width: 200px; border-radius: 7px;" :src="question.ImageURL">
        </div>

        <div class="row">
          <q-expansion-item caption="Click to read passage" hide-expand-icon expand-separator style=" font-size: 14px;"
            :label="'Passage'" v-if="question.Passage">
            <q-card class="q-ma-md">
              <q-card-section>
                {{ question.Passage }}
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>



        <q-list dense class="q-mt-md">



          <q-item v-for="n in getChoiceNumbers(question)" :key="n" class="q-mb-sm">
            <q-item-section>

              <q-radio color="purple" :disable="question['reviewed']" class="text-body1 q-my-sm"
                v-if="question.Type === 'Single'" :label="question['Choice ' + n]"
                v-model="selectedAnswers[question['Test Number']]" :val="`${n}`" :class="getOptionClass(question, n)" />


              <q-checkbox color="purple" :disable="question['reviewed']" :class="getOptionClass(question, n)"
                v-if="question.Type === 'Multiple'" :label="question[`Choice ${n}`]" :val="`${n}`"
                :model-value="selectedAnswers[question['Test Number']].includes(`${n}`)"
                @update:model-value="updateSelection(question['Test Number'], `${n}`)" />
            </q-item-section>
          </q-item>
        </q-list>



        <!-- Explanation - Shown after checking the answer -->
        <q-expansion-item v-if="question['reviewed'] && question.Explanation" hide-expand-icon label="Explanation"
          class="q-mb-xl">
          <div class="text-body1 q-mx-md">{{ question.Explanation }}</div>
        </q-expansion-item>

        <!-- <q-btn label="Confirm Answer" @click="reviewQuestion(question['Test Number'])"></q-btn> -->

      </div>
    </q-scroll-area>

    <!-- <q-page-sticky position="bottom-right" :offset="[20, 40]">
      <q-btn rounded icon="update" color="purple" label="Update Stats" @click="updateUserAnswers"></q-btn>
    </q-page-sticky> -->

    <div id="bannerAdPlaceholder"></div>

  </q-page>
</template>


<script>
// import { AdMob, BannerAdPosition, BannerAdSize, BannerAdOptions } from '@capacitor-community/admob';


import { useIncorrectAnswersStore } from '../stores/incorrectAnswers'
import { Loading } from 'quasar'

export default {
  data() {
    return {
      quizData: [],
      incorrectQuestions: [],
      selectedAnswers: {}, // Object to keep track of user selections
      questionReviewed: {},
      selectedChoices: [],
      answerCorrectness: {},
      urlParam: this.$route.params.examName,
      questionStates: [],

      examNameMapping: {
        basic_nursing: 'Basic Nursing',
        concepts_nursing: 'Concepts of Nursing',
        drug_therapy: 'Drug Therapy',
        foundation: 'Foundation of Nursing',
        fundamentals: 'Fundamentals of Nursing',
        medsurg: 'Medical Surgical',
        pharmacology: 'Pharmacology',
        maternity: 'Maternity',
        gerentology: 'Gerentology',
        mental_health: 'Mental Health',
        nurtrition_health: 'Nutrition & Health',
        pediatric: 'pediatric',
        psychiatric: 'psychiatric',
        high_acuity: 'high_acuity',
        proffessional: 'proffessional',
        pathophysiology: 'pathophysiology',
      }


    }
  },
  computed: {
    humanReadableName() {
      return this.examNameMapping[this.urlParam];
    },
    incorrectAnswers() {
      return useIncorrectAnswersStore().incorrectAnswers;
    },
    getBookmarkIcon() {
      return function (testNumber) {
        if (this.questionStates) {
          const foundQuestion = this.questionStates.find(item => item.testNumber === testNumber);
          return foundQuestion?.bookmarked ? 'green' : 'grey';
        }
      }.bind(this); // Bind 'this' to the inner function
    }


  },

  methods: {

    toggleBookmark(testNumber) {

      const filePath = `src/assets/${this.urlParam}.json`;

      const savedState = localStorage.getItem(filePath);

      const parsedState = JSON.parse(savedState);

      const quizState = parsedState[filePath];

      const { questionStates } = quizState;

      this.questionStates = questionStates

      // Find the item with the matching testNumber
      const foundIndex = questionStates.findIndex(item => item.testNumber === testNumber);

      // If item found, toggle its bookmarked property
      if (foundIndex !== -1) {
        questionStates[foundIndex].bookmarked = !questionStates[foundIndex].bookmarked;

        const quizDataToSave = {
          [filePath]: {
            currentIndex: quizState.currentIndex,
            questionStates: quizState.questionStates,
          }
        };

        // Save the updated state back to localStorage
        localStorage.setItem(filePath, JSON.stringify(quizDataToSave));

        this.$q.notify({
          color: 'white',
          textColor: 'dark',
          message: 'Bookmark removed',
          icon: 'thumb_up',
          iconColor: 'purple',
          timeout: 500,
          position: "top"
        })
      }
    },



    getChoiceNumbers(question) {
      // Assuming every question object has keys like "Choice 1", "Choice 2", etc.
      const choiceKeys = Object.keys(question).filter(key => key.startsWith('Choice'));
      return choiceKeys.map(key => parseInt(key.split(' ')[1]));
    },

    isChoiceSelected(choiceNumber) {
      return this.selectedChoices.includes(choiceNumber);
    },

    updateSelection(testNumber, choiceNumber) {

      // If it's not already an array, initialize it
      if (!Array.isArray(this.selectedAnswers[testNumber])) {
        this.selectedAnswers[testNumber] = [];
      }

      // Add or remove the choice number from the array of selected answers
      if (this.selectedAnswers[testNumber].includes(choiceNumber)) {
        // If it's already selected, remove it
        this.selectedAnswers[testNumber] = this.selectedAnswers[testNumber].filter(num => num !== choiceNumber);
      } else {
        // If it's not selected, add it
        this.selectedAnswers[testNumber].push(choiceNumber);
      }
    },

    async loadQuizDataAndIncorrectAnswers() {


      Loading.show()
      try {

        // const filePath = `src/assets/${this.urlParam}.json`;
        // const response = await import('src/assets/hesi_ap.json');
        let response = ''

        if (this.urlParam == 'basic_nursing') {
          response = await import('src/assets/basic_nursing.json');
        }
        if (this.urlParam == 'high_acuity') {
          response = await import('src/assets/high_acuity.json');
        }
        if (this.urlParam == 'proffessional') {
          response = await import('src/assets/proffessional.json');
        }

        if (this.urlParam == 'psychiatric') {
          response = await import('src/assets/psychiatric.json');
        }

        if (this.urlParam == 'proffessional') {
          response = await import('src/assets/proffessional.json');
        }

        if (this.urlParam == 'concepts_nursing') {
          response = await import('src/assets/concepts_nursing.json');
        }
        if (this.urlParam == 'drug_therapy') {
          response = await import('src/assets/drug_therapy.json');
        }

        if (this.urlParam == 'foundation') {
          response = await import('src/assets/foundation.json');
        }

        if (this.urlParam == 'fundamentals') {
          response = await import('src/assets/fundamentals.json');
        }
        if (this.urlParam == 'medsurg') {
          response = await import('src/assets/medsurg.json');
        }
        if (this.urlParam == 'pharmacology') {
          response = await import('src/assets/pharmacology.json');
        }
        if (this.urlParam == 'maternity') {
          response = await import('src/assets/maternity.json');
        }
        if (this.urlParam == 'gerentology') {
          response = await import('src/assets/gerentology.json');
        }
        if (this.urlParam == 'mental_health') {
          response = await import('src/assets/mental_health.json');
        }
        if (this.urlParam == ' nurtrition_health') {
          response = await import('src/assets/nutrition_health.json');
        }
        if (this.urlParam == 'phathophysiology') {
          response = await import('src/assets/pathophysiology.json');
        }
        if (this.urlParam == 'pediatric') {
          response = await import('src/assets/pediatric.json');
        }

        const filePath = `src/assets/${this.urlParam}.json`;

        const data = await response.default;
        this.quizData = data




        // Access the incorrect answers from the Pinia store
        const store = useIncorrectAnswersStore();
        store.loadIncorrectAnswers(filePath)

        const savedState = localStorage.getItem(filePath);
        const parsedState = JSON.parse(savedState);
        this.questionStates = parsedState[filePath].questionStates;



        // Wait for the store to be in a ready state or ensure incorrectAnswers is populated
        // This example assumes incorrectAnswers is already populated
        if (store.incorrectAnswers && store.incorrectAnswers.length > 0) {





          // this.incorrectQuestions = this.quizData.filter(question =>
          // (store.incorrectAnswers.some(answer => {
          //   return answer.testNumber === question['Test Number'] && !answer.didAnswerCorrect;
          // }) || question.bookmarked == true)
          // );


          // Filter incorrect answers to get only bookmarked questions
          const bookmarkedIncorrectAnswers = store.incorrectAnswers.filter(answer => answer.bookmarked);

          // Get the test numbers of bookmarked questions
          const bookmarkedTestNumbers = bookmarkedIncorrectAnswers.map(answer => answer.testNumber);

          const newBookmarkQuestions = this.quizData.filter(question =>
            bookmarkedTestNumbers.includes(question['Test Number'])
          );
          newBookmarkQuestions.forEach(question => {
            this.incorrectQuestions.push(question)
          });



          this.incorrectQuestions.forEach(question => {
            question['reviewed'] = false
            if (question.Type === 'Multiple') {
              this.selectedAnswers[question['Test Number']] = [];
            } else {
              this.selectedAnswers[question['Test Number']] = null;
            }
          });

        } else {
          console.log("Incorrect answers data not available");
        }
        Loading.hide()
      } catch (error) {
        Loading.hide()

        console.error("Error loading quiz data:", error);
      }
    },

    getOptionClass(question, choiceNumber) {
      const testNumber = question['Test Number'];
      const selectedAnswers = this.selectedAnswers[testNumber];
      const correctAnswers = question.Answer.split(',').map(ans => ans.trim()); // Assuming the Answer is a comma-separated string

      // If it's a single choice question and any answer has been selected
      if (question.Type === 'Single' && selectedAnswers) {
        const isCorrect = correctAnswers.includes(String(choiceNumber));
        if (isCorrect) {
          // Correct answer
          question.reviewed = true
          //  console.log(question)
          return 'correct-answer';
        } else if (selectedAnswers === String(choiceNumber)) {
          // Incorrectly selected answer
          return 'incorrect-answer';
        } else {
          return 'incorrect-answer';
        }
      } else if (question.Type === 'Multiple') {
        // Ensure selectedAnswers is an array for multiple choice questions
        if (!Array.isArray(selectedAnswers)) {
          return ''; // Return no class if selectedAnswers is not properly set up as an array
        }

        const isCorrect = correctAnswers.includes(String(choiceNumber));
        const isSelected = selectedAnswers.includes(String(choiceNumber));


        if (isCorrect && isSelected) {
          return 'correct-answer'; // Always mark correct answers
        } else if (isSelected && !isCorrect) {
          return 'incorrect-answer'; // Mark selected but incorrect answers
        }
        return ''; // No class for unselected or correct but not selected options
      }

      return ''; // No class applied by default
    },

    updateUserAnswers() {
      Loading.show()
      const filePath = `src/assets/${this.urlParam}.json`;

      const savedState = localStorage.getItem(filePath);

      const parsedState = JSON.parse(savedState);

      const quizState = parsedState[filePath];

      const { questionStates } = quizState;


      // Only iterate through questions that have been selected/retaken
      Object.entries(this.selectedAnswers).forEach(([testNumber, userAnswer]) => {
        // Find the corresponding questionState based on testNumber
        const questionStateIndex = questionStates.findIndex(q => q.testNumber === testNumber);
        if (questionStateIndex !== -1) {
          const question = this.quizData.find(q => q['Test Number'] === testNumber);
          question['reviewed'] = false
          if (question) {

            // Handle multiple answers
            if (Array.isArray(userAnswer)) {
              // Convert both userAnswer and the correct answer to sorted strings for comparison
              const isCorrect = JSON.stringify(userAnswer.sort()) === JSON.stringify(question.Answer.split(',').map(a => a.trim()).sort());
              questionStates[questionStateIndex].didAnswerCorrect = isCorrect;
            } else {
              // Handle single answers
              questionStates[questionStateIndex].didAnswerCorrect = question.Answer === userAnswer;
            }
          }
        }
      });

      const quizDataToSave = {
        [filePath]: {
          currentIndex: quizState.currentIndex,
          questionStates: quizState.questionStates,
        }
      };
      // Save the updated state back to localStorage
      localStorage.setItem(filePath, JSON.stringify(quizDataToSave));

      this.$q.notify({
        color: 'white',
        textColor: 'dark',
        message: 'Scores updated successfully!',
        icon: 'thumb_up',
        iconColor: 'purple',
        timeout: 500,
        position: "top",
        onDismiss: () => {
          // Redirect after the notification is dismissed
          this.$router.push(`/quizstats/${this.urlParam}`);
          Loading.hide()
        }
      })
    },


    // async showBannerAd() {
    //   const options = {
    //     adId: 'ca-app-pub-6940124311401745/2290338917',
    //     position: BannerAdPosition.TOP_CENTER,
    //     size: BannerAdSize.LARGE_BANNER,
    //     isTesting: true
    //   };

    //   try {
    //     await AdMob.showBanner(options);
    //     console.log('Banner ad shown successfully');
    //   } catch (error) {
    //     console.error('Error showing banner ad:', error);
    //   }
    // }


  },

  mounted() {

    this.loadQuizDataAndIncorrectAnswers();
    // this.showBannerAd();
  },

};
</script>

<style scoped>
.bgGradient {
  /* background: linear-gradient(135deg, #8a2be2 20%, #075CCD 100%); */
  background: #5372ff;
}

.correct-answer {
  color: green;
}

.incorrect-answer {
  color: red;
}
</style>
