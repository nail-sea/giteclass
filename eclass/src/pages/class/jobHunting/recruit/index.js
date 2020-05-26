import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  TitleBar, 
  DqForm,
  DqFormItem,
  FormInput,
  FormTextarea,
  FormImagePicker,
  FormPicker,
  FormTagPicker,
  FormButton
} from "@/components";
import ClassSticky from '../../component/sticky'
import ClassClause from '../../component/clause'
import ReleasePayCommon  from '../../component/releasePayCommon'
import { connect } from "@tarojs/redux";
import { stdConfig, getPlatform} from "@/utils/common";
import ENUM from "@/config/enum";
import decorator from "@/config/decorator";
import { getWindowHeight, pxToPt} from '@/utils/style'

import "./index.scss";
import display from "@/utils/display";


const CTITLE = "我要招人";
const CNAME = "jobHunting";

@connect(({ publish }) => ({
  ...publish
}))
@decorator({ needLogin: true })
class Index extends Component {
  config = {
    navigationBarTitleText: CTITLE,
    disableScroll: getPlatform().isRN
  };

  state = {
    specification_range: ENUM.SPECIFICATION.map(({ name }, index) => ({ label: name, value: index })),
    sex_range: ENUM.POST_SEX.map(({ name, key }) => ({ label: name === '保密'?'不限':name , value: key })),
    post_id: "",
    clauseCheck: true,
    positionArr: [],
    salaryArr: [],
    labelArr: []
  };

  async componentDidMount() {
    const { dispatch } = this.props;

    this.setState({
      positionArr: stdConfig.getData(CNAME, "position").map(({ name, value }) => ({ label: name, value })),
      salaryArr: stdConfig.getData(CNAME, "salary").map(({ name, value }) => ({ label: name, value })),
      labelArr: stdConfig.getData(CNAME, "label").map(({ name, value }) => ({ label: name, value }))
    });

    await dispatch({
      type: "publish/saveTop",
      payload: { status: ENUM.NOTOPSTATUS, index: "", key: "", value: "" }
    });
  }

  validateRules = [
    { name: 'title', rules: [{ required: true, message: '请输入标题' }, { rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
    { name: 'specification', rules: [{ required: true, message: '请选择工作性质' }] },
    { name: 'position', rules: [{ required: true, message: '请选择招聘职位' }] },
    { name: 'salary', rules: [{ required: true, message: '请选择薪资' }] },
    { name: 'sex', rules: [{ required: true, message: '请选择应聘者的性别' }] },
    { name: 'describe', rules: [{ required: true, message: '请输入职位描述' },{ rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
    { name: 'label', rules: [{ required: true, message: '请选择职位福利' }] },
    { name: 'contact_name', rules: [{ required: true, message: '请输入联系人姓名' },{ rule: value => value.length <= 10, message: '联系人最多可输入10个字' }] },
    { name: 'contact_phone', rules: [{ required: true, message: '请输入联系人电话' }, { type: 'phone', message: '手机号码格式不正确' }] }
  ]

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
    //   content: "发布的信息将无法修改,请确认填写正确",
    //   confirmColor : '#F87C6A'
    // });
    // if (result.confirm) {
      const {
        specification,
        title,
        position,
        salary,
        sex,
        describe,
        label,
        contact_name,
        contact_phone,
        images
      } = datas.values;
      const { top_status, top_day, top_total_money } = this.props.top;
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
            second_category: 1,
            describe,
            contact_name,
            contact_phone,
            image_id: image_ids.toString(),
            top_status,
            top_day,
            top_total_money,
            __location: 1,
            extend: {
              position: position.toString(),
              salary,
              specification,
              label: label.toString(),
              sex
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
      positionArr,
      labelArr,
      salaryArr,
      specification_range,
      sex_range,
      post_id,
      clauseCheck
    } = this.state;
    const { top,userInfo:{uname, mobile} } = this.props
    return (
      <View className="release-recruit">
        <TitleBar title={CTITLE} />
        <DqForm 
          onSubmit={this.handlePublish} 
          validate={this.validateRules}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
        >
          <DqFormItem label="标题" required>
            <FormInput
              name="title"
              placeholder="请填写标题"
              maxLength={16}
            />
          </DqFormItem>
          <DqFormItem label="工作性质" arrow="horizontal" required>
            <FormPicker
              name="specification"
              range={specification_range}
            />
          </DqFormItem>
          <DqFormItem label="招聘职位" arrow="horizontal" required>
            <FormTagPicker
              name="position"
              range={positionArr}
              max={3}
            />
          </DqFormItem>
          <DqFormItem label="薪资" arrow="horizontal" required>
            <FormPicker
              name="salary"
              range={salaryArr}
            />
          </DqFormItem>
          <DqFormItem label="性别" arrow="horizontal" required>
            <FormPicker
              name="sex"
              range={sex_range}
            />
          </DqFormItem>
          <DqFormItem label="职位描述" mode="textarea" required>
            <FormTextarea
              name="describe"
              placeholder="请输入职位描述，100字以内"
              maxLength={100}
            />
          </DqFormItem>
          <DqFormItem label="职位福利" arrow="horizontal" required>
            <FormTagPicker
              name="label"
              range={labelArr}
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image">
            <FormImagePicker
              name="images"
              label="添加照片"
              describe="（选填，最多9张，小于2M）"
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
              maxLength={11}
              defaultValue={mobile} 
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