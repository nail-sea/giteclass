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
import { getWindowHeight, pxToPt } from '@/utils/style'
import './index.scss'

const CNAME = 'secondHand'
const CTITLE = '发布二手物品'
const NAME = 'dq-form-continer'

@connect(({ publish }) => ({
	...publish
}))
@decorator({ needLogin: true })
class SecondHand extends Component {
	constructor(props) {
		super(props)
	}
	config = {
		navigationBarTitleText: CTITLE,
		disableScroll: true
	}

	state = {
		form: {},
		classification: [],
		classification_value: 1, //发布类别
		category_arr: [],
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
			category_arr: stdConfig.getData(CNAME, 'category').map(({ name, value }) => ({ label: name, value })),
			advantage_arr: stdConfig.getData(CNAME, 'advantage').map(({ name, value }) => ({ label: name, value }))
		})

		const { classification_value } = this.$router.params
		if (classification_value) {
			this.setState({ classification_value: 2 })
		}
	}

	validateRules = [
		{ name: 'title', rules: [{ required: true, message: '请输入标题' },{ rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
		{ name: 'category', rules: [{ required: true, message: '请选择物品分类' }] },
		// { name: 'advantage', rules: [{ required: true, message: '请选择物品优点' }] },
		{ name: 'describe', rules: [{ required: true, message: '请输入描述' },{ rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
		{ name: 'contact_name', rules: [{ required: true, message: '请输入联系人姓名' },{ rule: value => value.length <= 10, message: '联系人最多可输入10个字' }] },
		{ name: 'contact_phone', rules: [{ required: true, message: '请输入联系人电话' }, {type: 'phone', message: '联系人电话格式不正确'}] }
	]

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
				category,
				advantage,
				describe,
				price,
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
							price,
							category: category,
							advantage: advantage.toString()
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
	
	}

	render() {
		const {
			category_arr,
			advantage_arr,
			clauseCheck,
			classification,
			classification_value,
			post_id
		} = this.state
		const { top,userInfo:{uname, mobile} } = this.props

		return (
			<View className="release-hand">
				<TitleBar title="发布二手物品" />
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
							placeholder="请填写标题"
							maxLength={16}
						/>
					</DqFormItem>
					<DqFormItem label="分类" arrow="horizontal" required>
						<FormPicker
							name="category"
							range={category_arr}
							col={1}
						/>
					</DqFormItem>
					<DqFormItem label="价格" required>
						<FormRadioExtra
							name="price"
							radioProps={{ value: '', label: '不限' }}
							extProps={{ placeholder: '请输入', extra: '/元', maxLength: 10,type:"number" }}
							extraType="input"
							extraFlex={2}
							
							defaultValue=""
						/>
					</DqFormItem>
					<DqFormItem label="物品优点" arrow="horizontal">
						<FormTagPicker
							name="advantage"
							range={advantage_arr}
							max={3}
						/>
					</DqFormItem>
					<DqFormItem label="描述" mode="textarea" required>
						<FormTextarea
							name="describe"
							placeholder={'请简要说明物品名称、参数、价格等信息\n为了保护隐私，请不要随意填写手机号或QQ，100字以内'}
							maxLength={100}
						/>
					</DqFormItem>
					<DqFormItem hideLabel mode="image">
						<FormImagePicker
							name="images"
							max={9}
							describe="（选填，最多9张，小于2M）"
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
export default SecondHand;