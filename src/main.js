import Vue from 'vue'
import App from './App.vue'
import XiangButton from './components/button.vue'
import XiangDialog from './components/dialog.vue'
// import './assets/fonts/'
Vue.config.productionTip = false
Vue.component(XiangButton.name,XiangButton)
Vue.component(XiangDialog.name,XiangDialog)

new Vue({
  render: h => h(App),
}).$mount('#app')
