import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Account from '../views/Account.vue'
import Dashboard from '../views/Dashboard.vue'
import Swap from '../views/Swap.vue'

import middlewarePipeline from './middlewarePipeline'
import auth from '@/middleware/auth'
import subscribed from '@/middleware/subscribed'
import guest from '@/middleware/guest'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      middleware: [guest]
    }
  },
  {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      middleware: [auth]
    }
  },
  {
    path: '/swap',
    name: 'swap',
    component: Swap,
    meta: {
      middleware: [auth, subscribed]
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }

  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    store,
    next
  }

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  })
})

export default router
