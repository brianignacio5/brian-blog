import { Buffer } from 'buffer'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Make Buffer available globally
;(window as any).Buffer = Buffer

const app = createApp(App)
app.use(router)
app.mount('#app')
