import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import ProtoPicker from './ProtoPicker'
import '../index.scss'
class TagPicker extends ProtoPicker {
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
			<View>
				<View
					className='dq-picker__show-sel'
					onClick={this.onShowSel.bind(this, true)}
				>
					<View className='dq-picker__show-sel__label'>
						{value && selector && value.length > 0 && selector.length > 0 ? (
							<View>
								<Text>
									{value.map((item, index) => {
										return (
											<Text>
												{/* key ={index} */}
												{selector[item].name}
												{/* {index + 1 === value.length} */}
												{index + 1 === value.length ? '' : <Text>;</Text>}
											</Text>
										)
									})}
								</Text>
								<Input
									style={{ display: 'none' }}
									name={name}
									className='col323232'
									value={value}
								/>
							</View>
						) : (
							<Text className='colA0A0A0'>请选择</Text>
						)}
					</View>
					<View className='dq-picker__show-sel__icon'>
						<IconFont
							className='dq-form-continer__item__icon'
							name='ic_zhankai'
							color={'#c8c8c8'}
							size={50}
						/>
					</View>
				</View>
				<View
					className={
						isShowSel ? 'dq-picker__continer' : 'dq-picker__continer__none'
					}
				>
					<View className='dq-picker__show-sel_title-bar'>
						<View
							className='dq-picker__show-sel_title-bar__back'
							onClick={this.onShowSel.bind(this, false)}
						>
							<Text>{` `}</Text>
							<IconFont
								name='ic_back'
								size={30}
								style={{ 'margin-top': '2px' }}
							/>
							<Text>返回</Text>
						</View>
						<View className='dq-picker__show-sel_title-bar__text'>
							<Text>{` ${title}`}</Text>
						</View>
						<View
							className='dq-picker__show-sel_title-bar__confirm'
							onClick={this.onSelSure.bind(this)}
						>
							<Text>完成</Text>
						</View>
					</View>

					<View className='dq-picker__show-sel_title-count'>
						<View className='dq-picker__show-sel_title-count__text'>
							<Text>{` 最多可选${select_count}项`} (</Text>
							<Text className='dq-picker__show-sel_title-count__text__count'>
								{selList.length}
							</Text>
							/{select_count})
						</View>
					</View>

					<View className='dq-picker__show-sel_content'>
						<View className='dq-picker__show-sel_content_item'>
							{selector.map((item, index) => {
								const c = selList.indexOf(index) === -1 ? '' : '--active'
								return (
									<View
										key={'dq-picker-selector-'+index}
										className={'dq-picker__show-sel_content_item_tag' + c}
										onClick={this.onSelItem.bind(this, item, index)}
									>
										<View className='dq-picker__show-sel_content_item_tag_bg'>
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
			</View>
		)
	}
}

export default TagPicker
