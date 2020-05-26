import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, Button } from "@tarojs/components";
import { TitleBar } from "@/components";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import { STATIC_ASSETS } from "@/config";
import IconFont from "@/components/iconfont";
import Platform from "@/platfrom";
import ENUM from "@/config/enum";
import Tips from "@/utils/tips";
import Dq from "@/config/Dq";
import { getPlatform } from "@/utils/common";
import utils from '@/utils/utils'
import Storage from "@/utils/storage";
import classNames from 'classnames'

import "./login.scss";

@connect(({ Auth, loginRegister }) => ({
  ...loginRegister,
  ...Auth
}))
@decorator()
class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      checked: true
    };
  }

  config = {
    navigationBarTitleText: "登录"
  };

  async componentDidMount() {
    const checked = await Storage.getInstance().getClauseCheck();
    // this.setState({ checked })
  }

  gotoAgreement() {
    Dq.navigateTo({
      url: "/pages/login-register/notice/index"
    });
  }

  gotoPrivacy = (e)=> {
  
    Dq.navigateTo({
      url: "/pages/login-register/notice/indexPrivacy"
    });
  }

  gotoPhoneLogin () {
    if(this.state.checked){
      const params = utils.getUrlParams(this.$router.params)
      Dq.redirectTo({
        url: `/pages/login-register/login/login${params}`
      });
    } else {
      Tips.toast(`请阅读并勾选《用户协议》《隐私政策》`);
    }
  }

  onClauseChange = () => {
    this.setState(prevState => ({
      checked: !prevState.checked
    }))
  }

  async wxLogin(e) {
    if(this.state.checked){
      const { url,...params } = this.$router.params
      Platform.appCheckAuth(url , params, e)
    } else {
      Tips.toast(`请阅读并勾选《用户协议》《隐私政策》`);
    }
    
  }

  render() {
    const base_class = "login-register";
    const { checked } = this.state

    return (
      <View className={`${base_class}`}>
        {/* <TitleBar title="" /> */}
        <View className={`${base_class}__con`}>


          <View className={`${base_class}__con__logoEntrance`}>
            <Image
              className={`${base_class}__con__logoEntrance__img`}
              src={STATIC_ASSETS("images/logo_entrance.png")}
            />
          </View>



          <View className={`${base_class}__con__clause`}>
            {getPlatform().isWX ? (
              <Button
                className={`${base_class}__con__clause__weapp`}
                openType="getUserInfo"
                onGetUserInfo={this.wxLogin.bind(this)}
              >
                {/* <View className={`${base_class}__con__clause__weapp__btn`}>
                  <Text className={`${base_class}__con__clause__weapp__btn__word`}>微信登录</Text>
                </View> */}
                微信登录
                {/* <IconFont name="icon_weixinzhifu" size="80" /> */}
              </Button>
            ) : (
              <View
                className={`${base_class}__con__clause__h5`}
                onClick={this.wxLogin.bind(this)}
              >
                <View className={`${base_class}__con__clause__h5__btn`}>
                  <Text className={`${base_class}__con__clause__h5__btn__word`}>微信登录</Text>
                </View>
                {/* <IconFont name="icon_weixin" size="80" /> */}
                {/* <Text>微信</Text> */}
              </View>
            )}
            <View className={`${base_class}__con__clause__phoneLogin`} onClick={this.gotoPhoneLogin.bind(this)}>
              <Text className={`${base_class}__con__clause__phoneLogin__word`}>
                手机验证/密码登录
              </Text>
              <IconFont
                name='ic_zhankai'
                color={'#4C4C4C'}
                size={48}
              />
            </View>
            <View className={`${base_class}__con__clause__continer`} 
            onClick={this.onClauseChange.bind(this)}
          >
              <IconFont
                name={checked ? 'duihao_selected' : 'duihao_default'}
                size={40}
              />
              <Text className={`${base_class}__con__clause__word1`}>登录代表同意E网</Text>
              <Text
                className={`${base_class}__con__clause__word`}
                onClick={this.gotoAgreement.bind(this)}
              >
                《用户协议》
              </Text>
              <Text 
                className={`${base_class}__con__clause__word`}
                onClick={this.gotoPrivacy}
              >《隐私政策》</Text> 
              </View>
            {/* <Text className={`${base_class}__con__clause__word`}>《隐私政策》</Text> */}
          </View>
        </View>
      </View>
    );
  }
}
export default Service;
