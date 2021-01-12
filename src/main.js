// Import main css
import '~/assets/style/index.scss'

import Buefy from 'buefy'

import DefaultLayout from '~/layouts/Default.vue'

import InfiniteLoading from 'vue-infinite-loading'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'

import {
  faAngleLeft, faAngleRight, faInfo, faRss, faSearch
} from '@fortawesome/free-solid-svg-icons'

import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
library.add(
  faAngleLeft, faAngleRight, faInfo, faRss, faSearch
)

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.component('font-awesome', FontAwesomeIcon)

  Vue.use(Buefy, {defaultIconComponent: 'font-awesome', defaultIconPack: 'fas'})

  Vue.use(InfiniteLoading)

}
