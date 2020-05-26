import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";
import {
  TitleBar,
  DqForm,
  DqFormItem,
  FormInput,
  FormTextarea,
  FormImagePicker,
  FormDatePicker,
  FormPicker,
  FormTagPicker,
  FormButton
} from "@/components";
import ClassSticky from '../../component/sticky'
import ClassClause from '../../component/clause'
import ReleasePayCommon  from '../../component/releasePayCommon'
import { connect } from "@tarojs/redux";
import { stdConfig, getPlatform} from '@/utils/common'
import ENUM from "@/config/enum";
import decorator from "@/config/decorator";
import times from '@/utils/times'
import { getWindowHeight, pxToPt} from '@/utils/style'

import "./index.scss";
import display from "@/utils/display";

const CTITLE = "我要求职";
const CNAME = "jobHunting";

@connect(({ publish }) => ({
  ...publish
}))
@decorator({ needLogin: true })
class Index extends Component {
  config = {
    navigationBarTitleText: CTITLE,
    disableScroll: getPlatform().isRN,
    
  };

  state = {
    specification_range: ENUM.SPECIFICATION.map(({ name }, index) => ({ label: name, value: index })),
    sex_range: ENUM.POST_SEX.map(({ name, key }) => ({ label: name, value: key })).filter(o => o.value !== 3),
    post_id: "",
    clauseCheck: true,
    positionArr: [],
    salaryArr: []
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      positionArr: stdConfig.getData("jobHunting", "position").map(({ name, value }) => ({ label: name, value })),
      salaryArr: stdConfig.getData("jobHunting", "salary").map(({ name, value }) => ({ label: name, value }))
    });
    await dispatch({
      type: "publish/saveTop",
      payload: { status: ENUM.NOTOPSTATUS, index: "", key: "", value: "" }
    });
  }

  validateRules = [
    { name: 'title', rules: [{ required: true, message: '请输入标题' }, { rule: value => value.length <= 10, message: '标题最多可输入10个字' }] },
    { name: 'specification', rules: [{ required: true, message: '请选择工作性质' }] },
    { name: 'birth', rules: [{ required: true, message: '请选择出生年月' }] },
    { name: 'position', rules: [{ required: true, message: '请选择期望职位' }] },
    { name: 'salary', rules: [{ required: true, message: '请选择薪资' }] },
    { name: 'sex', rules: [{ required: true, message: '请选择您的性别' }] },
    { name: 'describe', rules: [{ required: true, message: '请输入自我介绍' }, { rule: value => value.length <= 100, message: '描述最多可输入100个字' }] },
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
      const {
        specification,
        position,
        salary,
        sex,
        birth,
        describe,
        contact_name,
        contact_phone,
        images,
        title
      } = datas.values;
      const { top_status, top_day, top_total_money } = this.props.top;
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
            title,
            primary_category: "jobHunting",
            second_category: 2,
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
              birth,
              sex
            }
          }
          
          this.releasePay.wrappedInstance.releasePayCommon(data, CNAME)
          return Promise.reject()
        })
        .catch(err => {
          console.error(err);
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
      salaryArr,
      clauseCheck,
      post_id,
      specification_range,
      sex_range
    } = this.state;
    const { top,userInfo:{uname, mobile} } = this.props
    return (
      <View className="release-recruit">
        <TitleBar title="我要求职" />
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
          <DqFormItem label="期望职位" arrow="horizontal" required>
            <FormTagPicker
              name="position"
              range={positionArr}
              max={3}
            />
          </DqFormItem>
          <DqFormItem label="期望薪资" arrow="horizontal" required>
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
          <DqFormItem label="出生年份" arrow="horizontal" required>
            <FormDatePicker
              name="birth"
              mode="date"
              fields="year"
              start="1960-1-1"
              end={times.getFormatData('yyyy-MM-dd')}
              defaultLabel="请选择出生年份"
            />
          </DqFormItem>
          <DqFormItem label="自我介绍" mode="textarea" required>
            <FormTextarea
              name="describe"
              placeholder="请简单介绍你自己，100字以内"
              maxLength={100}
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image" required>
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