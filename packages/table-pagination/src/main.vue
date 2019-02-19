<template>
	<section class="container">
		<el-table
			v-loading="$attrs.loading"
			v-bind="$attrs"
			v-on="$listeners"
			ref="table"
			:data="tableData"
			:size="defaultOptions.size"
			:border="defaultOptions.border"
			:stripe="defaultOptions.stripe"
			:header-row-class-name="defaultOptions.headerRowClassName"
		>
			<template v-if="columnType">
				<el-table-column v-if="columnType === 'expand'" type="expand" align="center">
					<template slot-scope="props">
						<slot name="expand" v-bind="props" />
					</template>
				</el-table-column>
				<el-table-column v-else :type="columnType" :label="columnTypeName" width="55"  align="center" />
			</template>

			<template v-for="(item, index) in tableColumns">
				<!-- slot -->
				<slot v-if="item.slot" :name="item.slot" />

				<!-- component -->
				<component v-else-if="item.component" :is="item.component" :column="item" :key="index" />

				<!-- 普通/render -->
				<el-table-column v-else :align="item.align || 'center'" v-bind="item" :key="index">
					<template slot-scope="scope">
						<render-dom v-if="item.render" :row="scope.row" :index="scope.$index" :render="item.render" />
						{{ scope.row[item.prop] }}

						<template v-for="(btn, index) in item.buttonGroups">
							<el-button
								:key="index"
								:type="btn.type"
								:size="btn.size || 'mini'"
								:icon="btn.icon"
								:class="btn.class"
								:disabled="btn.disabled"
								:plain="btn.plain"
								@click.stop="btn.click(scope.row, scope.$index)"
							>{{ btn.name }}</el-button>
						</template>
					</template>
				</el-table-column>
			</template>
		</el-table>

		<el-pagination
			v-if="isPagination && (total > pageSize)"
			style="margin-top: 15px"
			v-on="$listeners"
			:current-page="currentPage"
			:page-size="pageSize"
			:total="total"
			:pageSizes="pageSizes"
			:layout="layout">
		</el-pagination>
	</section>
</template>

<script>
	export default {
		name: 'table-pagination',

		props: {
			// table 数据
			tableData: Array,
			/**
			 * table 列数据
			 * 参数同http://element.eleme.io/#/zh-CN/component/table#table-column-attributes
			 */
			tableColumns: Array,

			/**
			 * 对应列的类型。如果设置了 selection 则显示多选框；
			 * 如果设置了 index 则显示该行的索引（从 1 开始计算）；
			 * 如果设置了 expand 则显示为一个可展开的按钮
			 * 可选值：selection/index/expand
			 */
			columnType: {
				type: String,
				validator (value) {
					return ['selection', 'index', 'expand'].includes(value)
				}
			},
			// 对应列的类型的名称
			columnTypeName: String,

			// 是否显示按钮组
			isButtonGroup: {
				type: Boolean,
				default: true
			},

			/******************************************************************
			 * 分页
			 ******************************************************************/
			// 是否显示分页
			isPagination: {
				type: Boolean,
				default: true
			},
			currentPage: {
				type: Number,
				default: 1
			},
			pageSize: {
				type: Number,
				default: 10
			},
			total: {
				type: Number,
				default: 10
			},
			pageSizes: {
				type: Array,
				default: () => [10, 20, 50, 100, 500, 5000]
			},
			layout: {
				type: String,
				default: 'total, sizes, prev, pager, next, jumper'
			}
		},

		data () {
			return {
				// table 默认参数
				defaultOptions: {
					border: true,
					size: 'mini',
					stripe: true,
					headerRowClassName: 'table-header-row',
				}
			}
		},

		created () {
			Object.assign(this.defaultOptions, this.$attrs)
		},

		components: {
			// 函数式组件
			// https://cn.vuejs.org/v2/guide/render-function.html#%E5%87%BD%E6%95%B0%E5%BC%8F%E7%BB%84%E4%BB%B6
			renderDom: {
				functional: true,	// 无状态 (没有响应式数据)，无实例 (没有 this 上下文)

				props: {
					row: Object,
					index: Number,
					render: Function
				},

				/**
				 * @param { Function } createElement - 原生创建dom元素的方法
				 * @param { Object } content - 渲染的节点的 this 对象(参数作为上下文)
				 * @returns 传递参数 row index
				 */
				render (createElement, content) {
					const { row, index } = content.props
					return content.props.render(row, index)
				}
			}
		}
	}
</script>
