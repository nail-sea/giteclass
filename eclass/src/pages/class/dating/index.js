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
  FormRadio,
  FormTagPicker,
  FormButton
} from "@/components";
import ClassSticky from "../component/sticky";
import ClassClause from "../component/clause";
import ReleasePayCommon  from '../component/releasePayCommon'
import { connect } from "@tarojs/redux";
import { stdConfig, getPlatform} from "@/utils/common";
import decorator from "@/config/decorator";
import { getWindowHeight, pxToPt} from '@/utils/style'
import times from '@/utils/times'

import "./index.scss";
import display from "@/utils/display";

const CNAME = "dating";
const CTITLE = "发布征婚交友";

@connect(({ publish, user }) => ({
  ...publish,
  user
}))
@decorator({ needLogin: true })
class Dating extends Component {
  config = {
    navigationBarTitleText: CTITLE,
		disableScroll: getPlatform().isRN
  };

  state = {
    education_arr: [],
    advantage_arr: [],
    intention_arr: [],
    post_id: "",
    clauseCheck: true,
    sexShow: 1
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
    // await dispatch({
    //   type: 'publish/fetchPublishHire',
    //   payload: {},
    // })
    // await stdConfig.sendToken();
    await stdConfig.sendConfig();
    this.setState({
      education_arr: stdConfig
        .getData(CNAME, "education")
        .map(({ name, value }) => ({ label: name, value })),
      advantage_arr: stdConfig
        .getData(CNAME, "advantage")
        .map(({ name, value }) => ({ label: name, value })),
      intention_arr: stdConfig
        .getData(CNAME, "intention")
        .map(({ name, value }) => ({ label: name, value }))
    });
  }

  getValidateRules = () => {
    const { sexShow } = this.state
    const messageA = sexShow == 1 ? '请选择交友意向' : '请选择专属标签'
    const messageI = sexShow == 1 ? '请选择专属标签' : '请选择交友意向'
    return [
      {
        name: "title",
        rules: [
          { required: true, message: "请输入姓名" },
          { rule: value => value.length <= 10, message: "姓名最多可输入10个字" }
        ]
      },
      {
        name: "sex",
        rules: [{ required: true, message: "请选择性别" }]
      },
      {
        name: "birthday",
        rules: [{ required: true, message: "请填写您的生日" }]
      },
      {
        name: "human_height",
        rules: [
          { required: true, message: "请输入身高" },
          { rule: value => value.length <= 3, message: "身高最多可输入三位数字" }
        ]
      },
      {
        name: "advantage",
        rules: [{ required: true, message: messageA }]
      },
      {
        name: "intention",
        rules: [{ required: true, message: messageI }]
      },
      {
        name: "describe",
        rules: [
          { required: true, message: "请输入个人描述" },
          {
            rule: value => value.length <= 100,
            message: "个人描述最多可输入100个字"
          }
        ]
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
          { type: "phone", message: "手机号码格式不正确" }
        ]
      }
    ];
	}

  

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
        title,
        describe,
        contact_name,
        contact_phone,
        images,
        birthday,
        sex,
        education,
        advantage,
        intention,
        human_height
      } = datas.values;
      const { top_status, top_day, top_total_money } = this.props.top;
      Taro.showLoading({
        title: "提交中",
        mask: true
      });
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
            second_category: sex,
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
              birth: birthday, //
              height: human_height,
              education,
              advantage: advantage.toString(),
              intention: intention.toString()
            }
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

  handlePrice = () => {
    // 人均消费
    this.setState({ price: "" });
  }

  sexChange = val => {
    this.setState({ sexShow: val });
  }

  render() {
    const {
      clauseCheck,
      post_id,
      advantage_arr,
      education_arr,
      intention_arr,
      sexShow
    } = this.state;
    const { top,userInfo:{uname, mobile} } = this.props
    return (
      <View className="dating-form">
        <TitleBar title={CTITLE} />
        <DqForm 
          onSubmit={this.handlePublish} 
          validate={this.getValidateRules()}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
        >
          <DqFormItem label="姓名" required>
            <FormInput name="title" placeholder="请输入姓名" maxLength={10} />
          </DqFormItem>
          <DqFormItem label="选择性别" row required>
            <FormRadio label="男" value={1} name="sex" onChange={this.sexChange}/>
            <FormRadio label="女" value={2} name="sex" onChange={this.sexChange}/>
          </DqFormItem>
          <DqFormItem label="生日" arrow="horizontal" required>
            <FormDatePicker
              name="birthday"
              start="1920-1-1"
              end={times.getFormatData("yyyy-MM-dd")}
            />
          </DqFormItem>
          <DqFormItem label="身高" extra="cm" required>
            <FormInput name="human_height" type="number" maxLength={3} />
          </DqFormItem>
          <DqFormItem label="学历" arrow="horizontal">
            <FormPicker name="education" range={education_arr} col={1} />
          </DqFormItem>
          <DqFormItem label={sexShow == 1 ? "交友意向": "专属标签"} arrow="horizontal" required>
            <FormTagPicker name="advantage" range={advantage_arr} max={5} />
          </DqFormItem>
          <DqFormItem label={sexShow == 1 ? "专属标签": "交友意向"} arrow="horizontal" required>
            <FormTagPicker name="intention" range={intention_arr} max={5} />
          </DqFormItem>
          <DqFormItem label="自我介绍" mode="textarea" required>
            <FormTextarea
              name="describe"
              maxLength={100}
              placeholder="请详细描述你的信息，能让你提升异性吸引力哦～"
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image" required>
            <FormImagePicker
              name="images"
              max={9}
              describe="（选填，最多9张，小于2M）"
            />
          </DqFormItem>
          <DqFormItem label="联系人" required>
            <FormInput name="contact_name" 
							defaultValue={uname} 
              placeholder="请填写联系人" />
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
    );
  }
}
export default Dating;
