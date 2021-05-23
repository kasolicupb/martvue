import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'

const app = createApp(App)

//引入全局样式组件
import '../src/common/style/global.css'

//引入全局过滤器
app.config.globalProperties.$filters = {
    prefix(url){
        if (url && url.startsWith('http')) {
            return url
          } else {
            url = `http://backend-api-01.newbee.ltd${url}`
            return url
          }
    }
  }

app.use(store)
    .use(router)
    .use(ActionBarButton)
    .use(ActionBarIcon)
    .use(ActionBar)
    .use(Divider)
    .use(Popup)
    .use(Overlay)
    .use(Loading)
    .use(Dialog)
    .use(Toast)
    .use(ContactCard)
    .use(Form)
    .use(AddressEdit)
    .use(AddressList)
    .use(Field)
    .use(CellGroup)
    .use(Cell)
    .use(SwipeCell)
    .use(Icon)
    .use(Stepper)
    .use(Card)
    .use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Skeleton)

app.mount('#app')
