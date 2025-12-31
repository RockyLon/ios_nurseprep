<template>
  <q-page padding >
    <q-header :class="darkModeToggle ? 'bg-grey-10' : 'bg-white' "  >


      <q-toolbar :class="darkModeToggle ? 'text-white' : 'text-black' " >
        <q-btn flat @click="drawerLeft = !drawerLeft" round dense icon="menu" />

        <q-toolbar-title  class="text-bold text-caption text-center">{{ examName.name }}</q-toolbar-title>

        <q-toggle size="xs" v-model="darkModeToggle" color="orange" :label="darkModeToggle ? 'Light' : 'Dark' "></q-toggle>
      </q-toolbar>



    </q-header>


    <q-drawer v-model="drawerLeft">

      <q-scroll-area class="fit" style="margin-top: 20px;">

        <div class="q-pa-sm">
          <div class="text-caption text-center">
            <q-icon name="verified_user" color="orange" size="xs"></q-icon>
            30,000+ Questions to Excel!</div>
          <q-item v-if="!premium" class=" q-ma-sm">

            <q-item-section >
              <q-btn to="/upgrade"  class=" text-white bgGradient" rounded icon="lock_open" label="Unlock Pro Access"
                size="md"  no-caps></q-btn>
            </q-item-section>
          </q-item>

          <q-separator color="grey-6" class="q-my-sm" inset></q-separator>


          <q-item style="border-radius: 5px" :active="exam.name == examName.name" class="text-body1"
            active-class="text-white text-bold bgGradient" clickable v-ripple v-for="exam in exams" :key="exam.name">

            <q-item-section avatar
              v-if="!premium && (exam.path !== 'drug' && exam.path !== 'mat' && exam.path !== 'found')">

              <q-icon size="xs" color="grey-5" name="lock"></q-icon>
            </q-item-section>
            <q-item-section avatar v-else>
              <q-icon size="xs" color="teal" name="lock_open"></q-icon>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ exam.name }}</q-item-label>
              <q-item-label caption class="text-grey-5">{{ exam.totalQuestions }}</q-item-label>
            </q-item-section>

            <q-item-section avatar
              v-if="!premium && (exam.path == 'drug' || exam.path == 'mat' || exam.path == 'found' )">
              <q-btn  @click="loadExam(exam.filename)" icon="chevron_right" flat></q-btn>
            </q-item-section>

            <q-item-section avatar v-else-if="premium">
              <q-btn @click="loadExam(exam.filename)" icon="chevron_right" flat round ></q-btn>
            </q-item-section>
          </q-item>
        </div>
      </q-scroll-area>
    </q-drawer>

    <!-- <q-btn v-if="retakeMode" else @click="backToQuiz">back to quiz</q-btn> -->

    <div v-if="currentQuestion && questionStates">
      <div class="row justify-between ">
        <div class="text-caption q-px-md ">
          <span v-if="currentQuestion['Test Number'] != 12 && !premium">
            Question {{ currentQuestion['Test Number'] }} of {{ questionStates.length }}
          </span>



          <!-- Button to toggle bookmark status -->
          <!-- <q-btn class="q-mb-xs" v-if="isQuestionAnswered(currentIndex)" size="sm" icon="bookmark" flat
            @click="toggleBookmark(currentIndex)"
            :color="questionStates[currentIndex].bookmarked || isBookmarked ? 'green' : 'grey-6'">
          </q-btn> -->
        </div>
      </div>

      <div class="row">
        <q-expansion-item caption="Click to read passage" hide-expand-icon expand-separator style=" font-size: 17px;"
          :label="'Passage'" v-if="currentQuestion.Passage">
          <q-card class="q-ma-md">
            <q-card-section>
              {{ currentQuestion.Passage }}
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>

      <div class="row justify-center" v-if="currentQuestion.ImageURL">
        <img style="width: 250px; border-radius: 7px;" :src="currentQuestion.ImageURL">
      </div>

      <div v-if="!premium && currentQuestion['Test Number'] <= 11 || premium">
        <div class="flex flex-column row " >
          <div class=" q-ma-md  q-pa-sm " style="font-size: 20px; border-radius: 10px" >
            {{ currentQuestion.Question }}
          </div>
          <div class="col-12">
            <div v-for="n in getChoiceNumbers(currentQuestion)" :key="n"
            :class="[getOptionClass(n), darkModeToggle ? 'bg-grey-10' : 'bg-grey-2', ] "

            class="q-my-sm "
              style="font-size: 17px; border-radius: 10px;">
              <q-radio color="blue" :disable="isQuestionAnswered(currentIndex)" class="q-pa-sm q-pr-sm"

                style="border-radius: 7px; font-size: 15px; font-weight: 400" v-if="currentQuestion.Type === 'Single'"
                :label="currentQuestion['Choice ' + n]" v-model="questionStates[currentIndex].userAnswer"
                :val="`${n}`" />

              <q-checkbox color="blue" class=" q-pa-xs q-pr-sm " style="border-radius: 7px; font-size: 15px;" v-else
                :label="currentQuestion['Choice ' + n]" v-model="questionStates[currentIndex].userAnswer"
                :val="`${n}`" />
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <!-- <div class="text-center text-caption text-grey-6 q-mt-md" @click="drawerLeft = true">
          Free questions limit reached for {{ examName.name }}
        </div> -->
        <div class="q-pa-md row items-center q-gutter-md">
          <q-card flat>
            <div class="text-center">
              <img style="width: 95%; border-radius: 20px;" src="../assets/upgrade_image.png" alt="">
            </div>
            <q-card-section class="text-center">
              <!-- <div class="text-caption text-center text-bold">Turn your C's into A's</div> -->
              <div class="text-h5   text-bold text">Master Your Nursing School Journey</div>
              <!-- <div class="text-body1 text-grey-7 q-mt-sm">Unlock All Subjects, Ace Every Test! </div> -->
            </q-card-section>

            <q-card-section>
              <div style="max-width: 360px">
                <q-list separator>
                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="school" color="blue-grey-5"></q-icon>
                    </q-item-section>
                    <q-item-section>Access the Full 30,000+ Question Bank</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="block" color="blue-grey-5"></q-icon>
                    </q-item-section>
                    <q-item-section>Enjoy an Ad-Free Experience</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="insights" color="blue-grey-5"></q-icon>
                    </q-item-section>
                    <q-item-section>Analyze Your Weaknesses with Detailed Insights</q-item-section>
                  </q-item>

                  <q-item clickable v-ripple>
                    <q-item-section avatar>
                      <q-icon name="grade" color="blue-grey-5"></q-icon>
                    </q-item-section>
                    <q-item-section>Boost Your Grades with Proven Study Tools</q-item-section>
                  </q-item>
                </q-list>

              </div>
            </q-card-section>


            <q-card-section class="text-center" v-if="!premium && currentQuestion['Test Number'] > 11">
              <q-btn style="width: 300px;" :to="`/upgrade/${urlParam}`" icon="school" label="Get Unlimited" rounded
                class="q-pa-md bgGradient text-white" no-caps></q-btn>
              <!-- <div class="text-center text-caption text-grey-6 q-mt-md " @click="drawerLeft = true">or open another test
              </div> -->
            </q-card-section>
          </q-card>
        </div>
      </div>




      <!-- Explanation - Shown after checking the answer -->
      <q-expansion-item default-opened class=" q-pb-lg "  style="font-size: 17px;"
        v-if="questionStates[currentIndex].answerChecked && currentQuestion.Explanation" label="Explanation">
        <div class=" q-mb-xl q-mx-md ">{{ currentQuestion.Explanation }}</div>
      </q-expansion-item>

      <!-- <router-link :to="`/upgrade/${urlParam}`" v-if="!premium">
        <q-page-sticky style="border-radius: 5px;" class=" text-grey-7 q-mx-md q-pa-sm" v-if="remainingQuestions > 0"
          position="top-right">
          <span class=" text-pink text-body1">{{ remainingQuestions }}</span> Free Questions Left - Upgrade
        </q-page-sticky>
      </router-link> -->

      <!-- Check Answer Button -->
      <!-- <q-page-sticky :offset="[10, 10]">
        <q-btn rounded class="bg-white q-px-lg" icon="check" color="green" no-caps
          v-if="!questionStates[currentIndex].answerChecked &&
            ((currentQuestion.Type === 'Single' && questionStates[currentIndex].userAnswer !== null) ||
              (currentQuestion.Type === 'Multiple' && questionStates[currentIndex].userAnswer !== null && questionStates[currentIndex].userAnswer.length > 0))" label="Check"
          @click="checkAnswer" />
      </q-page-sticky> -->





      <q-footer :class="darkModeToggle ? 'bg-grey-10' : 'bg-white' "   class="q-pb-md q-pt-sm q-px-md " >

        <div class="row justify-center q-mb-md" >

          <q-btn rounded  icon="check" no-caps style="background-color: #5472ff;"
            v-if="!questionStates[currentIndex].answerChecked &&
              ((currentQuestion.Type === 'Single' && questionStates[currentIndex].userAnswer !== null) ||
                (currentQuestion.Type === 'Multiple' && questionStates[currentIndex].userAnswer !== null && questionStates[currentIndex].userAnswer.length > 0))" label="Check Answer"
            @click="checkAnswer" />


          <!-- <q-btn v-if="currentQuestion['Test Number'] > 10" icon="school" icon-right="chevron_right" rounded class="q-pa-sm bgGradient" no-caps label="Get Unlimited Study"></q-btn> -->
        </div>

        <div class="row justify-between " :class="darkModeToggle ? 'text-white' : 'text-grey-9' " >


          <!-- back button  -->
          <q-btn no-caps flat icon="chevron_left" stack size="sm" label="Back" rounded @click="goBack"
            :disable="currentIndex === 0" />

          <q-btn v-if="isQuestionAnswered(currentIndex)"
            :icon="questionStates[currentIndex].bookmarked || isBookmarked ? 'bookmark' : 'bookmark_outline'" flat
            label="Bookmark" no-caps stack size="sm" @click="toggleBookmark(currentIndex)" >
          </q-btn>

          <!-- <q-btn size="sm" @click="drawerLeft = true" flat label="Open Test" stack no-caps icon="school"></q-btn> -->

          <!-- <a style="text-decoration: none;" href="https://apps.apple.com/us/developer/ismel-padron/id1527923161"
            target="_blank">
            <q-btn size="sm" flat color="purple-4" label="Apps" stack no-caps icon="apps"></q-btn>
          </a> -->



          <!-- Reset Button -->
          <!-- <q-btn label="Reset Quiz" @click="confirmResetQuiz" flat /> -->
          <q-btn icon="analytics" size="sm" stack no-caps flat :to="`/quizstats/${examName.url}`"
            label="Statistic"></q-btn>



          <!-- Next Button -->
          <q-btn v-if="currentQuestion['Test Number'] <= 10 || premium" flat icon="chevron_right" rounded no-caps
            @click="goToNextQuestion" :disable="currentIndex === quizData.length - 1" stack label="Next" size="sm" />

            <q-btn v-else flat icon="chevron_right" rounded no-caps
            :to="`/upgrade/${urlParam}`" stack label="Next" size="sm" />



          <!-- <q-btn stack size="sm" flat :to="`/upgrade/${urlParam}`"
            v-if="!premium && currentQuestion['Test Number'] >= 11" icon="rocket_launch" label="Get Premium" rounded
            class="q-mr-xs bgGradient text-white" no-caps></q-btn> -->
        </div>
      </q-footer>
    </div>



    <!-- <q-btn v-if="!retakeMode && incorrectAnswersExist" label="Retake Incorrect answers" @click="startRetakeIncorrect" /> -->

  </q-page>
  <!-- <q-page v-else>
    <UpgradeComponent />
  </q-page> -->
</template>


<script lang="ts">



import UpgradeComponent from '../components/Upgrade.vue';

import { Dialog, Loading, LocalStorage } from 'quasar'
import { RateApp } from 'capacitor-rate-app';
import { AdMob, AdOptions, InterstitialAdPluginEvents, BannerAdPluginEvents, BannerAdOptions, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// import { watch } from 'vue'
// import axios from 'axios';
// import Bookmarked from 'src/components/Bookmarked.vue';

export default {
  components: {
    UpgradeComponent
  },

  data() {
    return {
      drawerLeft: false,
      darkModeToggle: false,
      premium: false,
      retakeMode: false,
      quizData: [],
      questionStates: [],
      currentIndex: 0,
      answers: [],
      userAnswer: null,
      answerChecked: false,
      lastIncorrectIndex: null,
      answeredQuestions: 0,
      subscriber: null,
      examName: {
        name: 'maternity',
        path: 'src/assets/maternity.json',
        url: 'maternity'
      },
      urlParam: this.$route.params.examName || 'maternity',
      isBookmarked: false,

      // incorrectQuestionIndices: [],

      exams: [
        { path: 'mat', name: 'Maternity', filename: 'maternity.json', totalQuestions: '621 Questions', locked: false },

        { path: 'found', name: 'Foundation of Nursing', filename: 'foundation.json', totalQuestions: '2736 Questions', locked: false },

        { path: 'drug', name: 'Drug Therapy', filename: 'drug_therapy.json', totalQuestions: '559 Questions', locked: false },

        { path: 'fund', name: 'Fundamentals of Nursing', filename: 'fundamentals.json', totalQuestions: '5252 Questions', locked: false },

        { path: 'ger', name: 'Gerentology', filename: 'gerentology.json', totalQuestions: '840 Questions', locked: true },

        { path: 'med', name: 'Medical Surgical', filename: 'medsurg.json', totalQuestions: '2945 Questions', locked: true },

        { path: 'pha', name: 'Pharmacology', filename: 'pharmacology.json', totalQuestions: '6011 Questions', locked: true },

        { path: 'bas', name: 'Basic Nursing', filename: 'basic_nursing.json', totalQuestions: '1176 Questions', locked: true },

        { path: 'con', name: 'Concepts of Nursing', filename: 'concepts_nursing.json', totalQuestions: '406 Questions', locked: true },

        { path: 'men', name: 'Mental Health', filename: 'mental_health.json', totalQuestions: '779 Questions', locked: true },

        { path: 'nut', name: 'Nutrition & Health', filename: 'nutrition_health.json', totalQuestions: '2374 Questions', locked: true },

        { path: 'pat', name: 'Pathophysiology', filename: 'pathophysiology.json', totalQuestions: '2266 Questions', locked: true },

        { path: 'ped', name: 'Pediatric', filename: 'pediatric.json', totalQuestions: '3363 Questions', locked: true },

        { path: 'psy', name: 'Psychiatric', filename: 'psychiatric.json', totalQuestions: '953 Questions', locked: true },

        { path: 'hig', name: 'High Acuity Nursing', filename: 'high_acuity.json', totalQuestions: '760 Questions', locked: true },

        { path: 'pro', name: 'Proffessional Issues', filename: 'proffessional.json', totalQuestions: '559 Questions', locked: true },

      ],
    };
  },

  watch: {
    // Watch for changes in darkModeToggle value
    darkModeToggle(value) {
      // Toggle dark mode based on the value of darkModeToggle
      this.$q.dark.set(value);
      localStorage.setItem('darkMode', JSON.stringify(value));
    }
  },

  computed: {


    remainingQuestions() {
      if (this.currentQuestion['Test Number'] < 8) return null; // Don't show if the count is not relevant yet
      return Math.max(0, 10 - this.currentQuestion['Test Number']); // Calculate questions left
    },

    isQuestionAnswered() {
      return (index) => {
        return this.questionStates[index].answerChecked;
      };
    },

    currentQuestionIndex() {
      if (this.retakeMode) {
        // Only indices of incorrect questions



        const incorrectIndices = this.questionStates
          .map((state, index) => state.answerChecked && !state.didAnswerCorrect ? index : -1)
          .filter(index => index !== -1);

        // Find the current index within the incorrectIndices array
        const currentIndexInIncorrect = incorrectIndices.indexOf(this.currentIndex);
        return currentIndexInIncorrect !== -1 ? incorrectIndices[currentIndexInIncorrect] : incorrectIndices[0];
      } else {
        return this.currentIndex; // Regular quiz flow
      }
    },

    currentQuestion() {
      return this.quizData[this.currentQuestionIndex];
    },

    incorrectAnswersExist() {
      // Check if there's any question that was answered incorrectly
      return this.questionStates.some(state => state.answerChecked && !state.didAnswerCorrect);
    },

    incorrectQuestionIndices() {
      return this.questionStates
        .map((state, index) => state.answerChecked && !state.didAnswerCorrect ? index : -1)
        .filter(index => index !== -1);
    },

  },

  methods: {

    toggleBookmark(index) {
      this.isBookmarked = false;
      if (!this.questionStates[index].hasOwnProperty('bookmarked')) {
        // If bookmarked field is missing, add it and set it to true
        Object.defineProperty(this.questionStates[index], 'bookmarked', {
          value: true,
          writable: true,
          enumerable: true,
          configurable: true
        });
        this.isBookmarked = true;
      } else {
        // If bookmarked field exists, toggle its value
        this.questionStates[index].bookmarked = !this.questionStates[index].bookmarked;
        this.isBookmarked = this.questionStates[index].bookmarked;
      }
      this.saveQuizState(); // Save the updated state to local storage

      // Show notification based on bookmark status
      this.$q.notify({
        color: 'white',
        textColor: 'dark',
        message: this.isBookmarked ? 'Question bookmarked ' : 'Bookmark removed',

        icon: 'bookmark',
        iconColor: 'green',
        timeout: 1000,
        position: "top"
      });
    },

    async loadExam(filename) {


      this.drawerLeft = false


      if (filename === 'maternity.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/maternity.json');
          this.quizData = response.default;
          this.examName.name = 'Maternity'
          this.examName.path = 'src/assets/maternity.json'
          this.examName.url = 'maternity'
          this.$router.push({ name: 'exam', params: { examName: 'maternity' } });


          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/maternity.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/maternity.json'].questionStates;
            const currentIndex = parsedState['src/assets/maternity.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()

        }
      }

      if (filename === 'drug_therapy.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/drug_therapy.json');
          this.quizData = response.default;
          this.examName.name = 'Drug Therapy'
          this.examName.path = 'src/assets/drug_therapy.json'
          this.examName.url = 'drug_therapy'
          this.$router.push({ name: 'exam', params: { examName: 'drug_therapy' } });


          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/drug_therapy.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/drug_therapy.json'].questionStates;
            const currentIndex = parsedState['src/assets/drug_therapy.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates

            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()
          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()

        }
      }

      if (filename === 'foundation.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/foundation.json');
          this.quizData = response.default;
          this.examName.name = 'Foundation of Nursing'
          this.examName.path = 'src/assets/foundation.json'
          this.examName.url = 'foundation'
          this.$router.push({ name: 'exam', params: { examName: 'foundation' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/foundation.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/foundation.json'].questionStates;
            const currentIndex = parsedState['src/assets/foundation.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates

            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()


          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()

        }
      }

      if (filename === 'fundamentals.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {
          const response = await import('src/assets/fundamentals.json');
          this.quizData = response.default;
          this.examName.name = 'Fundamentals of Nursing'
          this.examName.path = 'src/assets/fundamentals.json'
          this.examName.url = 'fundamentals'
          this.$router.push({ name: 'exam', params: { examName: 'fundamentals' } });


          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/fundamentals.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/fundamentals.json'].questionStates;
            const currentIndex = parsedState['src/assets/fundamentals.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()
          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()
          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()

        }
      }

      if (filename === 'gerentology.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/gerentology.json');
          this.quizData = response.default;
          this.examName.name = 'Gerentology'
          this.examName.path = 'src/assets/gerentology.json'
          this.examName.url = 'gerentology'
          this.$router.push({ name: 'exam', params: { examName: 'gerentology' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/gerentology.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/gerentology.json'].questionStates;
            const currentIndex = parsedState['src/assets/gerentology.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()
          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()

        }
      }

      if (filename === 'medsurg.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/medsurg.json');
          this.quizData = response.default;
          this.examName.name = 'Medical Surgical'
          this.examName.path = 'src/assets/medsurg.json'
          this.examName.url = 'medsurg'
          this.$router.push({ name: 'exam', params: { examName: 'medsurg' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/medsurg.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/medsurg.json'].questionStates;
            const currentIndex = parsedState['src/assets/medsurg.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'pharmacology.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/pharmacology.json');
          this.quizData = response.default;
          this.examName.name = 'Pharmacology'
          this.examName.path = 'src/assets/pharmacology.json'
          this.examName.url = 'pharmacology'
          this.$router.push({ name: 'exam', params: { examName: 'pharmacology' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/pharmacology.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/pharmacology.json'].questionStates;
            const currentIndex = parsedState['src/assets/pharmacology.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'basic_nursing.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/basic_nursing.json');
          this.quizData = response.default;
          this.examName.name = 'Basic Nursing'
          this.examName.path = 'src/assets/basic_nursing.json'
          this.examName.url = 'basic_nursing'
          this.$router.push({ name: 'exam', params: { examName: 'basic_nursing' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/basic_nursing.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/basic_nursing.json'].questionStates;
            const currentIndex = parsedState['src/assets/basic_nursing.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'concepts_nursing.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/concepts_nursing.json');
          this.quizData = response.default;
          this.examName.name = 'Concepts of Nursing'
          this.examName.path = 'src/assets/concepts_nursing.json'
          this.examName.url = 'concepts_nursing'
          this.$router.push({ name: 'exam', params: { examName: 'concepts_nursing' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/concepts_nursing.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/concepts_nursing.json'].questionStates;
            const currentIndex = parsedState['src/assets/concepts_nursing.json'].currentIndex

            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'mental_health.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/mental_health.json');
          this.quizData = response.default;
          this.examName.name = 'Mental Health'
          this.examName.path = 'src/assets/mental_health.json'
          this.examName.url = 'mental_health'
          this.$router.push({ name: 'exam', params: { examName: 'mental_health' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/mental_health.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/mental_health.json'].questionStates;
            const currentIndex = parsedState['src/assets/mental_health.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'nutrition_health.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/nutrition_health.json');
          this.quizData = response.default;
          this.examName.name = 'Nutrition & Health'
          this.examName.path = 'src/assets/nutrition_health.json'
          this.examName.url = 'nutrition_health'
          this.$router.push({ name: 'exam', params: { examName: 'nutrition_health' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/nutrition_health.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/nutrition_health.json'].questionStates;
            const currentIndex = parsedState['src/assets/nutrition_health.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }



      if (filename === 'pathophysiology.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/pathophysiology.json');
          this.quizData = response.default;
          this.examName.name = 'Pathophysiology'
          this.examName.path = 'src/assets/pathophysiology.json'
          this.examName.url = 'pathophysiology'
          this.$router.push({ name: 'exam', params: { examName: 'pathophysiology' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/pathophysiology.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/pathophysiology.json'].questionStates;
            const currentIndex = parsedState['src/assets/pathophysiology.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'pediatric.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/pediatric.json');
          this.quizData = response.default;
          this.examName.name = 'Pediatric'
          this.examName.path = 'src/assets/pediatric.json'
          this.examName.url = 'pediatric'
          this.$router.push({ name: 'exam', params: { examName: 'pediatric' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/pediatric.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/pediatric.json'].questionStates;
            const currentIndex = parsedState['src/assets/pediatric.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'psychiatric.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/psychiatric.json');
          this.quizData = response.default;
          this.examName.name = 'Psychiatric'
          this.examName.path = 'src/assets/psychiatric.json'
          this.examName.url = 'psychiatric'
          this.$router.push({ name: 'exam', params: { examName: 'psychiatric' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/psychiatric.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/psychiatric.json'].questionStates;
            const currentIndex = parsedState['src/assets/psychiatric.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'high_acuity.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/high_acuity.json');
          this.quizData = response.default;
          this.examName.name = 'High Acuity Nursing'
          this.examName.path = 'src/assets/high_acuity.json'
          this.examName.url = 'high_acuity'
          this.$router.push({ name: 'exam', params: { examName: 'high_acuity' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/high_acuity.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/high_acuity.json'].questionStates;
            const currentIndex = parsedState['src/assets/high_acuity.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }

      if (filename === 'proffessional.json') {
        Loading.show({
          message: 'Loading questions, Hang on...',
          backgroundColor: 'blue',
        })
        try {

          const response = await import('src/assets/proffessional.json');
          this.quizData = response.default;
          this.examName.name = 'Proffessional Issues'
          this.examName.path = 'src/assets/proffessional.json'
          this.examName.url = 'proffessional'
          this.$router.push({ name: 'exam', params: { examName: 'proffessional' } });



          // Attempt to restore saved state from localStorage
          const savedState = localStorage.getItem('src/assets/proffessional.json');

          if (savedState) {
            const parsedState = JSON.parse(savedState);

            const questionStates = parsedState['src/assets/high_acuity.json'].questionStates;
            const currentIndex = parsedState['src/assets/high_acuity.json']
            this.currentIndex = currentIndex + 1
            this.questionStates = questionStates
            Loading.hide()

          } else {
            // No saved state, initialize
            this.initializeQuestionStates();
            this.currentIndex = 0;
            Loading.hide()

          }

        } catch (error) {
          console.error('Error loading exam:', error);
          Loading.hide()
        }
      }




    },

    // async requestReview() {
    //   await RateApp.requestReview();
    // },

    getChoiceNumbers(question) {
      // Assuming every question object has keys like "Choice 1", "Choice 2", etc.
      const choiceKeys = Object.keys(question).filter(key => key.startsWith('Choice'));
      return choiceKeys.map(key => parseInt(key.split(' ')[1]));
    },

    backToQuiz() {
      this.isBookmarked = false
      this.currentIndex = this.incorrectQuestionIndices[this.incorrectQuestionIndices.length - 1] + 1;
      this.retakeMode = false
    },

    goToNextQuestion() {

      this.isBookmarked = false;

      // if (!this.premium) {
      //   const currentQuestion = this.currentQuestion;

      //   // Show interstitial ad every 5 questions
      //   if (currentQuestion['Test Number'] % 5 === 0) {
      //     // Show loading overlay while the ad loads
      //     Loading.show({
      //       backgroundColor: 'purple',
      //     })

      //     // Call the method to show the interstitial ad
      //     this.showInterstitialAd().then(() => {
      //       // Hide the loading overlay when the ad has loaded
      //       Loading.hide();
      //     }).catch(error => {
      //       // Hide the loading overlay in case of an error
      //       Loading.hide();
      //       console.error('Error loading ad:', error);
      //     });
      //   }
      // }




      if (this.retakeMode) {

        const currentPos = this.incorrectQuestionIndices.indexOf(this.currentIndex);
        const state = this.questionStates[currentPos];
        if (!state.answerChecked) {
          return ''; // No class if the question hasn't been answered yet
        }
        const nextPos = currentPos + 1;

        if (nextPos < this.incorrectQuestionIndices.length) {
          // Move to the next incorrect question
          this.currentIndex = this.incorrectQuestionIndices[nextPos];
        } else {
          // End of retake; handle accordingly
          this.retakeMode = false;
          alert("You've completed the review.");
          if (this.lastIncorrectIndex !== null && this.lastIncorrectIndex < this.quizData.length - 1) {
            this.currentIndex = this.lastIncorrectIndex + 1;
          } else {
            // If the last incorrect question was the last question of the quiz, handle accordingly
            // For example, show a summary or end the quiz
            console.log("Quiz completed.");
            // Reset or handle quiz completion logic here
          }
        }

      } else {
        // Normal quiz flow
        if (this.currentIndex < this.quizData.length - 1) {
          this.currentIndex++;
        }


      }
    },

    startRetakeIncorrect() {

      // Directly use the computed property to set the first incorrect question
      const firstIncorrectIndex = this.incorrectQuestionIndices.length > 0 ? this.incorrectQuestionIndices[0] : -1;

      //  this.questionStates[firstIncorrectIndex].userAnswer = ""
      this.questionStates[firstIncorrectIndex].answerChecked = false

      this.lastIncorrectIndex = this.incorrectQuestionIndices[this.incorrectQuestionIndices.length - 1];

      if (firstIncorrectIndex !== -1) {
        this.retakeMode = true;
        this.currentIndex = firstIncorrectIndex;
      } else {
        alert("No incorrect questions to retake.");
      }
    },

    goBack() {
      this.isBookmarked = false

      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
    ,
    checkAnswer() {
      this.answeredQuestions++;
      const currentQuestion = this.currentQuestion;

      // // Show interstitial ad every 10 questions
      // if (currentQuestion['Test Number'] % 10 === 0) {
      //   this.showInterstitialAd();
      // }



      // Request review every 15 questions
      if (currentQuestion['Test Number'] % 5 === 0) {
        this.requestReview(); // Call your review request function
      }

      const currentState = this.questionStates[this.currentIndex];
      currentState.answerChecked = true;
      // Determine if the answer is correct
      if (currentQuestion.Type === 'Single') {
        currentState.didAnswerCorrect = currentQuestion.Answer === currentState.userAnswer;

        if (currentState.didAnswerCorrect) {
          const positiveMessages = [
            'Good Job!',
            'Excellent work!',
            'You nailed it!',
            'Right on target!',
            'Keep up the great work!',
            'Spot on!',
            'That’s correct!',
            'You’re doing great!',
            'You got it right!',
            'Perfect answer!',
            'Fantastic effort!',
            'Well done',
            'Spot on',
            'Correct',
            'Superb',
            'Nice work',
            'Great job',
            'Right answer',
            'Bravo',
            'Perfect',
            'Impressive'
          ];


          // Select a random message
          const randomIndex = Math.floor(Math.random() * positiveMessages.length);
          const randomMessage = positiveMessages[randomIndex];

          this.$q.notify({
            color: 'white',
            textColor: 'dark',
            message: randomMessage,
            icon: 'thumb_up',
            iconColor: 'teal',
            timeout: 1000,
            position: "top"
          })

        } else {
          this.$q.notify({
            color: 'white',
            textColor: 'dark',
            // type: 'negative',
            message: 'Marked for Review',
            icon: 'dangerous',
            iconColor: 'red',
            timeout: 1000,
            position: "top"
          })
        }

      } else if (currentQuestion.Type === 'Multiple') {
        // Ensure both are arrays and sort them for accurate comparison
        const correctAnswersSorted = Array.isArray(currentQuestion.Answer) ? currentQuestion.Answer.sort() : [currentQuestion.Answer];
        const userAnswersSorted = Array.isArray(currentState.userAnswer) ? currentState.userAnswer.sort() : [currentState.userAnswer];

        // Compare the arrays
        currentState.didAnswerCorrect = JSON.stringify(correctAnswersSorted) === JSON.stringify(userAnswersSorted);
      }

      currentState.answerDate = new Date().toISOString();
      // Save the updated state

      const dailyGoal = parseInt(LocalStorage.getItem('standardQuestions'), 10);


      if (this.answeredQuestions >= dailyGoal) {

        const today = new Date().toDateString(); // Simplify to just the date
        const lastNotificationDate = LocalStorage.getItem('dailyGoalNotificationDate');

        if (lastNotificationDate !== today) {
          // Show a message to the user indicating that they've reached their daily goal
          this.$q.notify({
            color: 'white',
            textColor: 'dark',
            icon: 'thumb_up',
            iconColor: 'purple',
            message: `You crushed your daily goal of ${dailyGoal} questions! How many more can you conquer? 🤔`,
            timeout: 5000, // Adjust timeout as needed
            position: "bottom"
          });
          LocalStorage.set('dailyGoalNotificationDate', today);
        }
      }
      this.saveQuizState();

    },

    saveQuizState() {
      const quizDataToSave = {

        [this.examName.path]: {
          currentIndex: this.currentIndex,
          questionStates: this.questionStates,
        }
      };
      localStorage.setItem(this.examName.path, JSON.stringify(quizDataToSave));
    },

    getOptionClass(n) {
      const state = this.questionStates[this.currentIndex];
      const question = this.currentQuestion;

      // Ensure we have state and the user has checked an answer
      if (!state || !state.answerChecked) {
        return '';
      }

      if (question.Type === 'Single') {
        // Single answer logic remains the same
        return question.Answer === n.toString() ? 'correct-answer' : 'incorrect-answer';
      } else if (question.Type === 'Multiple') {
        // For multiple answers, check if the option was part of the user's answer and if it's correct
        const isOptionSelected = state.userAnswer.includes(n.toString());
        const isOptionCorrect = question.Answer.includes(n.toString());

        if (isOptionCorrect) {
          return 'correct-answer'; // Correct options are always green
        } else if (!isOptionCorrect) {
          return 'incorrect-answer'; // Incorrectly selected options are red
        }
      }

      return ''; // Default, no additional class for unselected incorrect options in 'Multiple'
    },

    confirmResetQuiz() {
      Dialog.create({
        title: 'Confirm Reset',
        message: 'Are you sure you want to reset the quiz? All progress will be lost.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.resetQuiz();
      }).onCancel(() => {
        // Handle cancellation, if necessary
      });
    },

    resetQuiz() {
      this.currentIndex = 0;
      // Reset while preserving all necessary fields
      this.questionStates = this.quizData.map(question => ({
        userAnswer: question.Type === 'Multiple' ? [] : null,
        answerChecked: false,
        didAnswerCorrect: false,
        answerDate: null,
        testNumber: question["Test Number"],
      }));

      localStorage.removeItem('quizState'); // Consider if you need to preserve any part of quizState in localStorage
      this.saveQuizState(); // Optionally, save the reset state immediately to localStorage
    },
    initializeQuestionStates() {

      this.questionStates = this.quizData.map(question => ({
        userAnswer: question.Type === 'Multiple' ? [] : null, // Initialize as empty array for 'Multiple'
        answerChecked: false,
        didAnswerCorrect: false,
        answerDate: null,
        testNumber: question["Test Number"],
      }));
    },

    async initializeAdMob() {
      try {
        await AdMob.initialize();

        const [trackingInfo, consentInfo] = await Promise.all([
          AdMob.trackingAuthorizationStatus(),
          // AdMob.requestConsentInfo(),
        ]);

        if (trackingInfo.status === 'notDetermined') {
          await AdMob.requestTrackingAuthorization();
        }

        const authorizationStatus = await AdMob.trackingAuthorizationStatus();
        if (
          authorizationStatus.status === 'authorized' &&
          consentInfo.isConsentFormAvailable &&
          consentInfo.status === AdmobConsentStatus.REQUIRED
        ) {
          await AdMob.showConsentForm();
        }

        console.log('AdMob initialized successfully');
      } catch (error) {
        console.error('Error initializing AdMob:', error);
      }
    },


    // Function to load and show interstitial ad
    async showInterstitialAd() {
      // Add listener for the Loaded event
      AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
        // Subscribe prepared interstitial
        console.log('Interstitial ad loaded:', info);
      });

      // Prepare interstitial ad
      const options: AdOptions = {
        adId: 'ca-app-pub-6940124311401745/2354869780', // Replace with your interstitial ad ID
        // isTesting: true
      };


      try {
        // Load interstitial ad
        await AdMob.prepareInterstitial(options);

        // Show interstitial ad
        await AdMob.showInterstitial();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    },


    async showBannerAd() {

      // const bannerOptions: BannerAdOptions = {
      //   adId: 'ca-app-pub-6940124311401745/1937607741', // Replace with your banner ad ID
      //   adSize: BannerAdSize.ADAPTIVE_BANNER, // Use the enum for adSize
      //   position: BannerAdPosition.BOTTOM_CENTER, // Use the enum for position
      //   isTesting: true,// Enable this for testing purposes
      //   margin: 30,

      // };

      // try {
      //   // Prepare and show banner ad
      //   await AdMob.showBanner(bannerOptions);

      //   // Add event listeners for banner ad events
      //   AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
      //     console.log('Banner ad loaded successfully');
      //   });

      //   AdMob.addListener(BannerAdPluginEvents.FailedToLoad, (error) => {
      //     console.error('Failed to load banner ad:', error);
      //   });

      //   // Hide banner ad when navigating to specific routes (if needed)
      //   this.router.beforeEach((to, from, next) => {
      //     if (this.conditionToHideAd(to.path)) {
      //       AdMob.hideBanner();
      //     }
      //     next();
      //   });

      // } catch (error) {
      //   console.error('Error showing banner ad:', error);
      // }
    }

  },

  async created() {

    console.log('IndexPage created, current exam name:', this.$route.params.examName);



    // Set a default value for this.urlParam if it's undefined
    const defaultUrlParam = this.urlParam || 'maternity';

    const examNameMapping = {
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
      pediatric: 'Pediatric',
      psychiatric: 'Psychiatric',
      high_acuity: 'High Acuity',
      proffessional: 'Proffessional Issues',
      pathophysiology: 'Pathophysiology',
    };


    const humanReadableName = examNameMapping[this.urlParam];

    this.premium = LocalStorage.getItem('premium')
    // this.premium = true
    this.subscriber = LocalStorage.getItem('subscriber')
    try {

      let initializedExam = await import('src/assets/basic_nursing.json');

      let response = initializedExam


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
      if (this.urlParam == 'pathophysiology') {
        response = await import('src/assets/pathophysiology.json');
      }
      const jsonData = await response;

      this.quizData = jsonData.default; // Assign the parsed JSON data to quizData

      this.examName.name = humanReadableName;
      this.examName.path = `src/assets/${defaultUrlParam}.json`
      this.examName.url = defaultUrlParam


      // Attempt to restore saved state from localStorage
      const savedState = localStorage.getItem(`src/assets/${defaultUrlParam}.json`);


      if (savedState) {
        const parsedState = JSON.parse(savedState);

        const questionStates = parsedState[`src/assets/${defaultUrlParam}.json`].questionStates;
        const currentIndex = parsedState[`src/assets/${defaultUrlParam}.json`].currentIndex

        // Assuming you want to ensure the user continues where they left off
        this.currentIndex = currentIndex + 1 || 0;
        this.questionStates = questionStates || this.initializeQuestionStates();

        Loading.show({
          message: `Loading questions, please wait...`
        })
      } else {

        // No saved state, initialize
        this.initializeQuestionStates();
        this.currentIndex = 0;
      }

      Loading.hide()
    } catch (error) {
      console.error("Error loading quiz data:", error);
    }
    this.initializeAdMob();
    // Retrieve dark mode state from local storage
    const darkModeState = localStorage.getItem('darkMode');
    if (darkModeState !== null) {
      // Set darkModeToggle to the retrieved state
      this.darkModeToggle = JSON.parse(darkModeState);
      // Update dark mode based on the retrieved state
      this.$q.dark.set(this.darkModeToggle);
    }


    // this.showBannerAd()
  },

};
</script>


<style scoped>
.bgGradient {
  /* background: linear-gradient(135deg, #8a2be2 20%, #075CCD 100%); */
  background: #5372ff;

}

.app-container {
  display: flex;

  height: 100vh;
  /* Make the container take up the full viewport height */
  justify-content: space-between;
  /* Space content and push the last child to the bottom */
}

.correct-answer {
  border-radius: 10px;
  border: 3px solid rgb(15, 209, 157);
  font-weight: 500;
  max-width: 400px;
  background-color: #f8f3f5;

}

.incorrect-answer {
  border: 3px solid rgb(238, 110, 176);
  max-width: 400px;
  border-radius: 10px;
}

</style>
