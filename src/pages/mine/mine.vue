<template>
	<view class="page-fill">
		<view class="header">
			<view v-if="userIsLogin">
				<image :src="userInfo.faceImage" class="face"></image>
			</view>
			<view v-else>
				<image src="http://122.152.205.72:88/group1/M00/00/05/CpoxxFw_-5-AFyVyAABLIH8xBTw233.png" class="face"></image>
			</view>
			
			<view class="info-wapper" v-if="userIsLogin">
				<view class="nickname">
					{{userInfo.nickname}}
				</view>
				<view class="nav-info">ID：{{userInfo.id}}</view>
			</view>
			<view v-else>
				<navigator url="../registLogin/registLogin">
					<view class="nickname regist-login">
						注册/登录
					</view>
				</navigator>
			</view>
			
			<view class="set-wapper" v-if="userIsLogin">
				<navigator url="../mineInfo/mineInfo" hover-class="none">
					<image src="../../static/icon/settings.png" class="settings"></image>	
				</navigator>
			</view>
		</view>
		
		<!-- 生日 -->
		<view class="item-wapper">
			<view class="info-words">生日</view>
			
			<view class="right-wapper">
				<view class="gray-fields">
					{{userInfo.birthday}}
				</view>
			</view>
		</view>
		
		<!-- 性别 -->
		<view class="item-wapper">
			<view class="info-words">性别</view>
			
			<view class="right-wapper">
				<view class="gray-fields">
					
					<view v-if="userInfo.sex == 1">
						男
					</view>
					<view v-else-if="userInfo.sex == 0">
						女
					</view>
					<view v-else>
						保密
					</view>
					
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userIsLogin:false,
				userInfo:{}
			}
		},
		onShow() {
			var me = this;
			//获取全局缓存的信息
			const userInfo = me.getGlobalUser("globalUser")
			//判断是否为空   不为空则为已存在用户信息
			if(userInfo != null){
				me.userIsLogin = true
				me.userInfo = userInfo
				//console.log(me.userInfo)
			}else{
				me.userIsLogin = false
				me.userInfo={}
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
@import url("mine.css");
</style>
