<template>
	<table-pagination
		:table-data="list"
		:total="11"
		:table-columns="tableColumns"></table-pagination>
</template>

<script>

	// import tablePagination from '../packages/table-pagination/src/main.vue'
	import tablePagination from 'vue-element-table-pagination'

	export default {
		data () {
			return {
				list: [
					{
						id: 1,
						name: '渣渣智'
					},
					{
						id: 2,
						name: '阿林'
					},
					{
						id: 1,
						name: '渣渣智'
					},
					{
						id: 2,
						name: '阿林'
					},
					{
						id: 1,
						name: '渣渣智'
					},
					{
						id: 2,
						name: '阿林'
					},
					{
						id: 1,
						name: '渣渣智'
					},
					{
						id: 2,
						name: '阿林'
					},
					{
						id: 1,
						name: '渣渣智'
					}
				],

				tableColumns: [
					{
						label: 'id',
						prop: 'id'
					},
					{
						label: '姓名',
						render: (row, index) => {
							return (
								<span style="color: red">{row.name}</span>
							)
						}
					},
					{
						label: '操作',
						buttonGroups: [
							{
								name: '编辑',
								type: 'success',
								icon: 'el-icon-edit',
								click (row, index) {
									console.log(row)
								}
							}
						]
					}
				]
			}
		},

		components: {
			tablePagination
		}
	}
</script>
