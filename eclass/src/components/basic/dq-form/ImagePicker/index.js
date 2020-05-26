import Taro, { Component, useState, useContext } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import * as utils from './utils'
import FormContext from '../context'
import ImageItem from './ImageItem'
import '../index.scss'
import { stopPropagation } from '@/utils/common'
import { STATIC_ASSETS } from '@/config'
import display from "@/utils/display";


const BASE = 'dq-form'
const IMAGE = 'dq-form__image-picker'
function ImagePicker(props) {
	const formContext = useContext(FormContext)

	const [ state, setState ] = useState({ imgs: [] })

	function deleteImg(index, e) {
		stopPropagation(e)
		const { imgs } = state
		imgs.splice(index, 1)
		setState({ imgs })
		_onChange(imgs)
	}

	function addImg(e) {
		const { imgs } = state
		const { sizeLimit, max } = props
		utils
			.chooseImage({ count: max - imgs.length, sizeLimit })
			.then((imgPaths) => {
				const len = imgPaths.length + imgs.length;
				if(len > max){//超出上限-删掉
					imgPaths.splice(imgPaths.length - (len - max), imgPaths.length)
				}
				// const newImgs = [ ...imgs, ...imgPaths ]
				// setState({ imgs: newImgs })
				// _onChange(newImgs)

				Taro.showLoading({
					title: '上传图片中',
					mask: true
				})
				display.uploadImage({ files: imgPaths }).then(res => {
					Taro.hideLoading()

					let upimg = [];
					for(let key in res){
						let data = JSON.parse(res[key]).data;
						upimg.push(data);
						console.log("data",data)
					}
					const newImgs = [ ...imgs, ...upimg ]
          setState({ imgs: newImgs });
          _onChange(newImgs);
        }).catch(err => {
					Taro.hideLoading()
				})
				.finally(() => {
					Taro.hideLoading()
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	function replace(index, e) {
		stopPropagation(e)
		const { imgs } = state
		const { sizeLimit } = props
		utils
			.chooseImage({ count: 1, sizeLimit })
			.then((imgPaths) => {
				if (imgPaths[0]) {
					imgs[index] = imgPaths[9]
					setState({ imgs })
					_onChange(imgs)
				}
			})
			.catch((err) => {})
	}

	function preview(index) {
		const { imgs } = state
		let arr = [];
		for(let key in imgs){
			arr.push(imgs[key].url);
		}
		// console.log("preview---",arr);

		Taro.previewImage({
			current: arr[index],
			urls: arr
		})
	}

	function _onChange(imgs) {
		const { onChange, name } = props
		if (formContext) {
			formContext.dispatch({
				type: 'change',
				payload: { name, value: imgs }
			})
		}
		onChange && onChange(imgs)
	}

	const { max, label, describe } = props
	const { imgs } = state
	const canAddMore = imgs.length < max
	return (
		<View className={`${BASE} ${IMAGE}`}>
			<View className={`${BASE} ${IMAGE}__header`}>
				<Text className={`${BASE} ${IMAGE}__header__label`}>{label}</Text>
				<Text className={`${BASE} ${IMAGE}__header__describe`}>{describe}</Text>
			</View>
			<View className={`${BASE} ${IMAGE}__content`}>
				{imgs.map((path, index) => (
					<ImageItem
						path={path.url}
						preview={preview}
						deleteImg={deleteImg}
						key={`image-picker-item-${index}`}
						index={index}
					/>
				))}
				{canAddMore ? (
					<View
						className={`${BASE} ${IMAGE}__content__item ${IMAGE}__content__item--camera`}
						onClick={addImg}
					>
						<IconFont name="ic_xiangji" colo="#fff" size={50} />
					</View>
				) : null}
			</View>
		</View>
	)
}
ImagePicker.defaultProps = {
	max: 9,
	sizeLimit: 2,
	label: '添加照片',
	describe: '(选填，最多9张)',
	onChange: () => {}
}
ImagePicker.options = {
	addGlobalClass: true
}

export default ImagePicker
