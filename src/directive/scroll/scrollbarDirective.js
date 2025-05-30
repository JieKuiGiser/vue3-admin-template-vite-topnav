import usePerfectScrollbar from './usePerfectScrollbar'

export default {
    install(app) {
        const { install, uninstall } = usePerfectScrollbar()
        app.directive('scrollbar', {
            mounted(el) {
                install(el)
            },
            beforeUnmount() {
                uninstall()
            }
        })
    }
}