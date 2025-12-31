<template>
  <q-page>
    <q-header>
      <q-toolbar>
        <q-btn to="/" flat icon="chevron_left"></q-btn>
        <q-toolbar-title class="text-body1 text-body1 text-center q-mr-xl">Your Ultimate Hub for
          Learning</q-toolbar-title>
      </q-toolbar>
    </q-header>


    <div class="q-pa-md q-pb-xl">
      <!-- Full App Promo Section -->
      <div class="q-gutter-md">



        <q-card v-for="app in apps" :key="app.id" flat style="border-radius: 15px;">
          <q-card-section class=" q-pa-none">
            <q-item>
              <q-item-section avatar>

                <img style="max-width: 50px; border-radius: 10px;" :src="app.icon" />

              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">{{ app.name }}</q-item-label>
                <q-item-label caption>{{ app.description }}</q-item-label>
                <q-item-label>
                  <q-rating v-model="app.rating" :max="5" size="12px" color="grey" />
                </q-item-label>
              </q-item-section>

              <q-item-section avatar>
                <q-btn style="width: 50px;" size="sm" rounded color="grey-9" no-caps label="Install"
                  @click="openLink(app.link)"></q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>


      </div>
    </div>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      apps: [
             {
          id: 4,
          name: "Hesi A2 Complete Guide",
          description: "6000+ Questions and Rationales",
          icon: "/hesi-a2-complete.png",
          rating: 5,
          link: "https://apps.apple.com/us/app/a2-nursing-practice-exam-prep/id6499077798"
        },

        {
          id: 2,
          name: "NCLEX RN",
          description: "1000+ Questions and Rationales",
          icon: "/nclex-rn.png",
          rating: 5,
          link: "https://apps.apple.com/us/app/nclex-rn-test-prep-guide/id6736991589"
        },
        {
          id: 1,
          name: "NCLEX PN",
          description: " 2,856 Questions and Rationales",
          icon: "/nclex-pn.png",
          rating: 5,
          link: "https://apps.apple.com/us/app/nclex-pn-mastery/id6737436836" // Replace with actual App Store link
        },

        {
          id: 5,
          name: "Hesi A2 Fundamentals Prep",
          description: "4500 Questions and Rationales",
          icon: "/hesi-fundamentals.png",
          rating: 5,
          link: "https://apps.apple.com/us/app/a2-fundamentals-prep/id6497062005"
        },
        {
          id: 6,
          name: "Hesi A2 Medical Surgical Nursing Mocks",
          description: "4500 Questions and Rationales",
          icon: "/hesi-medsurg-mock.png",
          rating: 5,
          link: "https://apps.apple.com/us/app/medical-surgical-nursing-mocks/id6502844602"
        },
        // {
        //   id: 7,
        //   name: "Med-Surg Practice Exam",
        //   description: "2900+ Questions and Rationales",
        //   icon: "/med-surg.png",
        //   rating: 5,
        //   link: "https://apps.apple.com/us/app/med-surg-practice-exam/id6482980039"
        // },
        // {
        //   id: 3,
        //   name: "Food Calorie Tracker",
        //   description: "Ultimate Food Calorie Tracker by BlixFox",
        //   icon: "/calorie-calculator.png",
        //   rating: 5,
        //   link: "https://apps.apple.com/us/app/calorie-calculator-plus/id6504049952"
        // },
        // {
        //   id: 8,
        //   name: "Nursing Exams Hub - NursePrep",
        //   description: "30,000+ Test Banks Questions and Rationales",
        //   icon: "/nursehub.png",
        //   rating: 5,
        //   link: "https://apps.apple.com/us/app/nursing-exams-hub-nurseprep/id6499525397?platform=iphone"
        // },
      ]
    };
  },
  methods: {
    openLink(url) {
      window.open(url, "_blank");
    }
  }
};
</script>


<style scoped></style>
