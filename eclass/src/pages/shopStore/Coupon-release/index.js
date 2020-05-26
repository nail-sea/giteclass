import Taro, { Component } from "@tarojs/taro";
import { View, Text, Form, Picker } from "@tarojs/components";
import {
	TitleBar,
	DqForm,
	DqFormItem,
	FormInput,
	FormTextarea,
	FormImagePicker,
	FormDatePicker,
	FormPicker,
	FormRadio,
	FormRadioExtra,
	FormButton
} from '@/components'
import ClassClause from '@/pages/class/component/clause'
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import times from '@/utils/times'


import "./index.scss";

const CTITLE = "优惠券发布";
const NAME = "dq-form-continer";

@connect(({ shopStore, user }) => ({
	...shopStore,
	...user
}))
@decorator({ needLogin: true })
class Index extends Component {
	config = {
		navigationBarTitleText: CTITLE
	};

	state = {
		clauseCheck: true,
	}

	static defaultProps = {
		userInfo: {}
	};

	validateRules = [
		{ name: 'coupon_price', rules: [{ required: true, message: '请输入优惠券面值' }] },
		{ name: 'price', rules: [{ required: true, message: '请输入优惠后的价格' }] },
		// { name: 'discount_price', rules: [{ required: true, message: '请输入划线价格' }] },
		{ name: 'total_num', rules: [{ required: true, message: '请输入券包总数' }, { rule: value => value >= 1, message: '券包总数不能少于1个' }, { rule: value => value <= 1000, message: '券包总数不能超过1000' }, { rule: value => /^\d+$/.test(value), message: '券包总数只能输入整数' }] },
		{ name: 'end_time', rules: [{ required: true, message: '请选择结束时间' }] },
		{ name: 'use_end_time', rules: [{ required: true, message: '请选择使用截止时间' }] },
	]

	async componentDidMount() {
		const { dispatch, myStore } = this.props;
		const { shop_id } = this.$router.params;
		if(!myStore || !myStore.id){
			await dispatch({
				type: "shopStore/shopStatistics",
				payload:{
					shop_id
				}
			})
		}
	}

	// async getUserInfo() {
	// 	let userInfo = await this.props.dispatch({
	// 		type: "user/fetchMyInfo"
	// 	});
	// 	if (userInfo) {
	// 		const { is_shop } = userInfo;
	// 		if (is_shop) {
	// 		}
	// 	}
	// }

	onClauseChange = () => {
		this.setState({ clauseCheck: !this.state.clauseCheck })
	}

	handlePublish = async (err, datas) => {
		if (err) {
			Taro.showToast({
				title: err.errMsg,
				icon: 'none',
				duration: 2000
			})
			return false
		}
		const {
			coupon_price,
			price,
			discount_price,
			end_time,
			total_num,
			use_end_time,
			use_meet_price
		} = datas.values
		if (new Date(end_time).getTime() - new Date(use_end_time).getTime() > 0) {
			Taro.showToast({
				title: '结束时间不得早于使用截止时间',
				icon: 'none',
				duration: 2000
			})
			return Promise.reject()
		}
		if (!this.state.clauseCheck) {
			Taro.showToast({
				title: '请阅读，并同意发布须知',
				icon: 'none',
				duration: 2000
			})
			return Promise.reject()
		}

		let result = await Taro.showModal({
			content: "发布的信息将无法修改,请确认填写正确",
			confirmColor : '#F87C6A'
		});
		if (result.confirm) {
			const { myStore } = this.props;
			Taro.showLoading({
				title: '提交中',
				mask: true
			})

			let data = {
				shop_id: myStore.id,
				agent_uid: myStore.agent_uid,
				coupon_price,
				price,
				discount_price,
				end_time,
				total_num,
				use_end_time,
				use_meet_price
			}
			
			this.props.dispatch({
				type: 'shopStore/publishCoupon',
				payload: { ...data }
			})
				.catch(err => {
					return Promise.reject(err)
				})
				.finally(() => {
					Taro.hideLoading()
				})
		}
		return Promise.reject()
	}

	render() {
		const {
			clauseCheck
		} = this.state
		const { top } = this.props;

		return (
			<View className="release-recruit">
				<TitleBar title={CTITLE} />
				<DqForm onSubmit={this.handlePublish} validate={this.validateRules}>
					<DqFormItem label="优惠券面值" row>
						<FormInput
							name="coupon_price"
							type="number"
							placeholder="请输入优惠券面值"
							maxLength={4}
						/>
						<Text className="form-word-unit">/元</Text>
					</DqFormItem>
					<DqFormItem label="价格" row>
						<FormInput
							name="price"
							type="number"
							placeholder="请输入优惠后的价格"
							maxLength={4}
						/>
						<Text className="form-word-unit">/元</Text>
					</DqFormItem>
					<DqFormItem label="划线价格" row>
						<FormInput
							name="discount_price"
							type="number"
							placeholder="（选填）"
							maxLength={4}
						/>
						<Text className="form-word-unit">/元</Text>
					</DqFormItem>

					<DqFormItem label="结束时间" arrow="horizontal">
						<FormDatePicker
							name="end_time"
							start={times.getFormatData('yyyy-MM-dd')}
						/>
					</DqFormItem>
					<DqFormItem label="券包总数" row>
						<FormInput
							name="total_num"
							type="number"
							placeholder="请输入"
							maxLength={4}
						/>
						<Text className="form-word-unit">/个</Text>
					</DqFormItem>
					<DqFormItem label="使用截止时间" labelWidth={6} arrow="horizontal">
						<FormDatePicker
							name="use_end_time"
							start={times.getFormatData('yyyy-MM-dd')}
						/>
					</DqFormItem>
					<DqFormItem label="符合条件可使用" labelWidth={7}>
						<FormRadioExtra
							name="use_meet_price"
							radioProps={{ value: '', label: '不限' }}
							extProps={{ placeholder: '请输入', extra: '/元', maxLength: 4 , textAlign:'right'}}
							extraType="input"
							extraFlex={8}
							defaultValue=""
						/>
					</DqFormItem>
					<ClassClause checked={clauseCheck} onChange={this.onClauseChange} />
					<FormButton label="立即提交" />
				</DqForm>
			</View>
		);
	}
}
export default Index;