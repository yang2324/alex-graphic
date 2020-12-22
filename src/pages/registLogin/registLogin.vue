<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icon/default-face.png" class="face"></image>
			</view>
			
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords"/>
			</view>
			
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords"/>
			</view>
			
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;">注册/登录</button>
		</form>
		
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
			<view class="third-wapper">
				
				<view class="third-line">
					<view class="single-line">
						<view class="line"></view>
					</view>
					
					<view class="third-words">第三方账号登录</view>
					
					<view class="single-line">
						<view class="line"></view>
					</view>
				</view>
				
				<view class="third-icos-wapper">
					<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
					<!-- #ifdef APP-PLUS -->
						<image src="../../static/icos/weixin.png"  data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
						<image src="../../static/icos/QQ.png"  data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
						<image src="../../static/icos/weibo.png"  data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
					<!-- #endif -->
					<!-- #ifdef MP-WEIXIN -->
						<button open-type='getUserInfo' @getuserinfo="wxLogin" class="third-btn-ico">
						</button>
					<!-- #endif -->
				</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//表单登录
			formSubmit(e){
				//console.log(e)
				//获取表单输入的账号密码
				let username = e.detail.value.username;
				let password = e.detail.value.password;
				
				//发送网络请求    -请求的数据
				this.request({
					url:"https://www.imovietrailer.com/superhero/user/registOrLogin?qq=2715705745",
					data:{
						"username":username,
						"password":password,
					},
					method:"POST"
				}).then(res=>{
					//console.log(res)
					if(res.status == 200){
						let userInfo = res.data
						//console.log(userInfo)
						//保存用户信息到全局
						uni.setStorageSync("globalUser", userInfo);
						uni.switchTab({
							url:"../mine/Mine"
						})
					}else if(res.status == 500){
						uni.showToast({
							title: res.msg,
							duration: 2000,
							image: "../../static/icon/error.png"
						})
					}
				})
			},
			//微信小程序端微信登录  接口权限有问题
			wxLogin(e){
				let me = this
				//通过微信开发，获得微信用户的基本信息
				let userInfo = e.detail.userInfo
				console.log(userInfo)
				//实现微信登录
				uni.login({
					provider: "weixin",
					success(loginResult) {
						
						//获取微信授权码code
						let code = loginResult.code
						//console.log(loginResult)
						
						//使用哪个小程序[0:NEXT超英预告][1:超英预告][2:NEXT学院电影预告]
						let loginWhichMP = 1
						uni.request({
							url: "https://www.imovietrailer.com/superhero/stu/mpWXLogin/" + code + "?qq=2715705745",
							data: {
								"avatarUrl": userInfo.avatarUrl,
								"nickName": userInfo.nickName,
								"whichMP": loginWhichMP,
								"qq":"2715705745"
							},
							method:"POST",
							success(userResult) {
								//显示500 接口权限有问题
								if(userResult.data.status == 200){
									let userInfo = userResult.data.data
									// 保存用户信息到全局的缓存中
									uni.setStorageSync("globalUser", userInfo);
									uni.switchTab({
										url:"../mine/Mine"
									})
								}
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
@import url("registLogin.css");
</style>
