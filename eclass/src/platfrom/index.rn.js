import Taro from '@tarojs/taro'
import { PermissionsAndroid, Platform, Alert } from 'react-native'
import {
	init,
	Geolocation,
	addLocationListener,
	start,
	stop,
	setLocatingWithReGeocode,
	setNeedAddress,
	setAllowsBackgroundLocationUpdates
} from 'react-native-amap-geolocation'
import Dq from '@/config/Dq'
import * as WeChat from 'react-native-wechat'

const AMAP_KEY = '480f17ad5c2699ccc134b1976840096d'
const WX_APPID = 'wxdecb975fc78eeda4'
const WX_PARTNER_ID = '1571226871'

function getReGeo(lng, lat) {
	if (!lng || !lat) {
		return Promise.resolve({
			lng: 0,
			lat: 0,
			city: [],
			province: '',
			district: '',
			township: ''
		})
	}
	return fetch(
		`https://restapi.amap.com/v3/geocode/regeo?key=${AMAP_KEY}&location=${lng},${lat}`
	)
		.then((res) => res.json())
		.then((res) => {
			// console.log(res);
			if (res.status === '1') {
				return {
					lng,
					lat,
					...res.regeocode
				}
			}
			return Promise.reject(res.info)
		})
}
const _Platform = {}

_Platform.getType = function() {
	return 'app'
}

//登录相关
_Platform.appCheckAuth = function() {
	const scope = 'snsapi_userinfo'
	const state = 'eClass' + Math.random()

	return WeChat.registerApp(WX_APPID)
		.then((registered) => {
			if (registered) return WeChat.isWXAppInstalled()
			return Promise.reject(new Error('appId 错误'))
		})
		.then((installed) => {
			if (installed) {
				return WeChat.isWXAppSupportApi()
			}
			return Promise.reject(new Error('微信没有安装'))
		})
		.then((supported) => {
			if (supported) {
				return WeChat.sendAuthRequest(scope, state)
			}
			return Promise.reject(new Error('本设备不支持微信登录'))
		})
		.then((res) => {
			//防止csrf攻击
			if (res.code && res.state === state) {
				Dq.navigateTo({
					url: `/pages/login-register/wxbind-phone/index?code=${res.code}&channel=${Platform.OS}`
				})
				return true
			}

			return Promise.reject(new Error('获取设备授权失败'))
		})
}

//请求定位
_Platform.sendLocation = async function() {
	return new Promise(async (resolve) => {
		async function locationHandler(location) {
			// console.log("=====get geolocation , location = ", location);
			if (location) {
				const { longitude, latitude } = location
				stop()
				const result = await getReGeo(longitude, latitude)
				// console.log("===get regeo result, ", result);
				resolve(result)
			}
		}

		if (Platform.OS === 'android') {
			await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
			)
		} else {
			// setLocatingWithReGeocode(true);
			setAllowsBackgroundLocationUpdates(true)
		}
		// 使用自己申请的高德 App Key 进行初始化
		// console.log("======start init geolocation");
		await init({
			ios: '71618ad089efd16b322a412c49af04e8',
			android: '3815b301f1f4e3d0fc31650da62b5bc2'
		})
		// console.log("=====start get current position ");
		// Geolocation.getCurrentPosition(
		//   position => {
		//     console.log(position);
		//   },
		//   error => console.log(error)
		// );
		// 添加定位监听函数
		addLocationListener(locationHandler)
		// 开始连续定位
		start()
	})
	// 在不需要的时候停止定位
	// stop()
}

//请求支付
_Platform.sendPay = function(type, payload, callback, from, openid) {
	const defaultPayload = {
		pay_method:'wx',
		trade_type:4
	}
	payload = {...defaultPayload, ...payload}
	Taro.$store.dispatch({
		type,payload,
	})
	.then(data => {
		if (data) {
				console.log('====================================');
				console.log('going to pay with wx, payload = ', data);
				console.log('====================================');
				return WeChat.registerApp(WX_APPID)
				.then((registered) => {
					if (registered) return WeChat.isWXAppInstalled()
					return Promise.reject(new Error('appId 错误'))
				})
				.then((installed) => {
					if (installed) {
						return WeChat.isWXAppSupportApi()
					}
					return Promise.reject(new Error('微信没有安装'))
				})
				.then((supported) => {
					if (supported) {
						return WeChat.pay(data)
					}
					return Promise.reject(new Error('本设备不支持微信登录'))
				})
				.then(({errCode, errStr}) => {
					if (errCode) {
						Alert.alert('Tips', `支付失败，errCode = ${errCode}, errStr = ${errStr}`)
					} else {
						Alert.alert('提示','支付成功')
					}
				})
		}
		return Promise.reject(new Error('支付失败'))
	})
}

//请求分享
_Platform.sendShare = function(config) {
	return null
}

_Platform.shareToWeChat = function(config) {
	return WeChat.registerApp(WX_APPID)
		.then((registered) => {
			if (registered) return WeChat.isWXAppInstalled()
			return Promise.reject(new Error('appId 错误'))
		})
		.then((installed) => {
			if (installed) {
				return WeChat.isWXAppSupportApi()
			}
			return Promise.reject(new Error('微信没有安装'))
		})
		.then((supported) => {
			if (supported) {
				switch (config.type) {
					case 'news':
						config.webpageUrl = config.link
						break
					case 'text':
						break
					case 'imageUrl':
					case 'imageFile':
					case 'imageResource':
						config.imageUrl = config.link
						break
					case 'video':
						config.videoUrl = config.link
						break
					case 'audio':
						config.musicUrl = config.link
						break
					case 'file':
						config.filePath = config.link
						break
					default:
						break
				}
				if (config.target === 'session') {
					return WeChat.shareToSession(config).then(({ errCode, errStr }) => {
						if (errCode && errStr) {
							return Promise.reject(new Error(errStr))
						}
						return Promise.resolve()
					})
				}
				return WeChat.shareToTimeline(config).then(({ errCode, errStr }) => {
					if (errCode && errStr) {
						return Promise.reject(new Error(errStr))
					}
					return Promise.resolve()
				})
			}
			return Promise.reject(new Error('本设备不支持微信相关操作'))
		})
}

//跳转外部链接
_Platform.LinksExternal = function(url) {
	Dq.navigateTo({
		url: `/pages/web-view/index?from=/pages/user/user&src=${url}`
	})
}

//请求天气
_Platform.sendWeather = async function(address) {
	let callback
	const promise = new Promise((resolve) => (callback = resolve))
	try {
		const { districts } = await fetch(
			`https://restapi.amap.com/v3/config/district?key=${AMAP_KEY}&keywords=${address}`
		).then((res) => res.json())
		const { adcode } = districts[0]
		const { lives } = await fetch(
			`https://restapi.amap.com/v3/weather/weatherInfo?key=${AMAP_KEY}&city=${adcode}`
		).then((res) => res.json())
		const { weather, temperature } = lives[0]
		callback({ weather, temperature })
	} catch (e) {
		callback(null)
	}
	return promise
}
export default _Platform
