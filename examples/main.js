import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueRtmpPlayer from '@/index'

Vue.config.productionTip = false

Vue.use(vueRtmpPlayer)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
