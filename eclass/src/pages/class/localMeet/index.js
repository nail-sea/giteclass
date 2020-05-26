import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
	TitleBar,
	DqForm,
	DqFormItem,
	FormInput,
	FormTextarea,
	FormImagePicker,
	FormDatePicker,
	FormRadio,
	FormRadioExtra,
	FormButton,
	FormTagPicker
} from '@/components'
import ClassSticky from '../component/sticky'
import ClassClause from '../component/clause'
import ReleasePayCommon  from '../component/releasePayCommon'
import PublishType from '../component/publish_type/index'
import { connect } from '@tarojs/redux'
import { stdConfig, getPlatform } from '@/utils/common'
import decorator from '@/config/decorator'
import times from '@/utils/times'
import { getWindowHeight, pxToPt } from '@/utils/style'

import './index.scss'
import display from '@/utils/display'

const CNAME = 'localMeet'
const CTITLE = '发布同城聚会'
const NAME = 'dq-form-continer'

@connect(({ publish, user }) => ({
	...publish,
	user
}))
@decorator({ needLogin: true })
class Index extends Component {
	config = {
		navigationBarTitleText: CTITLE,
		disableScroll: true
	}

	state = {
		post_id: '',
		clauseCheck: true,
		start_time_start: times.getFormatData('yyyy-MM-dd'),
		end_time_start: times.getFormatData('yyyy-MM-dd'),
		classification: [],
		advantage_arr: [],
		classification_value: 1 //发布类别
	}

	static defaultProps = {
		userInfo: {}
	}

	async componentDidMount() {
		const { dispatch } = this.props
		await dispatch({
			type: 'publish/saveTop',
			payload: { status: 1, index: '', key: '', value: '' }
		})
		// await dispatch({
		//   type: 'publish/fetchPublishHire',
		//   payload: {},
		// })
		// await stdConfig.sendToken();
		// await stdConfig.sendConfig();
		this.setState({
			classification: stdConfig.getData(CNAME, 'second_category'),
			advantage_arr: stdConfig
				.getData(CNAME, 'advantage')
				.map(({ name, value }) => ({ label: name, value }))
		})
		const { classification_value } = this.$router.params
		if (classification_value) {
			this.setState({ classification_value: 2 })
		}
	}

	validateRules = [
		{
			name: 'title',
			rules: [
				{ required: true, message: '请输入标题' },
				{ rule: (value) => value.length <= 10, message: '标题最多可输入10个字' }
			]
		},
		{ name: 'start_time', rules: [ { required: true, message: '请填写开始时间' } ] },
		{ name: 'end_time', rules: [ { required: true, message: '请填写结束时间' } ] },
		{
			name: 'describe',
			rules: [
				{ required: true, message: '请输入聚会描述' },
				{ rule: (value) => value.length <= 100, message: '聚会描述最多可输入100个字' }
			]
		},
		{
			name: 'contact_name',
			rules: [
				{ required: true, message: '请输入联系人姓名' },
				{ rule: (value) => value.length <= 10, message: '联系人最多可输入10个字' }
			]
		},
		{
			name: 'contact_phone',
			rules: [
				{ required: true, message: '请输入联系人电话' },
				{ type: 'phone', message: '手机号码格式不正确' }
			]
		}
	]

	onClauseChange = () => {
		this.setState({ clauseCheck: !this.state.clauseCheck })
	}

	// onStartTimeChange = (start_time) => {
	// 	this.setState({ end_time_start: start_time })
	// }

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
			title,
			advantage,
			describe,
			contact_name,
			contact_phone,
			images,
			sex,
			start_time,
			end_time,
			price
		} = datas.values
		if (new Date(start_time).getTime() - new Date(end_time).getTime() > 0) {
			Taro.showToast({
				title: '结束时间不得早于开始时间',
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

		const { classification_value } = this.state
			const { top_status, top_day, top_total_money } = this.props.top
			Taro.showLoading({
				title: '提交中',
				mask: true
			})
			return (
				// !images || images.length === 0
				// ? 
				Promise.resolve([])
				// : display.uploadImage({ files: images })
				)
				.then(() => {
					const image_ids = !images || images.length === 0 ? '': images.map((image) => image.img_id)

					let data = {
						primary_category: CNAME,
						second_category: classification_value,
						title,
						describe,
						contact_name,
						contact_phone,
						image_id: image_ids.toString(),
						top_status,
						top_day,
						top_total_money,
						__location: 1,
						extend: {
							start_time, //
							end_time, //
							sex, //
							advantage: advantage.toString(),
							price:price.length <= 0 ? "0" :price
						}
					}
					this.releasePay.wrappedInstance.releasePayCommon(data, CNAME)
        			return Promise.reject()
				})
				.catch((err) => {
					return Promise.reject(err)
				})
				.finally(() => {
					Taro.hideLoading()
				})
	}

	handleInputForm = (key, value) => {
		this.setState({ [key]: value })
	}

	render() {
		const {
			clauseCheck,
			post_id,
			start_time_start,
			end_time_start,
			classification,
			advantage_arr
		} = this.state
		const { classification_value } = this.state
		const { top ,userInfo:{ mobile, uname} } = this.props

		return (
			<View className="release-recruit">
				<TitleBar title={CTITLE} />
				<DqForm 
					onSubmit={this.handlePublish} 
					validate={this.validateRules}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
				>
				<DqFormItem mode="double" hideLabel>
					<PublishType
						name="classification_value"
						value={classification_value}
						typeList={classification}
						getCurrentType={this.handleInputForm.bind(
							this,
							'classification_value'
						)}
					/>
				</DqFormItem>
					<DqFormItem label="标题" required>
						<FormInput name="title" placeholder="请输入信息标题" maxLength={16} />
					</DqFormItem>

					<DqFormItem label="开始时间" arrow="horizontal" required>
						<FormDatePicker
							name="start_time"
							start={times.getFormatData('yyyy-MM-dd')}
							// onChange={this.onStartTimeChange}
						/>
					</DqFormItem>
					<DqFormItem label="结束时间" arrow="horizontal" required>
						<FormDatePicker
							name="end_time"
							start={times.getFormatData('yyyy-MM-dd')}
						/>
					</DqFormItem>
					<DqFormItem label="选择性别" row>
						<FormRadio label="男" value={1} name="sex" />
						<FormRadio label="女" value={2} name="sex" />
						<FormRadio label="不限" value={3} name="sex" selected = {true}/>
					</DqFormItem>
					<DqFormItem label="人均消费" row required>
						<FormRadioExtra
							name="price"
							radioProps={{ value: '', label: '面议' }}
							extraFlex={2}
							extProps={{ placeholder: '请输入', extra: '/元', maxLength: 10 }}
							extraType="input"
							defaultValue=""
						/>
					</DqFormItem>
					<DqFormItem label="选择标签" arrow="horizontal">
						<FormTagPicker name="advantage" range={advantage_arr} max={3} />
					</DqFormItem>
					<DqFormItem label="描述" mode="textarea" required>
						<FormTextarea
							name="describe"
							maxLength={100}
							placeholder="请输入聚会描述，100字以内"
						/>
					</DqFormItem>
					<DqFormItem hideLabel mode="image">
						<FormImagePicker name="images" max={9} describe="（选填，最多9张，小于2M）" />
					</DqFormItem>
					<DqFormItem label="联系人" required>
						<FormInput name="contact_name" defaultValue={uname} placeholder="请填写联系人" />
					</DqFormItem>
					<DqFormItem label="手机号码" required>
						<FormInput
							name="contact_phone"
							type="number"
							maxLength={11}
							defaultValue={mobile} 
							placeholder="请填写手机号码"
						/>
					</DqFormItem>
					<ClassSticky top={top} post_id={post_id} />
					<ClassClause checked={clauseCheck} onChange={this.onClauseChange} />
					<FormButton label="立即提交" />
					<ReleasePayCommon ref={ref => this.releasePay = ref}/>

				</DqForm>
			</View>
		)
	}
}
export default Index
