<template>
  <q-page class="bg-color text-black">
    <q-carousel ref="carousel" dark v-model="slide" transition-prev="scale" transition-next="scale" swipeable animated
      class="bg-color" style="height: 100vh;">
      <template v-slot:navigation-icon="{ active, btnProps, onClick }">
        <q-btn v-if="active" size="lg" icon="adjust" color="blue" flat round dense @click="onClick" />
        <q-btn v-else size="sm" :icon="btnProps.icon" color="white" flat round dense @click="onClick" />
      </template>

      <q-carousel-slide name="welcome" class="column justify-end  items-center "
        style="position: relative; background-size: cover; background-position: center; background-image: url('/upgrade1.png');">

        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 0;"></div>


        <div class="text-center text-white" style="z-index: 1; margin-bottom: 80px;">
          <div class="text-h4 text-bold q-mb-sm ">We turn exam stress into study progress
          </div>

          <div class="text-body1 q-mb-lg text-grey-3">
            Overwhelming exams. Constant pressure. Never enough time to study. If you're feeling burnt out or behind
            you're
            not alone</div>
          <q-btn rounded color="primary" class=" full-width q-pa-md" @click="goToNextSlide" label="Get Started"
            no-caps />
        </div>
      </q-carousel-slide>


      <q-carousel-slide name="survey1" class="column items-center justify-center q-pa-lg">
        <q-img src="/processing.svg" spinner-color="white" style="height: 170px; max-width: 200px;" />

        <div class="text-h6 text-bold text-center q-my-xl">
          What’s Your Biggest Challenge?
        </div>

        <q-btn v-for="(option, index) in survey1" :key="index" :label="option"
          :style="selectedChallenge === option ? 'border: 2px solid #1976D2;' : ''" @click="selectChallenge(option)"
          no-caps class="text-body1 full-width q-pa-md q-mb-sm" color="grey-3" text-color="black" rounded unelevated />

        <q-btn v-if="selectedChallenge" label="Next" color="primary" class="full-width q-mt-md q-pa-md" no-caps rounded
          unelevated @click="goToNextSlide" />
      </q-carousel-slide>


      <q-carousel-slide name="survey2" class="column items-center justify-center q-pa-lg">

        <q-img src="/book.svg" spinner-color="white" style="height: 170px; max-width: 220px;" />

        <div class="text-h6 text-bold text-center q-my-xl">
          What Subject Stresses You Most?
        </div>


        <q-btn v-for="(option, index) in survey2" :key="index" :label="option"
          :style="selectedChallenge === option ? 'border: 2px solid #1976D2;' : ''" @click="selectChallenge(option)"
          no-caps class="text-body1 full-width q-pa-md q-mb-sm" color="grey-3" text-color="black" rounded unelevated />


        <q-btn v-if="selectedChallenge" label="Next" color="primary" class="full-width q-mt-md q-pa-md" no-caps rounded
          unelevated @click="goToNextSlide" />

      </q-carousel-slide>

      <q-carousel-slide name="solution" class="column items-center justify-center q-pa-lg">
        <q-img src="/map.svg" spinner-color="white" style="height: 170px; max-width: 220px;" />

        <div class="text-h4 text-bold text-center q-mb-md">
          You're Not Alone
        </div>
        <div class="text-body1 text-center q-mb-xl">
          NursePrep is your study map — guiding you through nursing school with 30,000+ questions. This isn’t just
          practice.
          It’s your strategy to pass nursing school.
        </div>

        <q-btn v-for="(option, index) in solution" :key="index" :label="option" @click="selectChallenge(option)" no-caps
          class="text-body1 full-width q-pa-md q-mb-sm" color="grey-3" text-color="black" rounded unelevated />


        <q-btn label="Set Daily Goal" color="primary" class="full-width q-mt-md q-pa-md" no-caps rounded unelevated
          @click="goToNextSlide" />

      </q-carousel-slide>


      <q-carousel-slide name="dailyPlan" class="column items-center justify-center q-pa-lg">
        <q-img src="/exam.svg" spinner-color="white" style="height: 170px; max-width: 220px;" />

        <div class="text-h6 text-bold text-center q-my-md">
          How Many Questions Do You Want to Practice Each Day?
        </div>
        <div class="text-body1 text-center q-mb-xl">
          Pick a number that feels doable. You’ll get reminders to help you stick with it.
        </div>


        <q-btn v-for="(option, index) in dailyPlan" :key="index" :label="option"
          :style="selectedChallenge === option ? 'border: 2px solid #1976D2;' : ''" @click="selectDailyPlan(option)"
          no-caps class="text-body1 full-width q-pa-md q-mb-sm" color="grey-3" text-color="black" rounded unelevated />

        <q-btn v-if="selectedChallenge" label="Create Daily Goal" color="primary" class="full-width q-mt-md q-pa-md"
          no-caps rounded unelevated @click="saveStandard" />

      </q-carousel-slide>


      <q-carousel-slide   ref="carouselRef" name="reminders" class="column items-center justify-center q-pa-lg">
        <q-img src="/task.svg" spinner-color="white" style="height: 232px; max-width: 280px;" />

        <div class="text-h4 text-bold text-center q-my-md">
          Stay on Track
        </div>
        <div class="text-body1 text-center q-mb-xl">
          Stay consistent with gentle daily reminders at your chosen time to help you build momentum and stay sharp.
        </div>

        <div class="row">
          <q-input  dense  outlined class="q-mx-sm bg-grey-6" v-model="notificationTime" type="time" />
          <q-btn v-if="notificationTime" label="Set Reminder Time"  size="md" no-caps class="btn-color"
            @click="requestNotificationPermission" />
        </div>
      </q-carousel-slide>


      <q-carousel-slide name="review" class="column items-center justify-center q-pa-lg">
        <q-img src="/review.svg" spinner-color="white" style="height: 260px; max-width: 200px;" />

        <div class="text-h5 text-bold text-center q-my-md">
          Enjoying NursePrep so far?
        </div>
        <div class="text-body1 text-center">
          A quick review helps us grow and support more nursing students like you.
        </div>

        <div class="q-pa-md flex flex-center" style="height: 60px; position: relative;">


          <div style="position: relative; width: 200px;">
            <q-avatar v-for="n in 5" :key="n" size="40px" class="overlapping"
              :style="`position: absolute; left: ${n * 25}px; z-index: ${100 - n};`">
              <img :src="`https://cdn.quasar.dev/img/avatar${n + 1}.jpg`" />
            </q-avatar>
          </div>
        </div>

        <q-rating v-model="dummyRating"  size="2.5em" color="orange" class="q-my-md" />

        <q-btn label="Continue" no-caps icon="volunteer_activism" color="primary" text-color="white"
          class="full-width q-mt-md q-pa-md" @click="requestReview()" rounded unelevated />

        <div class="text-caption text-center q-mt-sm text-grey-7">
          “Helped me pass my fundamentals exam!” – <span class="text-bold text-black">Ashley R. </span><br>
          “Love the reminders and the huge question bank.” – <span class="text-bold text-black">Marcus D. </span>
        </div>


      </q-carousel-slide>


    <q-carousel-slide name="trial" class="column items-center justify-center ">
  <q-img src="/reading.svg" spinner-color="white" style="height: 260px; max-width: 240px;" />

  <div class="text-h5 text-bold text-center q-my-sm">
    <span class="text-h4 text-bold text-primary">You’re All Set</span><br>Start your first set of questions.
  </div>

  <!-- <div class=" text-center q-mb-sm">
    ✓ <span class="text-bold">One-Time Payment. Lifetime Access.</span> All subjects. All questions. No ads. No limits.
  </div> -->

  <q-btn label="Ready to Learn" color="primary" class="full-width q-mt-lg q-pa-md text-white"
    no-caps rounded unelevated @click="finishOnboarding()" />
</q-carousel-slide>


      <!-- <q-carousel-slide name="trial_end_reminder" class="column justify-center  ">

        <div class="column items-center">
          <q-img src="/notification.svg" spinner-color="white" style="height: 100px; max-width: 100px;" />

          <div class="text-h4 text-bold">
            <br>How your free trial works.
          </div>


          <q-timeline color="primary" layout="dense" class=" q-ma-md" style="max-width: 320px;">


            <q-timeline-entry icon="lock_open" color="green" title="Today"
              body="Unlock full access to 30,000+ Questions Free" />

            <q-timeline-entry color="orange-8" icon="notifications" title="In 6 Days – Reminder"
              body="We’ll notify you before your trial ends." />

            <q-timeline-entry color="black" icon="credit_card" title="In 7 Days – Billing Starts"
              body="You’ll be charged unless canceled." />
          </q-timeline>

          <q-btn label="Continue" color="primary" class="full-width q-mt-lg q-pa-md text-white" no-caps rounded
            unelevated @click="finishOnboarding()" />
        </div>



      </q-carousel-slide> -->


      <!-- enable notifications  -->
      <!-- Enable Notifications Slide -->
      <!-- <q-carousel-slide name="notifications" class="column justify-end items-center q-pa-lg"
        style="position: relative; background-size: cover; background-position: center; background-image: url('/upgrade4.png');">

        <div style="
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 0;"></div>


        <div class="text-center text-white justify-center row" style="z-index: 1;  margin-bottom: 80px;">
          <div class="text-h4 text-bold q-mb-md">Success Starts with Consistency</div>
          <div class=" q-mb-lg">
            Daily practice builds confidence. Get reminders that keep you on track every step of the way.
          </div>
          <div class="row">
            <q-input dark dense rounded outlined class="q-mx-sm" v-model="notificationTime" type="time" />
            <q-btn v-if="notificationTime" label="Set Daily Reminders" rounded size="md" no-caps class="btn-color"
              @click="requestNotificationPermission" />
          </div>
        </div>
      </q-carousel-slide> -->




      <!-- Start Quiz Slide -->
      <!-- <q-carousel-slide name="start-quiz" class="column no-wrap flex-center">
        <q-img src="/onboarding3.svg" spinner-color="white" style="height: 270px; max-width: 270px;" />
        <div class="q-mt-md text-center">
          <div class="text-h5 text-bold q-mx-lg q-mb-sm">Feel Confident for your next nursing exam</div>
          <div class="text-body1 q-mx-lg">
            Detailed performance metrics, <span class="text-bold">question retakes,
              bookmarking</span>, and daily practice notifications
          </div>
          <div>
            <q-card flat class="q-pa-md bg-color" style="width: 400px;">
              <q-card-actions align="center">
                <q-btn flat rounded style="width: 200px;" class="btn-color" @click="goToNextSlide">
                  Continue
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-carousel-slide> -->

      <q-carousel-slide name="pro" class="column justify-end items-center q-pa-md"
        style="position: relative; background-size: cover; background-position: center; background-image: url('/upgrade3.png');">
        <!-- Dark overlay -->
        <div style="
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 0;
          "></div>

        <!-- Foreground content -->
        <div class="text-center text-white" style="z-index: 1; margin-bottom: 80px;">
          <div class="text-h4 text-bold q-mb-md">You’re Ready to Begin</div>
          <div class="text-body2 q-mb-lg">
            Let’s start building your confidence and passing your exams — one question at a time.
          </div>
          <q-btn label="Start Now" rounded size="md" class="btn-color" @click="finishOnboarding" />
        </div>
      </q-carousel-slide>

    </q-carousel>
  </q-page>
</template>

<script>
import { LocalStorage,Dialog, date, Loading, QSpinnerFacebook, Platform } from 'quasar';
import { RateApp } from 'capacitor-rate-app';
import { LocalNotifications } from '@capacitor/local-notifications';
// import { Purchases } from '@revenuecat/purchases-capacitor'
import { App } from '@capacitor/app'

export default {
  data() {
    return {
      revenueCatApiKey: process.env.VUE_APP_GLASSFY_API_KEY,

       dummyRating: 5 ,
      slide: 'welcome',
      age: null,
      finishOnboardingBtn: false,
      notificationTime: date.formatDate(new Date(), 'hh:mm'),
      urlParam: this.$route.params.examName,
      standard: 10,
      notificationsEnabled: false,
      // time: ref(new Date()),
      // time: date.formatDate(new Date(), 'hh:mm A'),
      selectedChallenge: null,
      survey1: [
        'Too many exams',
        'I forget what I study',
        'I don’t know where to start',
        'I panic during tests'
      ],

      survey2: [
        'Pharm',
        'OB/Peds',
        'Mental Health',
        'All of them 😵‍💫'
      ],

      solution: [
        'Daily Study Goals',
        'Smart Notifications',
        '30,000+ Questions',
      ],

      dailyPlan: [
        '🎯 10 Questions – Light & Steady',
        '🔥 20 Questions – Focus Mode',
        '🚀 30 Questions – Power Through',
      ]

    };
  },
  methods: {

    selectChallenge(option) {
      this.selectedChallenge = option;
    },

    selectDailyPlan(option) {
      this.selectedDailyPlan = option;
      this.selectedChallenge = option

      const match = option.match(/\d+/);
      if (match) {
        this.standard = parseInt(match[0], 10);
      }
    },
    saveStandard() {
      Loading.show({
        message: 'Configuring your study goal...',
        spinner: QSpinnerFacebook,
        spinnerColor: 'orange',
        backgroundColor: 'black',
        textColor: 'white'

      }); // Show loading immediately

      setTimeout(() => {
        LocalStorage.set('standardQuestions', this.standard);

        this.$q.notify({
          color: 'white',
          textColor: 'dark',
          iconColor: 'primary',
          message: `Got it! We'll remind you when you've completed your daily goal of ${this.standard} questions.`,
          icon: 'thumb_up',
          timeout: 3000,
          position: "top"
        });

        Loading.hide(); // Hide loading before navigating
        this.goToNextSlide();
      }, 3500); // Simulate processing delay
    },


    async toggleNotifications() {
      if (this.notificationsEnabled) {

        // Call a method for enabling notifications (e.g., scheduleNotification)
        console.log('Requesting permission for notifications...');
        await this.requestNotificationPermission();
      } else {
        console.log('Notifications disabled');

        // Call a method for disabling notifications (e.g., cancelNotification)
        await this.cancelNotification();
      }
    },

async requestNotificationPermission() {
  if (Platform.is.android) {
    await this.initializeNotificationChannels();
  }

  try {
    const permissionStatus = await LocalNotifications.requestPermissions();

    if (permissionStatus.display === 'denied') {
      this.notificationDenied = 'Must enable notification';
     Dialog.create({
  title: 'Notifications Disabled',
  message: `You've previously turned off notifications for the app. To re-enable them, please:
  1. Go to your phone's Settings.
  2. Tap on 'Apps' or 'Apps & Notifications'.
  3. Find this app and enable notifications.`,
  cancel: true,
  persistent: true,
})
.onOk(() => {
  this.goToNextSlide(); // 👈 move to next slide when OK is clicked
});

    } else if (permissionStatus.display === 'granted') {
      LocalStorage.set('notification', true);
      this.notificationsEnabled = true;

      if (!this.notificationTime) {
        this.notificationTime = this.getDefaultTime();
      }
      this.scheduleNotification();
    } else {
      LocalStorage.set('notification', false);
      this.notificationsEnabled = false;
    }

    // // ✅ Move to next slide
    // this.$refs.carouselRef.next();
  } catch (error) {
    console.error('Error requesting notifications permission:', error);
    // fallback route
    this.$router.push('/upgrade');
  }
},


    async initializeNotificationChannels() {
      // Create notification channel for Android 8.0 and higher
      try {
        await LocalNotifications.createChannel({
          id: 'study-reminder',
          name: 'Study Reminder',
          description: 'Daily study reminder',
          importance: 4, // Importance level (4 is high)
        });
        console.log('Notification channel created');
      } catch (error) {
        console.error('Error creating notification channel', error);
      }
    },

    async sendTestNotification() {
      await this.initializeNotificationChannels(); // Ensure the channel is created
      try {
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Test Notification',
              body: 'This is a test notification',
              id: 2, // Use a different ID
              channelId: 'study-reminders', // Specify the channel ID
            },
          ],
        });
        console.log('Test notification sent');
      } catch (error) {
        console.error('Error sending test notification', error);
      }
    },

    async scheduleNotification() {
      try {
        // Parse the selected or default time
        const [selectedHours, selectedMinutes] = this.notificationTime.split(':').map(Number);

        // Get the current date and time
        const now = new Date();

        // Set the selected time
        const notificationDate = new Date();
        notificationDate.setHours(selectedHours, selectedMinutes, 0, 0);

        // If the selected time has already passed today, schedule for the next day
        if (notificationDate <= now) {
          notificationDate.setDate(notificationDate.getDate() + 1); // Move to the next day
        }


        // Schedule recurring daily notifications after the first one
        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'NursePrep Daily Practice',
              body: 'Answer your daily study questions.',
              id: 2, // Unique ID for recurring notification
              schedule: {
                allowWhileIdle: true,
                on: {
                  hour: selectedHours,
                  minute: selectedMinutes,
                }, // Recurs daily at the specified time
                repeats: true,
              },
              sound: 'alert',
              channelId: 'study-reminders', // Match with the notification channel ID
            },
          ],
        });

        // Save the notification settings in LocalStorage
        LocalStorage.set('notification', this.notificationsEnabled);
        LocalStorage.set('notificationTime', `${selectedHours}:${selectedMinutes}`);

        // // Notify the user
        // this.$q.notify({
        //   color: 'white',
        //   textColor: 'dark',
        //   icon: 'thumb_up',
        //   iconColor: 'purple',
        //   message: `Challenge accepted! We'll send your study reminder!`,
        //   timeout: 3000,
        //   position: 'top',
        // });
        this.goToNextSlide()

      } catch (error) {
        console.error('Error scheduling notification:', error);
        this.$q.notify({
          color: 'red',
          message: 'Failed to schedule notification. Please try again.',
          timeout: 3000,
          position: 'top',
        });
      }
    },


    async cancelNotification() {
      if (!this.notificationsEnabled) {
        // Notifications are disabled, so cancel pending notifications
        try {
          const pendingList = await LocalNotifications.getPending();

          console.log(pendingList)

          if (pendingList && pendingList.notifications && pendingList.notifications.length > 0) {
            console.log('Canceling pending notifications.');
            await LocalNotifications.cancel(pendingList);
            console.log('Pending notifications canceled successfully.');
            LocalStorage.set('notification', false);

            this.$q.notify({
              color: 'white',
              textColor: 'dark',
              message: 'Pending notifications canceled.',
              icon: 'thumb_up',
              iconColor: 'red',
              iconColor: 'indigo',
              timeout: 1500,
              position: "top"
            })


          } else {
            console.log('No pending notifications to cancel.');
            LocalStorage.set('notification', false);

            this.$q.notify({
              color: 'white',
              textColor: 'dark',
              message: 'No pending notifications',
              icon: 'thumb_up',
              iconColor: 'red',
              timeout: 1500,

            })

          }
        } catch (error) {
          console.error('Error canceling notifications:', error);
        }
      } else {
        console.log('Notifications are enabled. No action required.');
      }
    },


    getDefaultTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0'); // Ensure 2-digit format
      const minutes = now.getMinutes().toString().padStart(2, '0'); // Ensure 2-digit format
      return `${hours}:${minutes}`; // Return formatted time
    },



    goToNextSlide() {
      this.selectedChallenge = null
      const slides = ['welcome', 'survey1', 'survey2', 'dailyPlan', 'review', 'reminders', 'trial'];
      const currentIndex = slides.indexOf(this.slide);
      // Call requestReview when the current slide is 'notifications'



      if (currentIndex < slides.length - 1) {
        this.slide = slides[currentIndex + 1];
      }

    },
    async requestReview() {
      await RateApp.requestReview();
      this.goToNextSlide()
    },

    finishOnboarding() {
      // RateApp.requestReview();

      this.finishOnboardingBtn = true
      LocalStorage.set('hasSeenOnboarding', true);
      // Logic to finish onboarding and navigate to the main app
      this.$router.push('/'); // Adjust the route according to your app structure
    },


  },
mounted() {
  // 🔔 Notifications setup
  this.notificationsEnabled = LocalStorage.getItem('notification');
  if (!this.notificationsEnabled) {
    this.notificationsEnabled = false;
    LocalStorage.set('notification', false);
  }

  const notificationTimeSet = LocalStorage.getItem('notificationTimeSet');
  this.standard = LocalStorage.getItem('standardQuestions') || 10;

  this.timeFormatted = notificationTimeSet
    ? date.formatDate(notificationTimeSet, 'hh:mm a')
    : date.formatDate(new Date(), 'hh:mm a');

  // ✅ TikTok click_id tracking
App.getLaunchUrl().then((res) => {
  const url = res?.url;
  console.log('App launched with URL:', url);

  if (!url) return;

  try {
    const clickId = new URL(url).searchParams.get('click_id');
    if (clickId) {
      LocalStorage.set('tiktok_click_id', clickId);
      Purchases.setAttributes({
        tiktok_click_id: clickId
      });
    }
  } catch (err) {
    console.error('❌ Failed to parse TikTok click_id:', err);
  }
});

}


};
</script>

<style scoped>
.overlapping {
  border: 2px solid white;
  position: absolute
}

.bg-color {
  background-color: #f3f4f9;
  /* Adjust as needed */
  color: black;
}

.btn-color {
  background-color: #007bff;
  /* Adjust button color as needed */
  color: white;
}
</style>
