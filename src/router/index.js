import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import loginPage from '../pages/login'
import homePage from '../pages/home'
import orderPrintPage from '../pages/orderPrinting'
import historyOrder from '../pages/historyOrder'
import deliveryNote from '../pages/deliveryNote'
import printingResults from '../pages/printingResults'
import printingNote from '../pages/printingNote'
import machiningSchedule from '../pages/machiningSchedule'
import heatTreatment from '../pages/heatTreatment'
import waiFa from '../pages/waiFa'
import inventory from '../pages/inventory'
import achievements from '../pages/achievements'
import personnel from '../pages/personnel'
import equipment from '../pages/equipment'
import visualization from '../pages/visualization'
import accountSettings from '../pages/accountSettings'
import operationPersonnel from '../pages/operationPersonnel'
import placeManage from '../pages/placeManage'
import materialQR from '../pages/materialQR'
import equipmentQR from '../pages/equipmentQR'
import showTV from '../pages/showTV'
import heatTreat from '../pages/heat'
import orderData from '../pages/orderData'
import materialSelection from '../pages/materialSelection'
import signManage from '../pages/signManage'
import keyManage from '../pages/keyManage'
import separateDetail from '../pages/separateDetail'

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'loginPage',
    meta: {
      require: true
    },
    component: loginPage
  },
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/orderPrint',
    name: 'orderPrintPage',
    component: orderPrintPage
  },
  {
    path: '/historyOrder',
    name: 'historyOrder',
    component: historyOrder
  },
  {
    path: '/deliveryNote',
    name: 'deliveryNote',
    component: deliveryNote
  },
  {
    path: '/printingResults',
    name: 'printingResults',
    component: printingResults
  },
  {
    path: '/printingNote',
    name: 'printingNote',
    component: printingNote
  },
  {
    path: '/machiningSchedule',
    name: 'machiningSchedule',
    component: machiningSchedule
  },
  {
    path: '/heatTreatment',
    name: 'heatTreatment',
    component: heatTreatment
  },
  {
    path: '/waiFa',
    name: 'waiFa',
    component: waiFa
  },
  {
    path: '/inventory',
    name: 'inventory',
    component: inventory
  },
  {
    path: '/achievements',
    name: 'achievements',
    component: achievements
  },
  {
    path: '/personnel',
    name: 'personnel',
    component: personnel
  },
  {
    path: '/equipment',
    name: 'equipment',
    component: equipment
  },
  {
    path: '/visualization',
    name: 'visualization',
    component: visualization
  },
  {
    path: '/accountSettings',
    name: 'accountSettings',
    component: accountSettings
  },
  {
    path: '/operationPersonnel',
    name: 'operationPersonnel',
    component: operationPersonnel
  },
  {
    path: '/placeManage',
    name: 'placeManage',
    component: placeManage
  },
  {
    path: '/materialQR',
    name: 'materialQR',
    component: materialQR
  },
  {
    path: '/equipmentQR',
    name: 'equipmentQR',
    component: equipmentQR
  },
  {
    path: '/showTV',
    name: 'showTV',
    component: showTV
  },
  {
    path: '/heat',
    name: 'heatTreat',
    component: heatTreat
  },
  {
    path: '/orderData',
    name: 'orderData',
    component: orderData
  },
  {
    path: '/materialSelection',
    name: 'materialSelection',
    component: materialSelection
  },
  {
    path: '/signManage',
    name: 'signManage',
    component: signManage
  },
  {
    path: '/keyManage',
    name: 'keyManage',
    component: keyManage
  },
  {
    path: '/separateDetail',
    name: 'separateDetail',
    component: separateDetail
  }
]

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.require) {
    next()
  } else {
    if (isToRouter()) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

let isToRouter = () => {
  let token = localStorage.getItem('hmdsUsers')
  if (token != null) {
    store.state.users = JSON.parse(localStorage.getItem('hmdsUsers'))
    return true
  } else {
    return false
  }
}

export default router
