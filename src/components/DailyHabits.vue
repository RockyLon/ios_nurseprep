<template>
  <q-page class="q-pa-md ">
    <q-header class="bgGradient">
      <q-toolbar>

        <q-toolbar-title class="text-bold text-center">Reminders</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <div class="q-pa-md row justify-center">
      <!-- <q-btn v-model="notificationsEnabled" @click="toggleNotifications">1 minute notification</q-btn>

      <q-btn @click="sendTestNotification">Send Test Notification</q-btn> -->
      <div class="col-12 q-mb-lg justify-center">
        <div class="col column items-center">
          <img style="width: 200px; height: 200px; border-radius: 1rem;" src="/onboarding1.svg" alt="">

          <div class="text-h6 text-center">Create Study Habits</div>
          <div class="text-caption ">Little by little, a little becomes a lot.</div>
        </div>

      </div>

      <q-list class="row justify-center q-my-lg">

        <q-item tag="label" v-ripple class="q-mt-sm">
          <q-item-section>
            <q-item-label >Set daily reminder time</q-item-label>
            <!-- <q-item-label caption>Don't forget to select AM or PM.</q-item-label> -->
          </q-item-section>

          <q-item-section avatar>
            <q-toggle  color="blue" v-model="notificationsEnabled" val="Notification" @click="toggleNotifications" />
          </q-item-section>
        </q-item>

        <div v-if="notificationsEnabled" class="text-h6 text-bold">
          <span class="text-blue q-pa-md text-white" style="border-radius: 8px;">{{ timeFormatted }}</span>
          <q-btn  label="Set Time" no-caps color="blue">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-time v-model="timeFormatted" color="blue">
                <div class="row items-center justify-end">
                  <q-btn no-caps @click="scheduleNotification" v-close-popup label="Remind Me" color="blue" flat />
                </div>
              </q-time>
            </q-popup-proxy>
          </q-btn>
        </div>


        <!-- <q-item v-if="notificationsEnabled">
          <q-input filled v-model="timeFormatted" :rules="['timeFormatted']">
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-time v-model="timeFormatted" color="teal">
                    <div class="row items-center justify-end">
                      <q-btn no-caps @click="scheduleNotification" v-close-popup label="Remind Me" color="indigo"
                        flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
</q-input>
</q-item> -->
        <!-- <div class="row justify-end" v-if="notificationsEnabled">
          <q-btn flat color="deep-purple" v-model="notificationsEnabled" @click="scheduleNotification">remind me</q-btn>
        </div> -->
      </q-list>
      <div>
      </div>


      <div class=" q-px-md q-mt-sm">

        <q-item-section>
          <q-item-label class="text-body1">Your daily question goal</q-item-label>
          <q-item-label caption class="text-grey-6">How many questions will you crush?</q-item-label>
        </q-item-section>

        <q-badge color="blue">
          Total: {{ standard }}
        </q-badge>

        <q-slider color="blue" v-model="standard" :min="0" :max="50" />
        <div class="row justify-end">
          <q-btn flat color="blue" v-model="standard" @click="saveStandard">Set</q-btn>
        </div>

      </div>

    </div>

    <q-page-sticky position="bottom-left" :offset="[20, 20]">
      <q-btn class="q-pa-sm bgGradient text-white" icon="close" rounded size="sm"  :to="`/quizstats/${urlParam}`" />
    </q-page-sticky>


  </q-page>
</template>

<script>
import { LocalNotifications } from '@capacitor/local-notifications';
import { ref } from 'vue'
import { date, LocalStorage, Dialog } from 'quasar'

export default {
  name: 'DailyHabits',
  data() {
    return {
      urlParam: this.$route.params.examName,
      standard: 10,
      notificationsEnabled: false,
      // time: ref(new Date()),
      // time: date.formatDate(new Date(), 'hh:mm A'),
      timeFormatted: null,


    };
  },

  methods: {
    saveStandard() {
      // Save the user-selected number of questions to localStorage
      LocalStorage.set('standardQuestions', this.standard);

      this.$q.notify({
        color: 'white',
        textColor: 'dark',
        iconColor: 'deep-purple',
        message: `Got it! We'll remind you when you've completed your daily goal of ${this.standard} questions.`,
        icon: 'thumb_up',
        iconColor: 'purple',
        timeout: 3000,
        position: "top"
      });


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
      await this.initializeNotificationChannels()
      // Request permission for notifications
      try {
        const permissionStatus = await LocalNotifications.requestPermissions();
        console.log('Permission status:', permissionStatus);
        if (permissionStatus.display == 'denied') {
          this.notificationDenied = 'Must enable notification'
          Dialog.create({
            title: 'Notifications Disabled',
            message: `You've previously turned off notifications for the app. To re-enable them, please:
             1. Go to your phone's Settings. 2. Tap on 'Apps' or 'Apps & Notifications'. 3. Find this app and enable notifications.`,
            cancel: true,
            persistent: true
          })
        }

        if (permissionStatus.display === 'granted') {
          console.log('Permission granted. Notifications enabled.');
          LocalStorage.set('notification', true);
          this.notificationsEnabled = true

        } else {
          console.warn('Notifications permission not granted.');
          LocalStorage.set('notification', false);
          this.notificationsEnabled = false

        }
      } catch (error) {
        console.error('Error requesting notifications permission:', error);
      }
    },

    async initializeNotificationChannels() {
      // Create notification channel for Android 8.0 and higher
      try {
        await LocalNotifications.createChannel({
          id: 'study-reminders',
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
      // Parse the selected time from timeFormatted
      const selectedTimeParts = this.timeFormatted.split(':');
      const selectedHours = parseInt(selectedTimeParts[0]);
      const selectedMinutes = parseInt(selectedTimeParts[1]);

      // Get the current date
      const currentDate = new Date();

      // Set the time to the selected time
      currentDate.setHours(selectedHours, selectedMinutes, 0, 0);



      // Get the time string in 12-hour format with AM/PM indicator
      const time12h = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });


      console.log(time12h); // Output: "12:25 AM"

      this.timeFormatted = time12h






      // Schedule the notification
      await LocalNotifications.schedule({
        notifications: [
          {

            title: 'NursePrep Daily Practice',
            body: `Answer your daily study questions.`,
            id: 1,
            schedule: {
              allowWhileIdle: true,

              on: {
                hour: selectedHours,
                minute: selectedMinutes,
              },


            },
            sound: 'alert',
            attachments: null,
            actionTypeId: '',
            extra: null,
            channelId: 'study-reminders',

          }
        ]
      }).then(() => {
        LocalStorage.set('notification', this.notificationsEnabled);
        LocalStorage.set('notificationTimeSet', currentDate);
        this.$q.notify({
          color: 'white',
          textColor: 'dark',
          iconColor: 'deep-purple',
          message: `Challenge accepted! We'll send your study reminder!`,
          icon: 'thumb_up',
          iconColor: 'purple',
          timeout: 3000,
          position: "top"
        });
      })

      // const notifications = [
      //   {
      //     title: 'Title',
      //     body: 'Message',
      //     smallIcon: 'res://calendar',
      //     id: 1,
      //     schedule: {
      //       every: 'day',
      //       on: { hour: selectedHours, minute: selectedMinutes },
      //       repeats: true
      //     },
      //     actionTypeId: 'ActionId',
      //   }
      // ]

      // await LocalNotifications.schedule({ notifications })


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
    }


  },
  mounted() {
    // Call initializeNotificationChannels when the component is mounted
    // Retrieve toggle state from localStorage
    this.notificationsEnabled = LocalStorage.getItem('notification');

    if (!this.notificationsEnabled) {
      this.notificationsEnabled = false
      LocalStorage.getItem('notification', false);
    }


    const notificationTimeSet = LocalStorage.getItem('notificationTimeSet');
    this.standard = LocalStorage.getItem('standardQuestions');

    if (this.standard == null) {
      this.standard = 10
    }

    if (notificationTimeSet) {
      // Set the timeFormatted property to the time retrieved from localStorage
      this.timeFormatted = date.formatDate(notificationTimeSet, 'hh:mm a');;
    } else {
      // If no time is set in localStorage, use the current time
      this.timeFormatted = date.formatDate(new Date(), 'hh:mm a');
    }
    // Set toggle state based on localStorage value (or default to true if value is not found)
    // this.notificationsEnabled = notificationSetting ? JSON.parse(notificationSetting) : true;
  },
};
</script>

<style scoped>
.bgGradient {
  /* background: linear-gradient(135deg, #8a2be2 20%, #075CCD 100%); */
  background: #5372ff;

}
</style>
