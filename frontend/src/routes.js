export const routes = [
  {
    label: 'login',
    path: '/login',
    component: 'login'
  },
  {
    label: 'App',
		path: '/',
		private: true,
		component: 'apps',
		routes: [
      {
        label: 'home',
        exact: true,
        path: '/home',
        component: 'home',
      },
      {
        label: 'profile',
        path: '/profile',
        exact: true,
        component: 'profile'
      },
      {
        label: 'message',
        path: '/message',
        exact: true,
        component: 'message'
      },
      {
        label: 'notification',
        path: '/notification',
        exact: true,
        component: 'notification'
      },
      {
        label: 'setting',
        path: '/setting',
        exact: true,
        component: 'setting'
      },
      {
        label: 'register',
        path: '/register',
        exact: true,
        component: 'register'
      },
      {
        label: 'friend',
        path: '/friend',
        exact: true,
        component: 'friend'
      },
    ]
  }
]