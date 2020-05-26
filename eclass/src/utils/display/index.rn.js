import ImagePicker from 'react-native-image-crop-picker'
import Taro from '@tarojs/taro'
import {
	ChooseImageOptions,
	ChooseImageResult,
	ActionSheetOptions,
	ActionSheetOptionItem,
	ShareConfig
} from './type'
import BASEHOST, { HOST, SHAREINFO,ASSETS } from '@/config'
import { requestConfig } from '@/config/requestConfig'
import Storage from '@/utils/storage'
import RootSiblings from 'react-native-root-siblings'
import { StyleSheet, TouchableHighlight } from 'react-native'
import ActionSheet from './components/ActionSheet'
import SharePanel from './components/SharePanel'
import Tips from '../tips'
import Platform from '@/platfrom'
import imageIndex, { version as imageVersion } from '@/assets/images'
const host = HOST //process.env.NODE_ENV === 'development' && process.env.TARO_ENV === 'h5' ? '/api' : HOST;

var display = {}

const chooseImagedefaultOptions = {
	cropperStatusBarColor: '#f87c6a',
	cropperToolbarColor: '#87c6a',
	minFiles: 1, //ios only
	maxFile: 5, //ios only
	loadingLabelText: '正在读取图片...', //ios only
	mediaType: 'photo'
}
const chooseMap = new Map()
chooseMap.set(0, (options) => ImagePicker.openPicker(options))
chooseMap.set(1, (options) => ImagePicker.openCamera(options))

display.chooseImage = function(
	options: ChooseImageOptions
): Promise<ChooseImageResult> {
	const {
		maxHeight = 9999,
		maxWidth = 9999,
		count = 1,
		success,
		fail,
		complete,
		cropping
	} = options
	const imagePickerOptions = {
		...chooseImagedefaultOptions,
		multiple: count > 1,
		maxFiles: count,
		compressImageMaxWidth: maxWidth,
		compressImageMaxHeight: maxHeight,
		cropping
	}
	return new Promise((resolve, reject) => {
		function onPressHOF(_onPress: () => Promise<any>) {
			return function() {
				_onPress()
					.then((res) => {
						if (!Array.isArray(res)) {
							res = [ res ]
						}
						const tempFilePaths = res.map((image) => image.path)
						const tempFiles = res.map(
							({ path, size, width, height, mime }) => ({
								path,
								size,
								width,
								height,
								mime
							})
						)
						success && success({ tempFilePaths, tempFiles })
						complete && complete()
						resolve({ tempFilePaths, tempFiles })
					})
					.catch((err) => {
						fail && fail()
						complete && complete()
						reject(err)
					})
			}
		}
		display.showActionSheet({
			options: [
				{
					label: '从相册选取',
					onPress: onPressHOF(chooseMap.get(0).bind(null, imagePickerOptions))
				},
				{
					label: '拍一张',
					onPress: onPressHOF(chooseMap.get(1).bind(null, imagePickerOptions))
				},
				{
					label: '取消'
				}
			],
			cancelIndex: 2
		})
	})
}

/**
 * 上传图片的RN版本
 * @param {arr}     files         图片url集合
 * @param {String}  url           图片上传接口地址
 * @param {String}  dir           上传目录地址
 * @param {String}  name          文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
 * @param {Object}  header        HTTP 请求 Header, header 中不能设置 Referer
 * @param {Object}  formData      HTTP 请求中其他额外的 form data
 */
display.uploadImage = async ({
	files = [],
	name = 'file',
	formData = {
		token: Storage.getInstance().getToken()
	},
	header = {
		// Authorization: Storage.getInstance().getToken()
	},
	dir = '',
	url = `${host}${requestConfig.uploadImageUrl}`
}) => {
	function formartFileUri(filepath) {
		if (filepath.startsWith('file://')) return filepath
		if (filepath.startsWith('file:/'))
			return filepath.replace('file:/', 'file:///')
		if (filepath.startsWith('/')) return `file://${filePath}`
		throw new Error('无效的文件地址')
	}
	async function createFormData(filepath) {
		const uri = formartFileUri(filepath)
		const form = new FormData()
		for (const key in formData) {
			form.append(key, formData[key])
		}
		const blob = await convertObjectUrlToBlob(uri)
		form.append(name, {
			uri,
			type: blob.data.type,
			name: blob.data.name,
			size: blob.data.size
		})
		return form
	}

	function createXHR(formData) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open('POST', url + dir)
			for (const key in header) {
				xhr.setRequestHeader(key, header[key])
			}
			xhr.setRequestHeader('Content-Type', 'multipart/form-data')
			xhr.onreadystatechange = () => {
				if (xhr.readyState !== 2) {
				}
			}
			xhr.responseType = 'json'
			xhr.onload = () => {
				resolve(JSON.stringify({ data: xhr.response.data }))
			}

			xhr.onerror = (e) => {
				reject({ errMsg: `uploadFile:fail ${e.message}` })
			}
			xhr.send(formData)
		})
	}
	function convertObjectUrlToBlob(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest()
			xhr.open('GET', url, true)
			xhr.responseType = 'blob'
			xhr.onload = function(e) {
				if (this.status === 0) {
					resolve(this.response)
				} else {
					/* eslint-disable prefer-promise-reject-errors */
					reject({
						status: this.status,
						errMsg: 'convert to blob failed',
						err: e
					})
				}
			}
			xhr.onerror = function(e) {
				reject({ status: this.status, err: e })
			}
			xhr.send()
		})
	}
	if (files && files instanceof Array && files.length > 0) {
		return Promise.all(files.map(createFormData)).then((formDatas) =>
			Promise.all(formDatas.map(createXHR))
		)
	}
	return Promise.reject(new Error('传参有误，请传数组格式'))
}

display.showActionSheet = function showActionSheet(
	setting: ActionSheetOptions
) {
	const { options, cancelIndex } = setting

	const sibling = new RootSiblings(
		(
			<ActionSheet
				show={false}
				onCancel={destroy}
				buttons={options}
				cancelIndex={cancelIndex}
			/>
		)
	)

	setTimeout(() => {
		sibling.update(
			<ActionSheet
				show
				onCancel={destroy}
				buttons={options}
				cancelIndex={cancelIndex}
			/>
		)
	}, 0)

	function destroy() {
		sibling && sibling.update(<ActionSheet
			show={false}
			onCancel={destroy}
			buttons={options}
			cancelIndex={cancelIndex}
		/>)
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				sibling && sibling.destroy()
				resolve()
			}, 300);
		})
	}
}

display.share = function(config: ShareConfig) {
	let defaultThumbImage
	if (typeof SHAREINFO.defaut.imgUrl === 'string') {
		defaultThumbImage = SHAREINFO.defaut.imgUrl.replace(/^http/, 'https')
	} else {
		const originPath = Object.entries(imageIndex).find(
			([ key, value ]) => value === SHAREINFO.defaut.imgUrl
		)[0]
		defaultThumbImage = ASSETS + originPath.split('.').join(`.${imageVersion}.`)
	}
	let {
		link,
		type = 'news',
		title,
		thumbImage = defaultThumbImage,
		description
	} = config

	async function getIdentify() {
		try {
			let { userInfo, identify } = Taro.$store.getState().user
			if (Object.keys(userInfo).length == 0) {
				userInfo = await Taro.$store.dispatch({
					type: 'user/fetchMyInfo',
					payload: {}
				})
			}
			if (userInfo/* && userInfo.is_agent == 1*/) {
				//登录用户是代理
				if (!identify) {
					await Taro.$store.dispatch({
						type: 'user/fetchGetshareIdentify'
					})
				}
			}
			//代理身份分享带代理标示  ，不然带链接的标示(链接标示是全局参数，不是本地保存)
			if(Taro.$store.getState().user.identify){
				return Taro.$store.getState().user.identify;
			}else{
				return Storage.getInstance().getIdentify();
			}
		} catch (error) {
			return null
		}
	}

	async function shareToSession() {
		const agentIdentify = await getIdentify()
		link = `${HOST}${link}&identify=${agentIdentify}`

		Platform.shareToWeChat({
			link,
			type,
			title,
			thumbImage,
			description,
			target: 'session'
		})
		.catch(err => {
			Tips.toast(err.message)
		})
		destroy()
	}

	async function shareToTimeline() {
		const agentIdentify = await getIdentify()
		link = `${HOST}${link}&identify=${agentIdentify}`
		Platform.shareToWeChat({
			link,
			type,
			title,
			thumbImage,
			description,
			target: 'timeline'
		})
		.catch(err => {
			Tips.toast(err.message)
		})
		destroy()
	}

	async function copyLink() {
		const agentIdentify = await getIdentify()
		link = `${HOST}${link}&identify=${agentIdentify}`
		Taro.setClipboardData({
			data: link
		}).then(() => {
			Tips.toast('已复制到剪贴板')
		})
		destroy()
	}

	const buttons = [
		{ label: '微信好友', icon: 'icon_weixinzhifu', onPress: shareToSession },
		{ label: '微信朋友圈', icon: 'icon_pengyouquan', onPress: shareToTimeline },
		{ label: '复制链接', icon: 'icon_fuzhilianjie', onPress: copyLink }
	]
	const sibling = new RootSiblings(
		<SharePanel show={false} onCancel={destroy} buttons={buttons} />
	)
	function destroy() {
		sibling &&
			sibling.update(
				<SharePanel show={false} buttons={buttons} onCancel={destroy} />
			)
		setTimeout(() => {
			sibling && sibling.destroy()
		}, 300)
	}
	setTimeout(() => {
		sibling.update(<SharePanel show onCancel={destroy} buttons={buttons} />)
	}, 0)
}
export default display
