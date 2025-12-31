<template>

  <q-page>
    <q-header class="bgGradient">
      <q-toolbar>
        <q-btn to="/quizstats" icon="chevron_left" flat></q-btn>
        <!-- <q-btn to="/" flat icon="chevron_left"></q-btn> -->
        <q-toolbar-title class="text-bold text-center"> Sources</q-toolbar-title>


        <!-- <q-btn to="/upgrade" flat label="Unlimited" no-caps stack size="sm" icon="rocket_launch"></q-btn> -->

      </q-toolbar>
    </q-header>
    <div class="q-ma-md">
      <p class="text-h6">Welcome to our quiz app!</p>
      <p>{{ disclaimer }}</p>

      <div class="text-h6">Recommended Textbooks</div>
      <ul>
        <li><a href="https://www.us.elsevierhealth.com/lewiss-medical-surgical-nursingassessment-and-management-of-clinical-problems-9780729544801.html" target="_blank">Lewis’s Medical-Surgical Nursing</a></li>
        <li><a href="https://www.us.elsevierhealth.com/linton-and-mattesons-medical-surgical-practical-nursing-in-canada-9780323872638.html" target="_blank">Linton and Matteson's Medical-Surgical Practical Nursing</a></li>
        <!-- Add more textbook links as needed -->
      </ul>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'QuizComponent',
  data() {
    return {
      disclaimer: 'Welcome to our Medical Surgical Nursing Quiz! Our quiz questions are carefully curated from reputable nursing textbooks commonly used in nursing education. We believe in providing our users with high-quality educational content to aid in their preparation for nursing exams. To further enhance your learning experience, we have provided links to the recommended textbooks below. Please note that the questions in this quiz are for educational purposes only and do not substitute professional medical advice. Happy studying!'
    }
  }
}
</script>
