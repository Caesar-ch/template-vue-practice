import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


import draggable from 'vuedraggable'
let app = createApp(App)

app.use(store)
app.use(router)
app.use(ElementPlus)
app.component('Draggable', draggable)


app.mount('#app')
