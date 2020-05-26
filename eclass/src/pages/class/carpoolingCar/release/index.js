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
	FormTagPicker,
	FormButton,
	FormStepper
} from '@/components'
import ClassSticky from '../../component/sticky'
import ClassClause from '../../component/clause'
import ReleasePayCommon  from '../../component/releasePayCommon'
import { connect } from '@tarojs/redux'
import { stdConfig, getPlatform} from '@/utils/common'
import PublishType from '../../component/publish_type/index'
import decorator from '@/config/decorator'
import times from '@/utils/times'

import './index.scss'
import display from '@/utils/display'
import { getWindowHeight, pxToPt} from '@/utils/style'

const CNAME = 'carpoolingCar'
const CTITLE = '发布拼车租车'

@connect(({ publish }) => ({
	...publish
}))
@decorator({ needLogin: true })
class CarpoolingCar extends Component {
	constructor(props) {
		super(props)
	}
	config = {
		navigationBarTitleText: '发布拼车租车',
		disableScroll: getPlatform().isRN
	}

	state = {
		classification: [],
		classification_value: 1, //发布类别
		advantage_arr_1: [],
		advantage_arr_2: [],
		post_id: '',
		clauseCheck: true,
	}

	async componentDidMount() {
		// Platform.sendAutocomplete([ 'startAddress', 'endAddress' ])
		const { dispatch } = this.props

		await dispatch({
			type: 'publish/saveTop',
			payload: { status: 1, index: '', key: '', value: '' }
		})

		await stdConfig.sendConfig()
		this.setState({
			classification: stdConfig.getData(CNAME, 'second_category'),
			advantage_arr_1: stdConfig.getData(CNAME, 'someone_for_car_advantage').map(({ name, value }) => ({ label: name, value })),
			advantage_arr_2: stdConfig.getData(CNAME, 'car_for_someone_advantage').map(({ name, value }) => ({ label: name, value }))
		})
		const { classification_value } = this.$router.params
		if (classification_value) {
			this.setState({ classification_value: 2 })
		}
	}

	validateRules = [
		{ name: 'title', rules: [{ required: true, message: '请输入标题' },{ rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
		{ name: 'start_address', rules: [{ required: true, message: '请输入出发地址' }, { rule: value => value.length <= 30, message: '出发地址最多可输入30个字' }] },
		{ name: 'end_address', rules: [{ required: true, message: '请输入目的地址' }, { rule: value => value.length <= 30, message: '目的地址最多可输入30个字' }] },
		{ name: 'date', rules: [{ required: true, message: '请选择乘车日期' }] },
		{ name: 'time', rules: [{ required: true, message: '请选择乘车时间' }] },
		{ name: 'member_num', rules: [{ required: true, message: '请输入乘车人数' }] },
		{ name: 'describe', rules: [{ required: true, message: '请输入描述' },{ rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
		{ name: 'contact_name', rules: [{ required: true, message: '请输入联系人姓名' }, { rule: value => value.length <= 10, message: '联系人最多可输入10个字' }] },
		{ name: 'contact_phone', rules: [{ required: true, message: '请输入联系人电话' }, { type: 'phone', message: '手机号码格式不正确' }] }
	]

	handleInputForm = (key, value) => {
		this.setState({ [key]: value });
	}

	handleAddress = (key, e) => {
		// setTimeout(() => {
		// console.log(e.detail.value,'=================')
		this.setState({ [key]: e.detail.value })
		// }, 500)
	}

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
		if (!this.state.clauseCheck) {
			Taro.showToast({
				title: '请阅读，并同意发布须知',
				icon: 'none',
				duration: 2000
			})
			return Promise.reject()
		}

		// let result = await Taro.showModal({
		// 	content: '发布的信息将无法修改,请确认填写正确',
		// 	confirmColor : '#F87C6A'
		// })
		// if (result.confirm) {
			const {
				title,
				start_address,
				end_address,
				member_num,
				date,
				time,
				advantage,
				describe,
				contact_name,
				contact_phone,
				images
			} = datas.values
			const { classification_value } = this.state
			const { top_status, top_day, top_total_money } = this.props.top
			Taro.showLoading({
				title: '提交中',
				mask: true
			})
			return (
				// (!images || images.length === 0) ? 
				Promise.resolve([])
				//  : display.uploadImage({ files: images })
				)
				.then(() => {
					const image_ids = !images || images.length === 0 ? '': images.map((image) => image.img_id)

					let data = {
						title,
						primary_category: CNAME,
						second_category: classification_value,
						describe,
						contact_name,
						contact_phone,
						image_id: image_ids.toString(),
						top_status,
						top_day,
						top_total_money,
						__location: 1,
						extend: {
							start_address: start_address,
							end_address: end_address,
							date: `${date} ${time}`,
							member_num: member_num,
							[classification_value == 1 ? 'someone_for_car_advantage' : 'car_for_someone_advantage']: advantage.toString()
						}
					}
					this.releasePay.wrappedInstance.releasePayCommon(data, CNAME)
          			return Promise.reject()
				})
				.catch(err => {
					return Promise.reject(err)
				})
				.finally(() => {
					Taro.hideLoading()
				})
		// }
		return Promise.reject()

	}

	render() {
		const {
			clauseCheck,
			classification,
			classification_value,
			advantage_arr_1,
			advantage_arr_2,
			post_id
		} = this.state
		const { top,userInfo:{uname, mobile} } = this.props

		return (
			<View className="release-hand">
				<TitleBar title="发布拼车租车" />
				<DqForm 
					onSubmit={this.handlePublish} 
					validate={this.validateRules}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
				>
					<DqFormItem hideLabel mode="double">
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
						<FormInput
							name="title"
							placeholder="请输入标题"
							maxLength={16}
						/>
					</DqFormItem>
					<DqFormItem label="出发地址" required>
						<FormInput
							name="start_address"
							placeholder="请输入出发地址"
							maxLength={30}
						/>
					</DqFormItem>
					<DqFormItem label="目的地址" required>
						<FormInput
							name="end_address"
							placeholder="请输入目的地址"
							maxLength={30}
						/>
					</DqFormItem>
					<DqFormItem label="乘车日期" arrow="horizontal" required>
						<FormDatePicker
							name="date"
							defaultLabel="选择日期"
							start={times.getFormatData('yyyy-MM-dd')}
							end={times.getFormatData('yyyy-MM-dd', 7)}
						/>
					</DqFormItem>
					<DqFormItem label="乘车时间" arrow="horizontal" required>
						<FormDatePicker
							name="time"
							start={times.getFormatData('yyyy-MM-dd')}
							end="23:59"
							defaultLabel="选择时间"
							mode="time"
						/>
					</DqFormItem>
					<DqFormItem label="乘车人数" extra="人" required>
						<FormStepper
							name="member_num"
							max={20}
							min={1}
						/>
					</DqFormItem>
					<DqFormItem label={classification_value == 1 ? '乘车需求' : '乘车要求'} arrow="horizontal">
						<FormTagPicker
							name="advantage"
							range={classification_value == 1 ? advantage_arr_1 : advantage_arr_2}
							defaultLabel="(选填)"
						/>
					</DqFormItem>
					<DqFormItem label="描述" mode="textarea" required>
						<FormTextarea
							name="describe"
							placeholder="请输入乘车描述，100字以内"
							maxLength={100}
						/>
					</DqFormItem>
					<DqFormItem hideLabel mode="image">
						<FormImagePicker
							name="images"
							max={9}
							size={2}
						/>
					</DqFormItem>
					<DqFormItem label="联系人" required>
						<FormInput
							name="contact_name"
							placeholder="请填写联系人"
							maxLength={10}
							defaultValue={uname} 
						/>
					</DqFormItem>
					<DqFormItem label="手机号码" required>
						<FormInput
							name="contact_phone"
							placeholder="请填写手机号码"
							type="number"
							defaultValue={mobile} 
							maxLength={11}
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
export default CarpoolingCar;