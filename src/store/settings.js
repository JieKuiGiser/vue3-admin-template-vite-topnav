// store/settings.js
import { defineStore } from 'pinia'
import defaultSettings from '@/settings.js'

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        fixedHeader: defaultSettings.fixedHeader,
        sidebarLogo: defaultSettings.sidebarLogo
    }),

    actions: {

    }
})