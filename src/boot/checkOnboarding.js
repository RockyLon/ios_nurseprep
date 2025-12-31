import { LocalStorage } from 'quasar';

export default ({ router }) => {
  router.beforeEach((to, from, next) => {

    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (prefersDarkMode) {
      localStorage.setItem('darkMode', true)
    } else {
      localStorage.setItem('darkMode', false)
    }
    // Check if the user has seen the onboarding screen
    const hasSeenOnboarding = LocalStorage.getItem('hasSeenOnboarding');


    // If not, redirect to onboarding page, but avoid redirecting if they are already on the onboarding page
    if (!hasSeenOnboarding && to.path !== '/onboarding') {
      next('/onboarding');
    } else {
      next();
    }
  });
};
