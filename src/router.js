import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  mode: "history",
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/Register.vue')
        },
        {
          path: '/verify-email',
          name: 'verify-email',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/VerifyEmail.vue')
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/ForgotPassword.vue')
        },
        {
          path: '/email-verification/:verification_token',
          name: 'email-verification',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/EmailVerification.vue'),
        },
        {
          path: '/email-verification',
          redirect: 'verify-email'
        },
        {
          path: '/reset-password/:token',
          name: 'reset-password',
          component: () => import(/* webpackChunkName: "demo" */ './views/Auth/ResetPassword.vue'),
        },
        {
          path: '/reset-password',
          redirect: 'forgot-password'
        }
      ]
    },
    {
      path: '/',
      redirect: 'account/dashboard',
      component: DashboardLayout,
      children: [
        {
          path: 'account/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Dashboard.vue'),
          meta: {
            hideFooter: true
          }
        },
        {
          path: 'account/projects',
          name: 'projects',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Projects.vue'),
          meta: {
            hideFooter: true
          }
        },
        {
          path: 'account/project/:id',
          name: 'project',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Project.vue'),
          meta: {
            hideFooter: true
          }
        },
        {
          path: 'account/tasks',
          name: 'tasks',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Tasks.vue'),
          meta: {
            hideFooter: true
          }
        },
        {
          path: 'account/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Profile.vue'),
          meta: {
            hideFooter: true
          }
          
        },
        {
          path: 'account/calendar',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Calendar.vue'),
          meta: {
            hideFooter: true
          }
          
        },
        {
          path: 'account/team',
          name: 'team',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Team.vue'),
          meta: {
            hideFooter: true
          }
          
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/App/Tables.vue')
        },
        {
          path: 'account',
          redirect: 'account/dashboard'
        }
      ],
      

    },

  ]
})
