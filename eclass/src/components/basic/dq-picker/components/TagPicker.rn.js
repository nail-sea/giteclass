import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import ProtoPicker from './ProtoPicker'
import DqModal from '../../dq-modal'
import '../index.scss'
const { windowHeight, windowWidth } = Taro.getSystemInfoSync()
class RNTagPicker extends ProtoPicker {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		//初始化多选选项---深拷贝
		this.setState({ selList: this.copyArr(this.props.value) })
	}
	render() {
		const { selector, value, title, select_count, name } = this.props
		const { selList, isShowSel } = this.state
		return (
			<View style={{ flex: 1 }}>
				<View
					className="dq-picker__show-sel"
					onClick={this.onShowSel.bind(this, true)}
				>
					<View className="dq-picker__show-sel__label">
						{value && selector && value.length > 0 && selector.length > 0 ? (
							<View>
								<Text className="dq-picker__show-sel__label__text">
									{value.map((item, index) => {
										return `${selector[item].name}${index + 1 === value.length
											? ''
											: ';'}`
									})}
								</Text>
								<Input
									style={{ display: 'none' }}
									name={name}
									className="col323232"
									value={value}
								/>
							</View>
						) : (
								<Text className="dq-picker__show-sel__label__text colA0A0A0">请选择</Text>
							)}
					</View>
					<View className="dq-picker__show-sel__icon">
						<IconFont
							className="dq-form-continer__item__icon"
							name="ic_zhankai"
							color={'#c8c8c8'}
							size={50}
						/>
					</View>
				</View>
				<DqModal
					onMaskClick={this.onShowSel.bind(this, false)}
					onClose={this.onShowSel.bind(this, false)}
					show={isShowSel}
					animation="none"
				>
					<View
						// className={
						// 	'dq-picker__continer'
						// }
						style={{
							width: windowWidth,
							height: windowHeight,
							backgroundColor: '#fff'
						}}
					>
						<View className="dq-picker__show-sel_title-bar">
							<View
								className="dq-picker__show-sel_title-bar__back"
								onClick={this.onShowSel.bind(this, false)}
							>
								<Text>{` `}</Text>
								<IconFont
									name="ic_back"
									size={30}
									style={{ 'margin-top': '2px' }}
								/>
								<Text className="dq-picker__show-sel_title-bar__back__text">
									返回
								</Text>
							</View>
							<View className="dq-picker__show-sel_title-bar__text">
								<Text>{` ${title}`}</Text>
							</View>
							<View
								className="dq-picker__show-sel_title-bar__confirm"
								onClick={this.onSelSure.bind(this)}
							>
								<Text className="dq-picker__show-sel_title-bar__back__text">
									完成
								</Text>
							</View>
						</View>
						<View className="dq-picker__show-sel_title-count">
							<Text className="dq-picker__show-sel_title-count__text">
								{` 最多可选${select_count}项`} (<Text className="dq-picker__show-sel_title-count__text__count">
									{selList.length}
								</Text>/{select_count})
							</Text>
						</View>
						<View className="dq-picker__show-sel_content">
							<View className="dq-picker__show-sel_content_item">
								{selector.map((item, index) => {
									const c = selList.indexOf(index) === -1 ? '' : '--active'
									return (
										<View
											key={'dq-picker-tag-'+index}
											className={'dq-picker__show-sel_content_item_tag' + c}
											onClick={this.onSelItem.bind(this, item, index)}
										>
											<View className="dq-picker__show-sel_content_item_tag_bg">
												<Text
													className={
														'dq-picker__show-sel_content_item_tag_bg__txt' + c
													}
												>
													{item.name}{' '}
												</Text>
											</View>
										</View>
									)
								})}
							</View>
						</View>
					</View>
				</DqModal>
			</View>
		)
	}
}

export default RNTagPicker
