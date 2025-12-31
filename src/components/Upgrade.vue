<template>


  <q-page class="q-pa-none">

    <!-- Background image -->
    <q-img src="/upgrade2.png" fit="cover" style="position: absolute; width: 100%; height: 100%; z-index: 0;" />
    <div
      style="position: absolute; bottom: 0; width: 100%; height: 150%; background: linear-gradient(to top, rgba(0,0,0,0.9), transparent); z-index: 1;">
    </div>
    <!-- Optional overlay -->
    <!-- <div
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); z-index: 1;">
    </div> -->

    <!-- Bottom upgrade section -->

    <div class="row  q-px-sm"
      style="position: fixed; bottom: 0; width: 100%; z-index: 2; border-top-left-radius: 20px; border-top-right-radius: 20px;">
      <div class="text-h4 text-white  text-bold q-ml-md">Ready to Take Control of Nursing School?</div>
      <div class="text-white  q-mx-md ">From First Semester to Final Exam. Crush every exam with confidence. 30,000+ questions, smarter practice tools, and
        a study plan that works for you.
      </div>

      <div class="row justify-around  q-my-md">



        <!-- <div class="col-5">
          <q-card flat bordered style="border-radius: 15px;"
            :class="prickleballProOffers === 'monthly' ? 'bg-primary text-white' : 'bg-white text-black'"
            @click="selectAndPurchase('monthly')">
            <q-card-section>
              <div class="row justify-between">
                <div class="text-bold">Monthly </div>
                <q-badge rounded color="black">
                  {{ monthlyOffer?.monthly?.product?.priceString }}
                </q-badge>
              </div>
              <div class="text-caption q-mt-sm">- Affordable plan</div>
              <div class="text-caption">- Cancel anytime</div>
              <div class="text-caption">- Short-term study</div>
            </q-card-section>
          </q-card>
        </div> -->



        <!-- <div class="col-5">
          <q-card :class="prickleballProOffers === 'lifetime' ? 'bg-primary text-white' : 'bg-white text-black'" flat
            bordered style="border-radius: 15px; border: 2px solid white;" @click="selectAndPurchase('lifetime')">
            <q-card-section>

              <div class="row justify-between">
                <div class="text-bold">Lifetime </div>
                <q-badge rounded color="blue-10">
                  {{ lifetimeOffer?.lifetime?.product?.priceString }}
                </q-badge>
              </div>
              <div class="text-caption q-mt-sm"> - One-Time Unlock</div>
              <div class="text-caption">- No renewals ever</div>
              <div class="text-caption">- Lifetime updates</div>
            </q-card-section>
          </q-card>

        </div> -->
<!--
        <div class="col-5">
          <q-card flat bordered style="border-radius: 15px;  border: 2px solid white;"
            :class="prickleballProOffers === 'year' ? 'bg-primary text-white' : 'bg-white text-black'"
            @click="selectAndPurchase('year')">
            <q-card-section>
              <q-badge rounded color="orange-10" floating>Top Pick</q-badge>

              <div class="row justify-between">
                <div class="text-bold">Yearly </div>
                <q-badge rounded color="blue-10">
                  {{ yearOffer?.annual?.product?.priceString }}
                </q-badge>
              </div>
              <div class="text-caption q-mt-sm">- No Payment Now</div>
              <div class="text-caption">- Cancel anytime</div>
              <div class="text-caption">- Limit updates</div>
            </q-card-section>
          </q-card>
        </div> -->



        <!-- <q-list dark class="full-width">


          <q-item dense>
            <q-item-section avatar>
              <q-icon color="teal" name="task_alt" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Unlock All 30,000+ Questions</q-item-label>
              <q-item-label caption>Get full access to every subject, every course.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item dense class="q-my-md">
            <q-item-section avatar>
              <q-icon color="teal" name="task_alt" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Redo Missed Questions Anytime</q-item-label>
              <q-item-label caption>Master your weak spots with focused practice.</q-item-label>

            </q-item-section>
          </q-item>

          <q-item dense>
            <q-item-section avatar>
              <q-icon color="teal" name="task_alt" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Study Your Bookmarked Questions</q-item-label>
              <q-item-label caption>Save key questions and review them on your terms.</q-item-label>

            </q-item-section>
          </q-item>

        </q-list> -->




<div class=" text-white text-center">
  <div class="text-overline text-weight-light text-center text-white text-italic">Study for all your exams.</div>
<div class="text-bold text-h6"> Lifetime Access - {{ lifetimeOffer?.lifetime?.product?.priceString}}</div>

</div>
        <q-btn @click="initiatePurchase()" no-caps  label="Unlock 30,000+ Questions - Yours forever."
          class="full-width q-mt-sm q-pa-md q-my-md q-mt-lg bg-primary text-white" style="max-width: 300px;">
        <q-badge color="orange-10" floating>
Save 30% Today -
  <span class="text-strike">
    {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(lifetimeOffer?.lifetime?.product?.price / 0.7) }}
  </span>
</q-badge>

        </q-btn>


        <!-- Buttons or pricing cards can go here -->
        <!-- <q-btn no-caps color="primary" @click="initiatePurchase()" rounded style="border: 2px solid white;"
          :label="prickleballProOffers === 'year' ? '$0 Today – 30,000+ Questions Free' : ' Pay once, own it for life.'"
          class="full-width q-mb-xs q-mt-lg q-pa-md" /> -->


        <div class="col-12 text-center items-center">
          <!-- <div class="text-caption text-grey-5">Not satisfied? Get your money back—no questions asked.</div> -->
          <div class="text-grey-6 text-caption">🎓 Trusted by thousands of nursing students.</div>
          <q-rating v-model="dummyRating" size="1.5em" :max="5" color="yellow" />
        </div>


        <div class="text-caption  text-grey-7 text-center q-my-md">
          <a style="text-decoration: none;" class="text-grey " href=" https://sites.google.com/view/snapdiet/home"
            target="_blank">Privacy Policy</a>
          <a style="text-decoration: none;" class="text-grey q-ma-md"
            href="https://sites.google.com/view/snapdiet/terms-of-services?authuser=0" target="_blank">Terms of
            Use</a>
        </div>

      </div>


    </div>




    <q-page-sticky position="top-right" :offset="[20, 55]" style=" z-index: 2">
      <q-btn v-if="!premium" size="xs" flat icon="credit_card" @click="restorePurchase" no-caps label="Restore"
        color="white" stack></q-btn>
    </q-page-sticky>

    <q-page-sticky position="top-left" :offset="[20, 55]" style="z-index: 2">
      <q-btn no-caps stack  size="sm" icon="close" round flat color="white"
        :to="{ name: 'exam', params: { examName: 'fundamentals' } }" />
    </q-page-sticky>


  </q-page>


</template>

<script>
import { LocalStorage, Notify, Loading } from 'quasar'
// import { Glassfy } from 'capacitor-plugin-glassfy';
import { LocalNotifications } from '@capacitor/local-notifications';

import { Purchases } from "@revenuecat/purchases-capacitor";


import { useRouter } from 'vue-router';


export default {
  data() {
    return {
       dummyRating: 5 ,

      yearOffer: null,
      lifetimeOffer: null,
      monthlyOffer: null,
      darkModeToggle: false,
      prickleballProOffers: 'lifetime',
      revenueCatApiKey: process.env.VUE_APP_GLASSFY_API_KEY,
      offerings: [],
      premium: false,
      skuDetails: null,
      loadingBtn: false,
      hasInitializedKey: 'glassfyInitialized',
      sku: null,
      urlParam: this.$route.params.examName,
      reviews: [
        { content: "Great app! Very useful for exam preparation.", author: "Emily S.", stars: 5 },
        // { content: "Superb tool! Boosted my confidence and grades significantly.", author: "Sophia M.", stars: 4 },
        // { content: "Best study companion ever! Worth every penny.", author: "Jacob T.", stars: 4 },
        // { content: "Highly recommended! Streamlined my exam preparation.", author: "Ava B.", stars: 4 },
        // { content: "Impressive! Made studying less daunting and more productive.", author: "Noah G.", stars: 4 },
        // { content: "Fantastic app! Simplified my study routine immensely.", author: "Olivia R.", stars: 5 },
        // { content: "Incredible tool! Helped me grasp difficult concepts effortlessly.", author: "Daniel H.", stars: 5 },
        // { content: "Life-changing! I wish I found this app sooner.", author: "Isabella C.", stars: 5 },
        // { content: "Essential for exams! Improved my scores dramatically.", author: "James L.", stars: 5 },
        // { content: "Excellent resource! Comprehensive and user-friendly.", author: "Ethan K.", stars: 5 },
        // { content: "Highly effective! Enhanced my learning experience.", author: "Sophie B.", stars: 4 },
        // { content: "Great app! Very useful for exam preparation.", author: "Liam M.", stars: 4 },
        // { content: "Top-notch! Helped me stay organized and focused.", author: "Emma W.", stars: 4 },
        // { content: "Brilliant tool! Simplified my study sessions.", author: "Lucas D.", stars: 4 },
        // { content: "Awesome app! Improved my study efficiency.", author: "Mia J.", stars: 5 }
      ]
    }
  },
  methods: {

    selectAndPurchase(plan) {
      // console.log('plan', plan)
      this.prickleballProOffers = plan;
      // this.initiatePurchase(plan); // pass the plan to determine packageId
    },

    async initializeRevenueCat() {

      const isDebugMode = false; // Your potential debug control
      const premium = LocalStorage.getItem('premium') === true;

      if (!premium) {
        Loading.show({
          message: `Loading unlimited offer`
        });

        try {
          await Purchases.configure({
            apiKey: this.revenueCatApiKey, // Your RevenueCat API key
            appUserID: null, // Optional
          });

          const offerings = await Purchases.getOfferings();

          // console.log('RevenueCat Offerings:', offerings);

          const offeringsJSON = JSON.stringify(offerings.all);
          localStorage.setItem('offerings', offeringsJSON);
          LocalStorage.set('premium', false);
          LocalStorage.set(this.hasInitializedKey, true);
          Loading.hide();
        } catch (e) {
          console.error('RevenueCat initialization error:', e);
          Loading.hide();
          // Handle other potential RevenueCat initialization issues
        }
      }
    },

    async restorePurchase() {
      try {
        Loading.show({ message: 'Verifying Purchase...' });

        const purchaserInfo = await Purchases.restorePurchases();
        // console.log('purchaserInfo', purchaserInfo);

        // Access the customerInfo object and then check purchased products
        if (purchaserInfo.customerInfo && purchaserInfo.customerInfo.allPurchasedProductIdentifiers) {
          if (purchaserInfo.customerInfo.allPurchasedProductIdentifiers.length > 0) {
            LocalStorage.set('premium', true);
            LocalStorage.set(`${purchaserInfo.customerInfo.originalAppUserId}_details`, purchaserInfo.customerInfo);
            this.premium = true;

            this.$q.notify({
              color: 'white',
              textColor: 'dark',
              message: 'Purchase found! You have unlimited access.',
              icon: 'check',
              iconColor: 'indigo',
              timeout: 2000,
            });
            this.$router.push({ path: '/' });


          } else {
            this.$q.notify({
              color: 'white',
              textColor: 'dark',
              message: 'No previous purchase found. Please Upgrade.',
              timeout: 2000,
              icon: 'dangerous',
              iconColor: 'red',
            });
          }
        } else {
          // console.error('Unexpected customerInfo structure:', purchaserInfo);
          this.$q.notify({
            color: 'negative',
            message: 'Purchase restoration failed due to unexpected response.',
          });
        }
      } catch (error) {
        console.error('Restore Purchase Error:', error);
        this.$q.notify({
          color: 'negative',
          message: 'Purchase restoration failed.',
        });
      } finally {
        Loading.hide();
      }
    },

    async initiatePurchase() {
      Loading.show()

      this.loadingBtn = true; // Optional: set loading state for the button

      try {
        const offerings = await Purchases.getOfferings();
        // console.log('Offerings:', this.prickleballProOffers);

        let packageToPurchase = null;

        if (this.prickleballProOffers === 'lifetime') {
          // await Purchases.restorePurchases();

          const lifetime = offerings.all?.Unlimited?.availablePackages || [];
          packageToPurchase = lifetime.find(pkg => pkg.identifier === '$rc_lifetime');
        } else if (this.prickleballProOffers === 'year') {
          const yearly = offerings.all?.ios_year_nurseprep_sub?.availablePackages || [];
          packageToPurchase = yearly.find(pkg => pkg.identifier === '$rc_annual');
        } else if (offerings.all?.['NursePrep']) {
          const monthly = offerings.all['NursePrep'].availablePackages || [];
          packageToPurchase = monthly.find(pkg => pkg.identifier === '$rc_monthly');
        }

        if (packageToPurchase) {

            const storedClickId = LocalStorage.getItem('tiktok_click_id');
  if (storedClickId) {
    await Purchases.setAttributes({
      tiktok_click_id: storedClickId
    });
  }


          // console.log('Package to purchase:', packageToPurchase); // Log the package to ensure it is correct

          // Proceed with the purchase
          const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToPurchase });

          if (purchaseResult) {
            LocalStorage.set('premium', true);
            LocalStorage.set('subscriber', purchaseResult.customerInfo);

            // 🎯 Only trigger this for yearly plans (with free trial)
            if (this.prickleballProOffers === 'year') {
              await this.scheduleTrialReminder();
            }

            this.$q.notify({
              color: 'white',
              textColor: 'dark',
              message: 'Congratulations! Unlimited Practice Unlocked.',
              icon: 'check',
              iconColor: 'teal',
              timeout: 4000,
              position: "top"
            });


            this.$router.push({ path: '/' });
          }
        } else {
          console.error('Package not found');
        }
      } catch (e) {
        console.error('Purchase error:', e);
        Loading.hide()

      } finally {
        this.loadingBtn = false; // Optional: reset loading state
        Loading.hide()


      }
    },


    async scheduleTrialReminder() {
      try {
        const now = new Date();
        const reminderDate = new Date(now);
        reminderDate.setDate(now.getDate() + 6); // 6 days from now

        await LocalNotifications.schedule({
          notifications: [
            {
              title: 'Your trial is ending soon ',
              body: 'Keep pushing toward your goals. Stay focused, you’ve got this.',
              id: 99, // Unique ID
              schedule: {
                at: reminderDate,
                allowWhileIdle: true,
              },
              sound: 'alert',
              channelId: 'study-reminders',
            },
          ],
        });

        console.log('Trial reminder scheduled for', reminderDate.toLocaleString());
      } catch (err) {
        console.error('Failed to schedule trial reminder', err);
      }
    },

    // async initiatePurchase(packageId) {
    //   console.log(this.prickleballProOffers)
    //   this.loadingBtn = true;

    //   try {
    //     const offerings = await Purchases.getOfferings();

    //     const packageToPurchase = offerings.current.availablePackages.find(pkg => pkg.identifier === packageId);

    //     if (packageToPurchase) {
    //       // Pass the retrieved package to the purchase method
    //       const purchaseResult = await Purchases.purchasePackage({ aPackage: packageToPurchase });


    //       if (purchaseResult) {
    //         LocalStorage.set('premium', true);
    //         LocalStorage.set('subscriber', purchaseResult.customerInfo);

    //         this.$q.notify({
    //           color: 'white',
    //           textColor: 'dark',
    //           message: 'Congratulations! Unlimited Practice Unlocked.',
    //           icon: 'check',
    //           iconColor: 'teal',
    //           timeout: 4000,
    //           position: "top"
    //         });


    //         this.$router.push({ path: '/' });
    //       }
    //     } else {
    //       console.error('Package not found');
    //     }
    //   } catch (e) {
    //     console.error('Purchase error:', e);
    //   } finally {
    //     this.loadingBtn = false;
    //   }
    // },

    upgrade() {

      const offeringsJSON = localStorage.getItem('offerings');

      if (offeringsJSON) {
        const offerings = JSON.parse(offeringsJSON);


        // Access the specific offering using its identifier
        const selectedOffering = offerings;

        if (selectedOffering) {
          this.offerings = selectedOffering; // Set the selected offering
          // console.log('Selected Offering:', selectedOffering);
          this.yearOffer = selectedOffering.ios_year_nurseprep_sub
          this.lifetimeOffer = selectedOffering.Unlimited
          this.monthlyOffer = selectedOffering.NursePrep;

        } else {
          console.error('Selected offering not found');
        }
      } else {
        console.error('Offerings not found in localStorage');
      }


    }

    // upgrade() {
    //   const offeringsJSON = localStorage.getItem('offerings');

    //   if (offeringsJSON) {
    //     const offerings = JSON.parse(offeringsJSON);

    //     console.log('offerings', offerings)

    //     // Access the specific offering using its identifier
    //     const selectedOffering = offerings['Unlimited'];

    //     if (selectedOffering) {
    //       this.offerings = selectedOffering; // Set the selected offering
    //       console.log('Selected Offering:', selectedOffering);
    //     } else {
    //       console.error('Selected offering not found');
    //     }
    //   } else {
    //     console.error('Offerings not found in localStorage');
    //   }
    // }

  },

  mounted() {
    this.darkModeToggle = localStorage.getItem('darkMode'),
      this.premium = LocalStorage.getItem('premium');

    if (!this.premium) {
      this.initializeRevenueCat()
        .then(() => {
          // Initialization successful, now call upgrade
          this.upgrade();
        })
        .catch(error => {
          // Handle initialization error
          console.error('Initialization error:', error);
          // Optionally, provide user feedback or take appropriate action
        });
    } else {
      // If the user is already premium, set premium to true
      this.premium = true;
    }
  }

}
</script>

<style>
.bgGradient {
  background: linear-gradient(135deg, #8a2be2 20%, #4b0082 100%);
}

.btn-color {
  background-color: #007bff;
  /* Adjust button color as needed */
  color: white;
}

.my-card {
  width: 140px;
  background-color: #fefdfd;
  border: 2px, solid, #5170ff;
  border-radius: 12px;

}
</style>
