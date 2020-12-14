<template>
	<view class="page">
		首页
		<text class="iconfont iconvideocamera"></text>

		<unibadge text="1"></unibadge>
	</view>
</template>

<script>
	//import { unibadge } from '@dcloudio/uni-ui'
	import unibadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue";
	export default {
		components:{
			unibadge
		},
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	
</style>
