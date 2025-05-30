// store/permission.js
import { defineStore } from 'pinia'
import { constantRoutes } from '@/router'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [],
    addRoutes: [],
    currentRoutes: {}
  }),

  actions: {
    setRoutes(routes) {
      this.addRoutes = routes
      this.routes = constantRoutes.concat(routes)
    },

    setCurrentRoutes(routes) {
      this.currentRoutes = routes
    }
  }
})