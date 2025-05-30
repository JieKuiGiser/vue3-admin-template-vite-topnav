
import { useappStore } from "@/store/app";
const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
 data() {
    return {
      appStore: useappStore(),
    };
  },
  watch: {
    $route(route) {
      if (this.appStore.device === 'mobile' && this.appStore.sidebar.opened) {
        this.appStore.closeSideBar({ withoutAnimation: false })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.appStore.toggleDevice('mobile')
      this.appStore.closeSideBar({ withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        this.appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
        if (isMobile) {
          this.appStore.closeSideBar({ withoutAnimation: true })
        }
      }
    }
  }
}
