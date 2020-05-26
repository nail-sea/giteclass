import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  TitleBar,
  DqForm,
  DqFormItem,
  FormInput,
  FormTextarea,
  FormImagePicker,
  FormButton
} from "@/components";
import { connect } from "@tarojs/redux";
import { stdConfig, getPlatform} from "@/utils/common";
import PublishType from "../component/publish_type/index";
import ClassSticky from '../component/sticky'
import ClassClause from '../component/clause'
import ReleasePayCommon  from '../component/releasePayCommon'
import decorator from "@/config/decorator";
import {getWindowHeight, pxToPt} from '@/utils/style'
import "./index.scss";
import display from "@/utils/display";

const CTITLE = "发布寻人寻物";
const CNAME = 'wantedAny'

@connect(({ publish }) => ({
  ...publish
}))
@decorator({ needLogin: true })
class Index extends Component {
  config = {
    navigationBarTitleText: CTITLE,
    disableScroll: true
  };

  state = {
    post_id: '',
    clauseCheck: true,
    classification: [],
    classification_value: 1,//发布类别
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch({
      type: "publish/saveTop",
      payload: { status: 1, index: "", key: "", value: "" }
    });

    await stdConfig.sendConfig();
    this.setState({
      classification: stdConfig.getData(CNAME, 'second_category')
    });

    const { classification_value } = this.$router.params
    if (classification_value) {
      this.setState({ classification_value: 2 })
    }
  }

  validateRules = [
    { name: 'title', rules: [{ required: true, message: '请输入标题' },{ rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
    { name: 'describe', rules: [{ required: true, message: '请输入描述' },{ rule: value => value.length <= 100, message: '个人描述最多可输入100个字' },] },
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

    // let result = await Taro.showModal({
    //   content: '发布的信息将无法修改,请确认填写正确',
    //   confirmColor : '#F87C6A'
    // })
    // if (result.confirm) {
      const {
        title,
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
            extend: {}
          }
          this.releasePay.wrappedInstance.releasePayCommon(data, CNAME)
          return Promise.reject()
          // return this.props.dispatch({
          //   type: 'publish/publish',
          //   payload: { ...data }
          // })
        })
        // .then(post_id => {
        //   this.setState({
        //     post_id
        //   })
        // })
        .catch(err => {
          return Promise.reject(err)
        })
        .finally(() => {
          Taro.hideLoading()
        })
    // }
  }

  render() {
    const {
      clauseCheck,
      post_id,
      classification_value,
      classification
    } = this.state;
    const { top,userInfo:{uname, mobile} } = this.props;

    return (
      <View className="release-wanted">
        <TitleBar title="发布寻人寻物" />
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
            <FormInput
              name="title"
              placeholder="请输入标题信息"
              maxLength={16}
            />
          </DqFormItem>

          <DqFormItem label="描述" mode="textarea" required>
            <FormTextarea
              name="describe"
              placeholder="请详细描述你的信息，100字以内"
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
    );
  }
}
export default Index;
