import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/css/index.css'
import '@/assets/css/variable.less'
import '@/assets/css/mixin.less'
import '@/assets/css/icon.less'
// import 'normalize.css'
import router from './router'
import pinia from './store'
import lazyPlugin from 'vue3-lazy'
import lazyUrl from './assets/imgs/default.png'
import loadingDirective from './directives/loading'


createApp(App).use(lazyPlugin, {
    loading: lazyUrl
}).directive('loading', loadingDirective).use(router).use(pinia).mount('#app')