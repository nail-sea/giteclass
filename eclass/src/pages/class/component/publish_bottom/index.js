import Taro, { PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { DqInput } from '@/components'
import IconFont from '@/components/iconfont'
import { connect } from '@tarojs/redux'
import ENUM from '@/config/enum'
import './index.scss'
import { formatStyle } from '@/utils/style'
import Dq from "@/config/Dq";

@connect(({ publish }) => ({
	...publish
}))
class PublishBottom extends PureComponent {
	state = {
		contact_name: '', //联系人
		contact_phone: '', //手机号

		clauseCheck: true
	}

	componentDidMount() {
		this.props.dispatch({
			type: 'publish/getValue',
			payload: {
				clauseCheck: true
			}
		})
	}

	handleInputForm(key, value) {
		this.setState({ [key]: value })
		this.props.dispatch({
			type: 'publish/getValue',
			payload: {
				[key]: value
			}
		})
	}

	handleChangeClause() {
		this.setState({
			clauseCheck: !this.state.clauseCheck
		})
		this.clauseCheck()
	}

	clauseCheck() {
		this.props.dispatch({
			type: 'publish/getValue',
			payload: {
				clauseCheck: !this.state.clauseCheck
			}
		})
	}

	gotoTop(post_id) {
		//置顶
		Dq.navigateTo({
			url: `/pages/release/top/index?post_id=${post_id}`
		})
	}

	gotoNotice() {
		//发布须知
		Dq.navigateTo({
			url: '/pages/release/notice/index'
		})
	}

	render() {
		const { contact_name, contact_phone, clauseCheck } = this.state
		const { top } = this.props

		return (
			<View>
				<View className="dq-form-continer__item">
					<Text className="dq-form-continer__item__label">联系人</Text>
					<View className="dq-form-continer__item__content">
						<DqInput
							name="contact_name"
							placeholder="请填写联系人"
							value={contact_name}
							inputStyleDq={formatStyle({ 'padding-right': '34px' })}
							styleType="-style2"
							onInput={this.handleInputForm.bind(this, 'contact_name')}
						/>
					</View>
				</View>
				<View className="dq-form-continer__item">
					<Text className="dq-form-continer__item__label">手机号码</Text>
					<View className="dq-form-continer__item__content">
						<DqInput
							name="contact_phone"
							placeholder="请填写11位手机号码"
							type="number"
							maxLength={11}
							value={contact_phone}
							styleType="-style2"
							inputStyleDq={formatStyle({ 'padding-right': '34px' })}
							onInput={this.handleInputForm.bind(this, 'contact_phone')}
						/>
					</View>
				</View>
				<View className="dq-form-continer__item">
					<Text className="dq-form-continer__item__label">信息置顶</Text>
					<View className="dq-form-continer__item__content">
						<View
							className="dq-form-container__item__content__top"
							onClick={() => this.gotoTop()}
						>
							<View className="dq-form-container__item__content__top__view">
								{top.top_status >= ENUM.TOPSTATUS ? (
									<View className="dq-form-container__item__content__top__view__view">
										<Text className="dq-form-container__item__content__top__view__view__text">
											{`置顶${top.top_day}天  ¥${top.top_total_money}`}
										</Text>
									</View>
								) : (
									<Text className="txt"> 选择后信息将显示在最顶部</Text>
								)}
							</View>
							<IconFont name="ic_zhankai" color={'#c8c8c8'} size={50} />
						</View>
					</View>
				</View>
				<View className="dq-form-continer__clause">
					<View>
						<Text>发布条款</Text>
					</View>
					<View className="dq-form-continer__clause__check">
						<View
							className="dq-form-continer__clause__check__view"
							onClick={this.handleChangeClause.bind(this)}
						>
							<IconFont
								name="duihao_selected"
								color={clauseCheck ? '#F87C6A' : '#bbb'}
								size={40}
							/>
							<Text className="dq-form-continer__clause__check__view__txt">
								已阅读，并同意
							</Text>
						</View>
						<Text
							className="dq-form-continer__clause__btn"
							onClick={this.gotoNotice.bind(this)}
						>
							【发布须知】
						</Text>
						<Text
							className="dq-form-continer__clause__btn"
							onClick={this.gotoNotice.bind(this)}
						>
							【E币服务协议】
						</Text>
					</View>
				</View>
			</View>
		)
	}
}
export default PublishBottom;