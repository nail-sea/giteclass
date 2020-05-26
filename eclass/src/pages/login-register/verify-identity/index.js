import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { DqButton ,TitleBar, BasicButton} from "@/components";
import UserItem from "../components/set-item";
import { connect } from "@tarojs/redux";
import { STATIC_ASSETS } from "@/config";
import IconFont from "@/components/iconfont";
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ user }) => ({
  ...user
}))
class ChangePhone extends Component {
  config = {
    navigationBarTitleText: "已绑手机号"
  };

  constructor() {
    super(...arguments);
    this.state = {
      verifyType: 1
    };
  }
  static defaultProps = {
    userInfo: {}
  };

  async componentWillMount() {}

  onToGetCode = () => {
    //获取验证码
    const { phone } = this.$router.params;
    Dq.navigateTo({
      url: `/pages/login-register/verify-identity/codeInput/codeInput?phone=${phone}`
    });
  };

  render() {
    const { phone } = this.$router.params;
    const { verifyType } = this.state;

    return (
      <View className="verify-identity">
        <TitleBar title="" />
        <View className={`login-register__con__word2`}>
          <Text className="login-register__con__word2__text">身份验证</Text>
        </View>
        <View className="login-register__con__word4">
          <Text className="login-register__con__word4__text">
            找回密码前需验证身份
          </Text>
        </View>
        <View className="verify-identity__img">
          <Image
            className="verify-identity__img__img"
            src={STATIC_ASSETS("images/icon/nodata.png")}
          />
        </View>
        <View className="verify-identity__tips1">
          <Text className="verify-identity__tips1__text">
            请选择一种验证方式
          </Text>
        </View>

        <View className="verify-identity__type">
          <View className="verify-identity__type__item">
            <View className="verify-identity__type__item__content">
              <View className="verify-identity__type__item__phone">
                <Text className="verify-identity__type__item__phone__text">
                  {phone}
                </Text>
              </View>
              <View className="verify-identity__type__item__tips2">
                <Text className="verify-identity__type__item__tips2__text">
                  通过手机验证码验证身份
                </Text>
              </View>
            </View>
            <View className="verify-identity__type__item__icon">
              <IconFont
                name="duihao_selected"
                color={verifyType == 1 ? "#F87C6A" : "rgba(160,160,160,1 )"}
                size={40}
              />
            </View>
          </View>
        </View>

        <View className={"verify-identity__btn"}>
          <BasicButton size="large" label="确定" onClick={this.onToGetCode}>确定</BasicButton>
        </View>
      </View>
    );
  }
}
export default ChangePhone;