import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
	TitleBar,
	DqForm,
	DqFormItem,
	FormInput,
	FormTextarea,
	FormImagePicker,
	FormPicker,
	FormTagPicker,
	FormButton,
	FormRadioExtra
} from '@/components'
import ClassSticky from '../component/sticky'
import ClassClause from '../component/clause'
import ReleasePayCommon  from '../component/releasePayCommon'
import { connect } from '@tarojs/redux'
import { stdConfig, getPlatform} from '@/utils/common'
import PublishType from '../component/publish_type/index'
import decorator from '@/config/decorator'
import display from '@/utils/display'
import { getWindowHeight, pxToPt} from '@/utils/style'
import './index.scss'

const CNAME = 'buyRentHouse'
const CTITLE = '发布租房买房'
const NAME = 'dq-form-continer'

@connect(({ publish }) => ({
	...publish
}))
@decorator({ needLogin: true })
class BuyRentHouse extends Component {
	constructor(props) {
		super(props)
	}
	config = {
		navigationBarTitleText: CTITLE,
		disableScroll: getPlatform().isRN
	}

	state = {
		form: {},
		classification: [],
		classification_value: 1, //发布类别
		house_status_arr: [],
		rent_house_status_arr: [],
		finish_status_arr: [],
		advantage_arr: [],
		post_id: '',
		clauseCheck: true,
	}

	async componentDidMount() {
		const { dispatch } = this.props

		await dispatch({
			type: 'publish/saveTop',
			payload: { status: 1, index: '', key: '', value: '' }
		})
		await stdConfig.sendConfig()
		this.setState({
			classification: stdConfig.getData(CNAME, 'second_category'),
			house_status_arr: stdConfig.getData(CNAME, 'house_status').map(({ name, value }) => ({ label: name, value })),
			rent_house_status_arr: stdConfig.getData(CNAME, 'rent_house_status').map(({ name, value }) => ({ label: name, value })),
			finish_status_arr: stdConfig.getData(CNAME, 'finish_status').map(({ name, value }) => ({ label: name, value })),
			advantage_arr: stdConfig.getData(CNAME, 'advantage').map(({ name, value }) => ({ label: name, value }))
		})

		const { classification_value } = this.$router.params
		if (classification_value) {
			this.setState({ classification_value: 2 })
		}
	}

	getValidateRules = () => {
		const { classification_value } = this.state
		if (classification_value == 1 || classification_value == 3) {
			return [
				{ name: 'title', rules: [{ required: true, message: '请输入标题' }, { rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
				{ name: 'house_status', rules: [{ required: true, message: '请选择房源状态' }] },
				{ name: 'area', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'room', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'hall', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'bathroom', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'describe', rules: [{ required: true, message: '请输入房源描述' }, { rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
				{ name: 'contact_name', rules: [{ required: true, message: '请输入联系人姓名' }, { rule: value => value.length <= 10, message: '联系人最多可输入10个字' }] },
				{ name: 'contact_phone', rules: [{ required: true, message: '请输入联系人电话' }, { type: 'phone' ,message:'联系人电话格式不正确'}] }
			]
		}
			return [
				{ name: 'title', rules: [{ required: true, message: '请输入标题' },  { rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
				{ name: 'rent_house_status', rules: [{ required: true, message: '请选择出租方式' }] },
				{ name: 'area', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'room', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'hall', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'bathroom', rules: [{ required: true, message: '请完善面积信息' }] },
				{ name: 'describe', rules: [{ required: true, message: '请输入房源描述' },  { rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
				{ name: 'contact_name', rules: [{ required: true, message: '请输入联系人姓名' },  { rule: value => value.length <= 10, message: '联系人最多可输入10个字' }] },
				{ name: 'contact_phone', rules: [{ required: true, message: '请输入联系人电话' }, { type: 'phone', message: '联系人电话格式不正确' }] }
			]
	}

	handleInputForm = (key, value) => {
		this.setState({ [key]: value });
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
	
			const {
				title,
				house_status,
				rent_house_status,
				advantage,
				finish_status,
				describe,
				price,
				contact_name,
				contact_phone,
				images,
				room,
				hall,
				bathroom,
				area
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
					
					let houseStatus =
						classification_value == 1 || classification_value == 3
							? { house_status }
							: { rent_house_status: rent_house_status.toString() };
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
							...houseStatus,
							finish_status,
							price,
							advantage: advantage ? advantage.toString() : "",
							room,
							hall,
							bathroom,
							area
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
				return Promise.reject()
	}

	render() {
		const {
			house_status_arr,
			rent_house_status_arr,
			finish_status_arr,
			advantage_arr,
			clauseCheck,
			classification,
			classification_value,
			post_id
		} = this.state
		const { top,userInfo:{uname, mobile} } = this.props

		return (
			<View className="release-recruit">
				<TitleBar title="发布租房买房" />
				<DqForm
					onSubmit={this.handlePublish}
					validate={this.getValidateRules()}
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
							placeholder="请填写标题"
							maxLength={16}
						/>
					</DqFormItem>
					{classification_value == 1 || classification_value == 3 ? (
						<DqFormItem label="房源状态" arrow="horizontal" required>
							<FormPicker
								name="house_status"
								range={house_status_arr}
								col={1}
							/>
						</DqFormItem>
					) : (
							<DqFormItem label="出租方式" arrow="horizontal" required>
								<FormPicker
									name="rent_house_status"
									range={rent_house_status_arr}
									defaultValue="9"
								/>
							</DqFormItem>
						)}

					<DqFormItem label={classification_value == 3 || classification_value == 4 ? '期望面积' : '房源面积'} row mode="double" required>
						<FormInput
							name="area"
							placeholder="填写"
							maxLength={10}
							extra="㎡"
							textAlign="right"
							type="number"
						/>
						{/* <Text className="form-word-unit">/m</Text> */}
						<FormInput
							name="room"
							placeholder="填写"
							maxLength={2}
							extra="室"
							textAlign="right"
							type="number"
						/>
						{/* <Text className="form-word-unit">室</Text> */}
						<FormInput
							name="hall"
							placeholder="填写"
							maxLength={2}
							extra="厅"
							textAlign="right"
							type="number"
						/>
						{/* <Text className="form-word-unit">厅</Text> */}
						<FormInput
							name="bathroom"
							placeholder="填写"
							maxLength={2}
							extra="卫"
							textAlign="right"
							type="number"
						/>
						{/* <Text className="form-word-unit">卫</Text> */}
					</DqFormItem>
					<DqFormItem label="房源价格" row required>
						<FormRadioExtra
							name="price"
							radioProps={{ value: '', label: '面议' }}
							extProps={{ placeholder: '请输入', extra: (classification_value == 1 || classification_value == 3 ? '万元' : '/月'), maxLength: 10, type:'number' }}
							extraType="input"
							extraFlex={3}
						/>
					</DqFormItem>
					<DqFormItem label="装修情况（选填）" labelWidth={7} arrow="horizontal">
						<FormPicker
							name="finish_status"
							range={finish_status_arr}
							max={3}
							defaultValue="9"
						/>
					</DqFormItem>
					<DqFormItem label="房源优势（选填）" labelWidth={7} arrow="horizontal">
						<FormTagPicker
							name="advantage"
							range={advantage_arr}
							max={3}
						/>
					</DqFormItem>
					<DqFormItem label="房源描述" mode="textarea" required>
						<FormTextarea
							name="describe"
							placeholder={"在此补充房源交通及周边配套信息\n为了保护隐私，请不要随意填写手机或QQ，100字以内"}
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
							defaultValue={uname} 
							maxLength={10}
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
export default BuyRentHouse;