import Vue from 'vue'

import {
  Tabs,
  TabPane,
  Message,
  Radio,
  RadioGroup,
  Input,
  Button,
  Table,
  TableColumn,
  Card,
  Select,
  Option,
  Dialog,
  Pagination,
  Timeline,
  TimelineItem,
  Menu,
  MenuItem,
  Submenu,
  Loading,
  MessageBox,
  Image,
  Checkbox,
  InfiniteScroll,
  Popover,
  InputNumber,
  Tooltip
} from 'element-ui'

Vue.use(InfiniteScroll)
Vue.use(Image)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Button)
Vue.use(RadioGroup)
Vue.use(Table)
Vue.use(Card)
Vue.use(Select)
Vue.use(Option)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Pagination)
Vue.use(Checkbox)
Vue.use(Popover)
Vue.use(InputNumber)
Vue.use(Loading.directive)
Vue.use(Tooltip)

// MARK: 信息提示可以初始化一个Bata值，就会方便一点

Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$alert = MessageBox.alert
