<template>
	<view
		@touchstart="handleTouchstart"
	    @touchend="handleTouchend">
		
		<slot></slot>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//按下的时间
				startTime:0,
				//按下的坐标
				startX:0,
				startY:0
			}
		},
		methods: {
			//用户按下屏幕
			handleTouchstart(event){
				this.startTime = Date.now();
				this.startX = event.changedTouches[0].clientX;
				this.startY = event.changedTouches[0].clientY
			},
			//用户离开屏幕
			handleTouchend(event){
				const endTime = Date.now();
				const endX = event.changedTouches[0].clientX;
				const endY = event.changedTouches[0].clientY;
				
				//判断按下的时长		超过2000毫秒
				if(endTime - this.startTime>2000){
					return;
				}
				let direction = "";
				//判断滑动的距离是否合法			绝对值
				if(Math.abs(endX - this.startX)>10&&Math.abs(endY-this.startY<10)){
					direction = endX-this.startX >0?"right":"left"
				}else{
					return;
				}
				
				//用户做了合法运动
				//console.log(direction)
				this.$emit("swiperAction",{direction})
			}
		}
	}
</script>

<style>
</style>
