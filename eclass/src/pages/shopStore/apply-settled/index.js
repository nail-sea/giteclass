import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import {
  TitleBar,
  ActionSheet,
  Cascader,
  DqForm,
  DqFormItem,
  FormInput,
  FormTextarea,
  FormImagePicker,
  FormPicker,
  FormButton,
  FormUploadLogo
} from "@/components";
import { stdConfig, getPlatform} from "@/utils/common";
import ClassClause from "@/pages/class/component/clause";
import IconFont from "@/components/iconfont";
import decorator from "@/config/decorator";
import utils from "@/utils/utils";
import Tips from "@/utils/tips";
import Dq from "@/config/Dq";
import "./index.scss";
import { getWindowHeight, pxToPt} from '@/utils/style'
import display from "@/utils/display";

@connect(({ shopStore, location }) => ({
  ...shopStore,
  ...location
}))
@decorator({ needLogin: true })
class ApplySettled extends Component {
  state = {
    clauseCheck: true,
    isShowAddress: false,
    chooseAddressName: "",
    chooseAddressIds: "",
    pickerRange: []
  };

  config = {
    navigationBarTitleText: "店铺入驻",
    disableScroll: true
  }

  async componentDidMount() {
    const shopcategory = stdConfig.shopcategory;

    await this.setState({
      pickerRange: utils.transCategoryData(shopcategory)
    });
  }

  validateRules = [
    {
      name: "category",
      rules: [{ required: true, message: "请选择店铺分类" }]
    },
    {
      name: "name",
      rules: [{ required: true, message: "请填写店铺名称" }]
    },
    // {
    //   name: "chooseAddress",
    //   rules: [{ required: true, message: "请选择店铺地址" }]
    // },
    {
      name: "address",
      rules: [{ required: true, message: "请填写店铺详细地址" }]
    },
    // {
    //   name: "code",
    //   rules: [{ required: true, message: "请输入邀请码" }]
    // },
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

  onClauseChange = () => {
    this.setState({ clauseCheck: !this.state.clauseCheck }, () => {
      // console.log(this.state.clauseCheck);
    });
  };

  handleBack = () => {
    Dq.redirectTo({
      url: "/pages/user/user"
    });
  };

  handleShowAddress() {
    this.setState({
      isShowAddress: !this.state.isShowAddress // 点击遮罩层关闭会有问题 等处理完cascader组件完再处理
    });
  }

  handleSubmit = async (err, datas) => {
    if (err) {
      Tips.toast(err.errMsg);
      return false;
    }

    if (!this.state.clauseCheck) {
      Tips.toast("请阅读，并同意发布须知");
      return Promise.reject();
    }

    let result = await Taro.showModal({
      content: "发布的信息将无法修改,请确认填写正确",
      confirmColor : '#F87C6A'
    });

    if (result.confirm) {
      const {
        category,
        name,
        address,
        code,
        logo,
        describe,
        contact_name,
        contact_phone,
        images
      } = datas.values;

      const { chooseAddressName, chooseAddressIds } = this.state;

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
        .then( () => {
					const image_ids = !images || images.length === 0 ? '': images.map((image) => image.img_id)

          let data = {
            primary_category: category[0],
            second_category: category[1],
            name,
            address: `${chooseAddressName},${address}`,
            address_id: chooseAddressIds,
            code,
            logo,
            desc: describe,
            image_id: image_ids.toString(),
            contact_name,
            contact_phone,
            __location: 1
          };
          return this.props.dispatch({
            type: "shopStore/shopApplyEntry",
            payload: { ...data }
          });
        })
        .catch(err => {
          return Promise.reject(err);
        })
        .finally(() => {
          Taro.hideLoading();
        });
    }
    return Promise.reject();
  };

  onSelect(data) {
    if (data) {
      this.setState(
        {
          isShowAddress: false,
          chooseAddressIds: Object.values(data)
            .map(item => `${item.id}`)
            .toString(),
          chooseAddressName: Object.values(data).map(item => `${item.name}`)
        },
        () => {
          // console.log(this.state.chooseAddressIds);
        }
      );
    }
  }

  hideAddressList = () => {
    this.setState({ isShowAddress: false });
  };

  renderSheetAction() {
    const { isShowAddress } = this.state;
    return (
      <ActionSheet show={isShowAddress} onMaskClick={this.hideAddressList}>
        <Cascader
          onSelect={this.onSelect.bind(this)}
          // tabLevel={3}
          isHeight={true}
        />
      </ActionSheet>
    );
  }

  render() {
    const { clauseCheck, chooseAddressName, pickerRange } = this.state;
    return (
      <View className="apply-settled">
        <TitleBar
          title="店铺入驻申请"
          customBack
          handleBack={() => this.handleBack()}
        />
        <DqForm 
          onSubmit={this.handleSubmit} 
          validate={this.validateRules}
					style={getPlatform().isWeb?{}:{height:getWindowHeight(false, true, pxToPt(60))}}
        >
          <DqFormItem label="店铺分类" arrow="horizontal">
            <FormPicker name="category" multiple range={pickerRange} col={2} />
          </DqFormItem>
          <DqFormItem label="店铺名称">
            <FormInput
              name="name"
              placeholder="请填写店铺名称"
              maxLength={10}
            />
          </DqFormItem>
          <DqFormItem label="店铺地址">
            <View
              className="Form-view__view__address"
              onClick={() => this.handleShowAddress()}
            >
              {chooseAddressName ? (
                <Text className="Form-view__view__address__text">
                  {chooseAddressName}
                </Text>
              ) : (
                <FormInput
                  name="chooseAddress"
                  placeholder="请设置你的店铺地址"
                  maxLength={10}
                  disabled={true}
                />
              )}
              <IconFont name="ic_dingwei" size={34} />
            </View>
          </DqFormItem>
          <DqFormItem label="详细地址">
            <FormInput
              name="address"
              placeholder="请填写街道、楼牌号等"
              maxLength={10}
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image">
            <FormUploadLogo name="logo" />
          </DqFormItem>
          <DqFormItem label="邀请码">
            <FormInput name="code" placeholder="请填写邀请码" />
          </DqFormItem>
          <DqFormItem label="描述" mode="textarea">
            <FormTextarea
              name="describe"
              maxLength={100}
              placeholder="请详细描述你的信息，100字以内"
            />
          </DqFormItem>
          <DqFormItem hideLabel mode="image">
            <FormImagePicker
              name="images"
              max={9}
              describe="（选填，最多9张，小于2M）"
            />
          </DqFormItem>
          <DqFormItem label="联系人">
            <FormInput name="contact_name" placeholder="请填写联系人" />
          </DqFormItem>
          <DqFormItem label="手机号码">
            <FormInput
              name="contact_phone"
              type="number"
              maxLength={11}
              placeholder="请填写手机号码"
            />
          </DqFormItem>
          {/* <ClassSticky top={top} post_id={post_id} /> */}
          <ClassClause checked={clauseCheck} onChange={this.onClauseChange} />
          <FormButton label="立即提交" />
        </DqForm>

        <View className="Form-view">{this.renderSheetAction()}</View>
      </View>
    );
  }
}
export default ApplySettled;
