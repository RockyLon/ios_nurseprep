
const routes = [
  {
    path: '/',
    redirect: '/fundamentals' // Redirect to a default exam route
  },
  {
    path: '/:examName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name:'exam',
        path: '',
        component: () => import('pages/IndexPage.vue')
      }
    ]
  },
  {
    path: '/apps',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name:'apps',
        path: '',
        component: () => import('components/MoreApps.vue')
      }
    ]
  },
  {
    path: '/onboarding',

    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Onboarding.vue') }
    ]
  },
  // {
  //   path: '/index/:examName',

  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '',     name: 'exam', component: () => import('components/index.vue') }
  //   ]
  // },
  {
    path: '/quizstats/:examName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/QuizStats.vue') }
    ]
  },
  {
    path: '/sources',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Sources.vue') }
    ]
  },
  {
    path: '/incorrect-answers/:examName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/IncorrectAnswers.vue') }
    ]
  },
  {
    path: '/bookmarked/:examName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/Bookmarked.vue') }
    ]
  },
  {
    path: '/daily-habits/:examName',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('components/DailyHabits.vue') }
    ]
  },
  {
    path: '/upgrade',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',name:'upgrade', component: () => import('components/Upgrade.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }


]



export default routes
