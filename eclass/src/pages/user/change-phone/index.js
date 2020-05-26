import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import { DqButton , TitleBar} from "@/components";
import UserItem from "../components/set-item";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import IconFont from "@/components/iconfont";
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ user }) => ({
  ...user
}))
@decorator({needLogin: true})
class ChangePhone extends Component {
  config = {
    navigationBarTitleText: "已绑手机号"
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    userInfo: {}
  };

  MyInfo() {
    this.props.dispatch({
      type: "user/fetchMyInfo"
    });
  }

  async componentDidMount() {
    await this.MyInfo();
  }

  onToGetCode = () => {
    //获取验证码
    Dq.navigateTo({
      url: `/pages/user/codeInput/codeInput?phone=${this.props.userInfo.mobile}`
    });
  };

  render() {
    const { userInfo } = this.props;
    const mobile = String(userInfo.mobile).substr(0,3) + '****' + String(userInfo.mobile).substr(7);
    return (
      <View className="change-phone">
        <TitleBar title="已绑手机号" />
        <View className="change-phone__header">
          {(userInfo && userInfo.avatar_url && userInfo.avatar_url != "" )? (
            <Image
              mode="aspectFill"
              className="change-phone__header-img"
              src={userInfo.avatar_url}
            />
          ): <IconFont name="icon_moren" size={200} />}
        </View>
        <View className="change-phone__tips1">
          <Text className="change-phone__tips1__text">您当前已绑定手机号</Text>
        </View>
        <View className="change-phone__phone">
          <Text className="change-phone__phone__text">{mobile}</Text>
        </View>
        <View className={"change-phone__btn"}>
          <DqButton label="换绑手机号" onClick={this.onToGetCode.bind(this)} />
        </View>
        <View className="change-phone__tips2">
          <Text className="change-phone__tips2__text">
            为确保账户安全，换绑前需验证当前手机号
          </Text>
        </View>
      </View>
    );
  }
}
export default ChangePhone;