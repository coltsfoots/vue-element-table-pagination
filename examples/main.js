import Vue from 'vue'
import App from './app.vue'
import { Table, TableColumn, Pagination, Button } from 'element-ui'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Button)

new Vue({
	el: '#app',
	render: h => h(App)
})
