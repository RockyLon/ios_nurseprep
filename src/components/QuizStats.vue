<template>
  <q-page class="bg-grey-3 q-px-md q-pt-md">
    <q-header class="bg-grey-3 text-grey-8">
      <q-toolbar>
        <q-btn :to="`/${urlParam}`" flat icon="chevron_left"></q-btn>
        <q-toolbar-title class="text-body1 text-body1 text-center q-mr-xl">Stats for
          {{ humanReadableName }}</q-toolbar-title>
        <q-btn @click="shareApp" size="sm" flat class="purple-5" label="Share" stack no-caps icon="share"></q-btn>

        <!-- <q-btn to="/sources" icon="help" flat label="Sources" stack no-caps size="sm"></q-btn> -->

        <!-- <q-btn to="/upgrade" flat label="Unlimited" no-caps stack size="sm" icon="rocket_launch"></q-btn> -->





      </q-toolbar>


    </q-header>

    <!-- <q-btn @click="requestReview">Rate Our App</q-btn> -->
    <!-- <q-btn v-if="!hasPremium && skuDetails == null" @click="upgrade">upgrade</q-btn> -->
    <!--
    <div v-for="offer in offerings.skus" :key="offer.producId">
      <div>{{ offer.product.title }}</div>
      <div>{{ offer.product.description }}</div>

      <q-btn color="green" rounded :label="`${offer.product.currencyCode} ${offer.product.price}`"
        @click="() => initiatePurchase({ sku: offer })" />
    </div> -->


    <div class="stats bgGradient text-white q-mb-lg" style="border-radius: 10px;">

      <div class="row justify-between  q-pa-sm">
        <div class="col-8">

          <q-list dark style="width: 230px;">
            <!-- correct  -->
            <q-item class=" q-mb-sm">
              <q-item-section avatar>
                <q-btn flat round :label="correctCount"></q-btn>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-body2">Correct</q-item-label>
                <q-item-label caption>Continue</q-item-label>
              </q-item-section>

              <q-item-section avatar v-if="(incorrectCount + correctCount) <= 25 || premium">
                <q-btn :to="`/${urlParam}`" @click="confirmResetQuiz" flat icon="chevron_right"></q-btn>
              </q-item-section>

              <q-item-section avatar v-else>
                <q-btn to="/upgrade" @click="confirmResetQuiz" flat icon="rocket_launch"></q-btn>
              </q-item-section>

            </q-item>

            <!-- incorrect  -->
            <q-item style="border-radius: 10px; width: 230px;">
              <q-item-section avatar>
                <q-btn flat round :label="incorrectCount"></q-btn>

              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold text-body2">Incorrect</q-item-label>
                <q-item-label caption>Try again</q-item-label>
              </q-item-section>
              <q-item-section avatar v-if="incorrectCount > 0">
                <q-btn v-if="premium" :to="`/incorrect-answers/${urlParam}`" flat icon="chevron_right"></q-btn>
                <q-btn v-else :to="`/upgrade`" flat icon="lock"></q-btn>
              </q-item-section>

            </q-item>

            <!-- bookmarked -->
            <q-item class="q-mt-md" style="width: 230px;">
              <q-item-section avatar>
                <q-btn flat round :label="bookmarkedCount"></q-btn>

              </q-item-section>


              <q-item-section>
                <q-item-label class="text-bold text-body2">Bookmarked</q-item-label>
                <q-item-label caption>Review</q-item-label>
              </q-item-section>
              <q-item-section avatar v-if="bookmarkedCount > 0">

                <q-btn v-if="premium" :to="`/bookmarked/${urlParam}`" flat icon="chevron_right"></q-btn>
                <q-btn v-else :to="`/upgrade`" flat icon="lock"></q-btn>
              </q-item-section>

            </q-item>

            <!-- total questions and reset  -->
            <q-item class="q-mt-sm" v-if="questionStates.length" style="width: 320px;">
              <q-item-section avatar>
                <q-btn flat round :label="incorrectCount + correctCount"></q-btn>

              </q-item-section>
              <q-item-section>
                <q-item-label class="text-bold text-body2">Reset Exam</q-item-label>
                <q-item-label caption>Clear answers & try again</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-btn @click="confirmResetQuiz" flat icon="restart_alt"></q-btn>

              </q-item-section>
            </q-item>


          </q-list>


        </div>



        <div class="column items-center">
          <div class="text-white text-bold">Score <q-btn class="bgListNum q-ml-sm" size="sm" flat round
              :label="letterScore"></q-btn></div>
          <q-circular-progress rounded show-value :value="percentageScore" size="70px" :thickness="0.4"
            track-color="grey-9" class="q-ma-md text-bold ">
            <span style="font-size: 12px;">{{ percentageScore.toFixed() }}</span>
            %</q-circular-progress>
        </div>



      </div>




      <!-- <q-card flat bordered class="q-ma-md">
  <q-card-section>
    <div class="text-h6">Quiz Summary</div>
  </q-card-section>

  <q-card-section class="q-pt-none">
    <div><b>Correct Answers:</b> {{ correctCount }}</div>

    <q-btn to="/incorrect-answers"> Incorrect Answers: {{ incorrectCount }}</q-btn>

    <div><b>Percentage Score:</b> {{ percentageScore.toFixed() }}%</div>
  </q-card-section>
</q-card> -->
    </div>




    <div>
      <!-- study goals  -->
      <!-- <q-list style="width: 350px;">
        <q-item style="border-radius: 10px;">
          <q-item-section avatar>
            <q-btn flat class="deep-purple-5 bg-deep-purple-3" round icon="notifications_active"></q-btn>

          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-body2">Create daily reminders</q-item-label>
            <q-item-label caption>Stay on track and reach your goals!</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn to="/daily-habits" color="purple-10" flat icon="chevron_right"></q-btn>
          </q-item-section>
        </q-item>
      </q-list> -->

      <!-- reset quiz  -->
      <!-- <q-list v-if="questionStates.length" style="width: 350px;" class="q-mt-md">
        <q-item style="border-radius: 10px;">
          <q-item-section avatar>
            <q-btn flat class="deep-purple-5 bg-deep-purple-3" round :label="incorrectCount + correctCount"></q-btn>

          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-body2">Questions Answered</q-item-label>
            <q-item-label caption>Clear Answers & Try Again</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn @click="confirmResetQuiz" flat color="purple-10" icon="restart_alt"></q-btn>

          </q-item-section>
        </q-item>
      </q-list> -->

      <!-- upgrade  -->
      <!-- <q-list v-if="!premium" style="width: 350px;" class="q-mt-md">
        <q-item style="border-radius: 10px;">
          <q-item-section avatar>
            <q-btn flat class="deep-purple-5 bg-deep-purple-3" round icon="rocket_launch"></q-btn>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-bold text-body2">Upgrade</q-item-label>
            <q-item-label caption>Get unlimited practice</q-item-label>
          </q-item-section>
          <q-item-section avatar>
            <q-btn color="purple-10" to="upgrade" flat icon="chevron_right"></q-btn>
          </q-item-section>
        </q-item>
      </q-list> -->
    </div>

    <q-footer class="bg-grey-3 text-grey-8 row justify-around q-pb-lg"
      :class="darkModeToggle ? 'bg-grey-10' : 'bg-white'">

      <q-btn size="sm" color="grey-9":to="`/daily-habits/${urlParam}`" flat label="Study Habits" stack no-caps
        icon="notifications"></q-btn>

      <q-btn size="sm" color="grey-9" to="/apps" flat label="Apps Hub" stack no-caps icon="apps"></q-btn>



      <!-- <q-btn size="sm" :to="`/${urlParam}`" flat class="purple-5" label="Continue" stack no-caps
        icon="quiz"></q-btn> -->

      <q-btn size="sm" color="grey-9" v-if="!premium" :to="`/upgrade`" flat stack no-caps label="Unlimited"
        icon="emoji_events"></q-btn>

    </q-footer>

    <div>
      <!-- <div v-if="questionStates.length" class="column text-center ">
        <div class="text-body1 ">Last 7 Days Stats</div>
      </div> -->
      <ChartComponent :urlParam="urlParam" class="bg-grey-3" />
      <ChartTotalQuestions :urlParam="urlParam" class="bg-grey-3 " />
    </div>


    <!-- <q-page-sticky position="bottom-right" :offset="[20, 20]">
      <q-btn class="q-pa-sm" icon="close" flat color="deep-purple" to="/" />
    </q-page-sticky> -->


  </q-page>
</template>

<script>
import ChartComponent from '../components/ChartComponent.vue';
import ChartTotalQuestions from '../components/ChartTotalQuestions.vue';
import { Dialog, LocalStorage } from 'quasar'
// import { Glassfy } from 'capacitor-plugin-glassfy';
import { RateApp } from 'capacitor-rate-app';
import { Share } from '@capacitor/share';
// import { AdMob} from '@capacitor-community/admob';


export default {
  components: {
    ChartComponent,
    ChartTotalQuestions
  },

  data() {
    return {

      questionStates: [],
      quizData: [],
      offerings: [],
      hasPremium: null,
      skuDetails: null,
      premium: false,
      urlParam: this.$route.params.examName,

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
        pediatric: 'Pediatric',
        psychiatric: 'Psychiatric',
        high_acuity: 'High Acuity',
        proffessional: 'Proffessional',
        pathophysiology: 'Pathophysiology',
      }



    };
  },

  methods: {

    async shareApp() {
      try {
        await Share.share({
          title: 'Nursing Exams Hub - NursePrep',
          text: '29k Questions and Rationales',
          url: 'https://apps.apple.com/us/app/nursing-exams-hub-nurseprep/id6499525397',
          dialogTitle: 'Share with classmates',
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    },

    async requestReview() {
      await RateApp.requestReview();
    },

    confirmResetQuiz() {
      Dialog.create({
        title: 'Clear Answers & Restart?',
        message: 'Are you sure you want to clear all answered questions and restart the quiz?',
        cancel: true,
        color: 'purple',

      }).onOk(() => {
        this.resetQuiz();
      }).onCancel(() => {
        // Handle cancellation, if necessary
      });
    },
    resetQuiz() {
      // console.log(this.quizData)
      //       // Reset while preserving all necessary fields
      //       this.questionStates = this.quizData.map(question => ({
      //         userAnswer: question.Type === 'Multiple' ? [] : null,
      //         answerChecked: false,
      //         didAnswerCorrect: false,
      //         answerDate: null,
      //         testNumber: question["Test Number"],
      //         reviewed: false
      //       }));
      //       this.questionStates = []

      const filePath = `src/assets/${this.urlParam}.json`;

      localStorage.removeItem(filePath); // Consider if you need to preserve any part of quizState in localStorage
      // this.saveQuizState(); // Optionally, save the reset state immediately to localStorage



      this.$router.push(`/${this.urlParam}`);
    },
    saveQuizState() {
      const quizDataToSave = {
        currentIndex: 0,
        questionStates: this.questionStates,

      };
      localStorage.setItem('quizState', JSON.stringify(quizDataToSave));
    },
    async loadQuizData() {
      // Example of loading quizData and questionStates from localStorage
      // const savedState = localStorage.getItem('quizState');
      const filePath = `src/assets/${this.urlParam}.json`;


      const savedState = localStorage.getItem(filePath);


      if (savedState) {
        const parsedState = JSON.parse(savedState);
        this.questionStates = parsedState[filePath].questionStates;

        // const response = await import(filePath);
        // if (response.ok) {
        //   const jsonData = await response.json();
        //   this.quizData = jsonData;
        // } else {
        //   console.error('Failed to fetch quiz data:', response.status);
        // }
      }
      // Additional logic to load or initialize quizData if not using localStorage
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

    async hideBannerAd() {
      try {
        await AdMob.hideBanner();
      } catch (error) {
        console.error('Error hiding banner ad:', error);
      }
    },
  },
  computed: {
    humanReadableName() {
      console.log('this.urlParam', this.urlParam)
      return this.examNameMapping[this.urlParam];
    },

    correctCount() {
      // Trigger review after 5 correct answers (adjust as needed)
      if (this.correctCount >= 5) {
        this.requestReview(); // Call your review request function
        // Optionally, add logic to prevent showing the review again
      }
      // Counts the number of questions that were answered correctly.
      return this.questionStates.reduce((acc, state) => acc + (state.didAnswerCorrect ? 1 : 0), 0);
    },

    incorrectCount() {
      // Counts the number of questions that were either answered incorrectly or not answered at all,
      // but only if the question was attempted (i.e., answerChecked is true).
      return this.questionStates.reduce((acc, state) => acc + (state.answerChecked && !state.didAnswerCorrect ? 1 : 0), 0);
    },

    bookmarkedCount() {
      return this.questionStates.reduce((acc, state) => acc + (state.bookmarked ? 1 : 0), 0);
    },

    percentageScore() {
      // Count the number of answered questions
      const answeredCount = this.questionStates.filter(state => state.answerChecked).length;

      // Calculate the percentage based on answered questions only
      if (answeredCount > 0) {
        return (this.correctCount / answeredCount) * 100;
      }
      return 0; // Return 0 if no questions have been answered
    },

    letterScore() {
      const percentage = this.percentageScore;
      if (percentage >= 97) {
        return 'A+';
      } else if (percentage >= 93) {
        return 'A';
      } else if (percentage >= 90) {
        return 'A-';
      } else if (percentage >= 87) {
        return 'B+';
      } else if (percentage >= 83) {
        return 'B';
      } else if (percentage >= 80) {
        return 'B-';
      } else if (percentage >= 77) {
        return 'C+';
      } else if (percentage >= 73) {
        return 'C';
      } else if (percentage >= 70) {
        return 'C-';
      } else if (percentage >= 67) {
        return 'D+';
      } else if (percentage >= 63) {
        return 'D';
      } else if (percentage >= 60) {
        return 'D-';
      } else {
        return 'F';
      }
    }

  },
  mounted() {
    // this.initializeAdMob()
    // this.hideBannerAd()
    this.loadQuizData();
    this.premium = LocalStorage.getItem('premium')
    this.hasPremium = LocalStorage.getItem('premium');
    this.skuDetails = LocalStorage.getItem('subscriber');
  },
}

</script>


<style scoped>
.bgGradient {
  /* background: linear-gradient(135deg, #8a2be2 20%, #075CCD 100%); */
  background: #5372ff;

}

.bgListNum {
  background: white;
  color: black;
}
</style>
