<template>
	<view @click="handleClick">
		<slot></slot>
	</view>
</template>

<script>
	export default{
		props: {
		    list: Array,
			index: Number
		},
		methods:{
			handleClick(){
				//缓存数据 
				getApp().globalData.imgList = this.list;
				getApp().globalData.imgIndex = this.index
				uni.navigateTo({
					url:"/pages/imgDetail/imgDetail"
				})
			}
		}
	}
</script>

<style>
</style>
