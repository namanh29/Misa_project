import Vue from 'vue'
import VueX from 'vuex'
import App from './App.vue'
import router from './router'
import {store}  from './store'

import { VTooltip, VPopover, VClosePopover } from 'v-tooltip'

import BaseCombobox from './components/base/BaseCombobox'
import BaseDropdown from './components/base/BaseDropdown'
import BaseInput from './components/base/BaseInput'
import BaseButton from './components/base/BaseButton'
import BaseLoader from './components/base/BaseLoader'
import BasePopup from './components/base/BasePopup'
import BaseToast from './components/base/BaseToast'
import Pagination from './components/base/Pagination'

Vue.directive('tooltip', VTooltip)
Vue.directive('close-popover', VClosePopover)
Vue.component('v-popover', VPopover)
Vue.use(VueX);
Vue.use(VTooltip);

Vue.component("BaseCombobox", BaseCombobox)
Vue.component("BaseDropdown", BaseDropdown)
Vue.component("BaseButton", BaseButton)
Vue.component("BaseInput", BaseInput)
Vue.component("BaseLoader", BaseLoader)
Vue.component("BasePopup", BasePopup)
Vue.component("BaseToast", BaseToast)
Vue.component("Pagination", Pagination)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
