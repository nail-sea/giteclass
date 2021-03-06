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
  FormButton
} from "@/components";
import ClassSticky from "../component/sticky";
import ClassClause from "../component/clause";
import ReleasePayCommon  from '../component/releasePayCommon'
import { connect } from "@tarojs/redux";
import { stdConfig , getPlatform} from "@/utils/common";
import decorator from "@/config/decorator";
import { getWindowHeight, pxToPt} from '@/utils/style'
import ENUM from '@/config/enum'
import Dq from '@/config/Dq'
import "./index.scss";
import display from "@/utils/display";


const CNAME = "localService";
const CTITLE = "发布本地服务";

@connect(({ publish,user }) => ({
  ...publish,...user
}))
@decorator({ needLogin: true })
class Index extends Component {
  config = {
    navigationBarTitleText: CTITLE,
    disableScroll:true
  };

  state = {
    classification_arr: [],
    post_id: "",
    clauseCheck: true,
  };

  static defaultProps = {
    userInfo: {}
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch({
      type: "publish/saveTop",
      payload: { status: 1, index: "", key: "", value: "" }
    });

    await stdConfig.sendConfig();
    this.setState({
      classification_arr: stdConfig
        .getData(CNAME, "second_category")
        .map(({ name, value }) => ({ label: name, value }))
    });
  }

  validateRules = [
    {
      name: "title",
      rules: [
        { required: true, message: "请输入标题" },
        { rule: value => value.length <= 10, message: "姓名最多可输入10个字" }
      ]
    },
    {
      name: "describe",
      rules: [
        { required: true, message: "请输入描述" },
        {
          rule: value => value.length <= 100,
          message: "描述最多可输入100个字"
        }
      ]
    },
    {
      name: "classification",
      rules: [{ required: true, message: "请选择分类" }]
    },
    {
      name: "contact_name",
     
    
      rules: [
        { required: true, message: "请输入联系人姓名" },
        { rule: value => value.length <= 10, message: "联系人最多可输入10个字" }
      ]
    },
    {
      name: "contact_phone",
      rules: [
        { required: true, message: "请输入联系人电话" }, 
        {type: 'phone', message: '联系人电话格式不正确'}
      ]
    }
  ];

  onClauseChange = () => {
    this.setState({ clauseCheck: !this.state.clauseCheck });
  };

  handlePublish = async (err, datas) => {
    if (err) {
      Taro.showToast({
        title: err.errMsg,
        icon: "none",
        duration: 2000
      });
      return false;
    }

    if (!this.state.clauseCheck) {
      Taro.showToast({
        title: "请阅读，并同意发布须知",
        icon: "none",
        duration: 2000
      });
      return Promise.reject();
    }
    
    const {
      classification,
      title,
      describe,
      contact_name,
      contact_phone,
      images
    } = datas.values;
    const { top_status, top_day, top_total_money } = this.props.top;
    Taro.showLoading({
      title: "提交中",
      mask: true
    });
    return ( Promise.resolve([]))
      .then(() => {
        const image_ids = !images || images.length === 0 ? '': images.map((image) => image.img_id)
        let data = {
          primary_category: CNAME,
          second_category: classification,
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
        };
        this.releasePay.wrappedInstance.releasePayCommon(data, CNAME)
        return Promise.reject()
      })
      .catch(err => {
        return Promise.reject(err);
      })
      .finally(() => {
        Taro.hideLoading();
      });
      
  };

  render() {
    const { classification_arr, clauseCheck, post_id } = this.state;
    const { top,userInfo:{ mobile, uname} } = this.props;

    return (
      <View className="release-recruit">
        <TitleBar title={CTITLE} />
        {/* <PayForModal show /> */}
        <DqForm 
          onSubmit={this.handlePublish} 
          validate={this.validateRules}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
        >
          <DqFormItem label="标题" required>
            <FormInput name="title" placeholder="请输入标题" maxLength={16}  />
          </DqFormItem>
          <DqFormItem label="描述" mode="textarea" required>
            <FormTextarea
              name="describe"
              maxLength={100}
              placeholder="请详细描述你的信息，100字以内"
            />
          </DqFormItem>
          <DqFormItem label="分类" arrow="horizontal" required>
            <FormPicker
              name="classification"
              range={classification_arr}
              col={1}
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image">
            <FormImagePicker
              name="images"
              max={9}
              describe="（选填，最多9张，小于2M）"
            />
          </DqFormItem>
          <DqFormItem label="联系人" required>
            <FormInput name="contact_name" defaultValue={uname} placeholder="请填写联系人" />
          </DqFormItem>
          <DqFormItem label="手机号码" required>
            <FormInput
              name="contact_phone"
              type="number"
              maxLength={11}
              placeholder="请填写手机号码"
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
