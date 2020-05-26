import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class PublishType extends PureComponent {
	static defaultProps = {
		typeList: [],
		value: 1
	}

	changeCurrentType(key) {
		this.props.getCurrentType(key)
	}

	render() {
		const { typeList, value } = this.props
		const style_ =
			typeList && typeList.length == 4 ? 'wrap__view' : 'wrap__view-len'

		return (
			<View className="wrap-bg">
				<View className="wrap">
					<View className="wrap__title">
						<Text className="wrap__title__text">选择发布类别</Text>
					</View>
					<View className={style_}>
						{typeList.map((item) => {
							return (
								<View className={`${style_}__text-wrap`}>
									<Text
										className={
											value == item.key ? (
												`${style_}__active`
											) : (
												`${style_}__text`
											)
										}
										key={item.key}
										onClick={this.changeCurrentType.bind(this, item.key)}
									>
										{item.name}
									</Text>
								</View>
							)
						})}
					</View>
				</View>
			</View>
		)
	}
}
