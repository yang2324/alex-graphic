<template>
	<view class="page-fill">
				
		<view class="page-block info-list">
			<!-- 头像 -->
			
			<view class="item-wapper face-line-upbottom" @click="operator">
				<view class="info-words">头像</view>
				
				<view class="right-wapper">
					<image :src="globalUser.faceImage" class="face"></image>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<line-wapper></line-wapper>
			
			<!-- 昵称 -->
			<view class="item-wapper"  @click="modifyNickname" >
				<view class="info-words">昵称</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.nickname}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<line-wapper></line-wapper>
			
			<!-- 生日 -->
			<view class="item-wapper" @click="modifyBirthday">
				<view class="info-words">生日</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						{{globalUser.birthday}}
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
			<line-wapper></line-wapper>
			
			<!-- 性别 -->
			<view class="item-wapper" @click="modifySex">
				<view class="info-words">性别</view>
				
				<view class="right-wapper">
					<view class="gray-fields">
						
						<view v-if="globalUser.sex == 1">
							男
						</view>
						<view v-else-if="globalUser.sex == 0">
							女
						</view>
						<view v-else>
							未选择
						</view>
						
					</view>
					<view class="arrow-block">
						<image src="../../static/icon/left-gray-arrow.png" class="arrow-ico"></image>
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="footer-wapper">
			<view class="footer-words" @click="clearStorage">
				清理缓存
			</view>
			<view class="footer-words" @click="loginout" style="margin-top: 10upx;" >
				退出登录
			</view>
		</view>
		
	</view>
</template>

<script>
	import LineWapper from "../../components/LineWapper.vue"
	export default {
		components:{LineWapper},
		data() {
			return {
				//获取全局用户信息
				globalUser:{}
			}
		},
		onShow() {
			//获取缓存的用户信息
			let me = this
			let globalUser =  me.getGlobalUser("globalUser")
			me.globalUser = globalUser
		},
		methods: {
			//修改性别
			modifySex(){
				uni.navigateTo({
					url:"../meSex/meSex"
				})
			},
			//修改生日
			modifyBirthday(){
				uni.navigateTo({
					url:"../meBirthday/meBirthday"
				})
			},
			//修改昵称
			modifyNickname(){
				uni.navigateTo({
					url:"../meNickname/meNickname"
				})
			},
			//修改头像
			operator(){
				//获取全局用户信息
				let globalUser =  this.getGlobalUser("globalUser");
				//​显示操作菜单
				uni.showActionSheet({
				    itemList:["查看我的头像","从相册选择上传"],
				    success (res) {
						let index = res.tapIndex
						//查看头像
						if(index == 0){
							//定义头像数组
							let urlArr = []
							urlArr.push(globalUser.faceImage)
							uni.previewImage({
								urls:urlArr,
								current:urlArr[0]
							})
						}else if(index == 1){	
							//上传头像
							uni.chooseImage({
							    count: 1, //默认9
							    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
							    sourceType: ['album'], //从相册选择
							    success(res) {
									//获得临时路径
									let tempFilePath = res.tempFilePaths[0]
										// #ifdef H5
										// uni.navigateTo({
										// 	url: "../meFace/meFace?tempFilePath=" + tempFilePath
										// })
										// #endif
										// #ifndef H5
										uni.navigateTo({
											url: "../faceCrop/faceCrop?tempFilePath=" + tempFilePath
										})
										// #endif
							    }
							});
						}
				    }
				});
			},
			//清理缓存
			clearStorage(){
				uni.clearStorageSync();
				uni.showToast({
					title:"清理缓存成功",
					mask:false,
					duration:3000
				})
				uni.switchTab({
					url:"../mine/Mine"
				})
			},
			//退出登录
			loginout(){
				//获取用户缓存信息
				let globalUser = this.getGlobalUser("globalUser");
				this.request({
					url:'https://www.imovietrailer.com/superhero/user/logout?qq=2715705745&userId='+globalUser.id,
					method:"POST",
				}).then(res=>{
					console.log(res)
					if(res.status == 200 ){
						uni.removeStorageSync("globalUser");
						uni.switchTab({
							url:"../mine/Mine"
						})
					}
				})
			}
		}
	}
</script>

<style>
@import url("mineInfo.css");
</style>
