import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import ProtoPicker from './ProtoPicker'
import '../index.scss'
class MenuPicker extends ProtoPicker {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		//初始化多选选项---深拷贝
		this.setState({ selList: this.copyArr(this.props.value) })
	}
	render() {
		const { selList, isShowSel } = this.state
		const { selector, value, name } = this.props
		return (
			<View>
				<View
					className='dq-picker__show-sel'
					onClick={this.onShowSel.bind(this, true)}
				>
					<View className='dq-picker__show-sel__label'>
						{/* value.map((item, index) => {
                      return (<Input name={name} className='col323232' key={index} value={(index != 0 ? ',' : '') + selector[item]} />)
                    }) */}
						{value.length > 0 ? (
							<Input
								name={name}
								className='col323232'
								value={selector.toString()}
							/>
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
					<View
						className='dq-picker__continer__mask'
						onClick={this.onShowSel.bind(this, false)}
					/>
					<View className={'dq-picker__continer__content'}>
						<View className='dq-picker__continer__content__header'>
							<View onClick={this.onShowSel.bind(this, false)}>
								<Text>取消</Text>
							</View>
							<View
								className='dq-picker__continer__content__header__confirm'
								onClick={this.onSelSure.bind(this)}
							>
								<Text>确定</Text>
							</View>
						</View>
						<View className='dq-picker__continer__content__list'>
							{selector.map((item, index) => {
								const c = selList.indexOf(index) === -1 ? '' : '--active'
								return (
									<View
										key={'menu-picker-selector-'+index}
										className='dq-picker__continer__content__list__item'
										onClick={this.onSelItem.bind(this, item, index)}
									>
										<View
											className={
												'dq-picker__continer__content__list__item__text' + c
											}
										>
											<Text>{item}</Text>
										</View>
										<View />
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

export default MenuPicker
