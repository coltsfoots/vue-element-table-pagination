/**
 * @author: YouJie
 * @date: 2018-12-29 18:50:04
 */

import TablePagination from './src/main.vue'

TablePagination.install = Vue => {
	Vue.component(TablePagination.name, TablePagination)
}

// 支持使用script标签方式引入
if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default TablePagination
