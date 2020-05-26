import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { TitleBar } from "@/components";
import UserItem from "../components/set-item";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ user }) => ({
  ...user
}))
@decorator({needLogin: true})
class AccountInfo extends Component {
  config = {
    navigationBarTitleText: "账户信息"
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

  handleBack = () => {
    //返回
    Dq.redirectTo({
      url: "/pages/user/account-management/index"
    });
  };

  handleToChangePhone = () => {
    //换绑手机号
    Dq.navigateTo({
      url: "/pages/user/change-phone/index"
    });
  };

  handleToChangePass = () => {
    //修改密码
    const url = this.props.userInfo.is_set_passwd == 'yes'
      ? "/pages/login-register/modifypass/index"
      : "/pages/login-register/setpass/setpass?type=set";
    Dq.navigateTo({
      url: url
    });
  };

  render() {
    const { userInfo } = this.props;
    const mobile = String(userInfo.mobile).substr(0,3) + '****' + String(userInfo.mobile).substr(7);
    return (
      <View className="acc-mana">
        <TitleBar
          title="账户管理"
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <View className="bg-con">
          <UserItem
            titlt="手机号"
            content={mobile}
            isMargin={true}
            onhandleClick={this.handleToChangePhone.bind(this)}
          />
        </View>
        <View className="bg-con">
          <UserItem
            titlt="密码管理"
            content={userInfo.is_set_passwd == 'yes' ? "修改" : "设置密码"}
            isBorder={true}
            onhandleClick={this.handleToChangePass.bind(this)}
          />
          {/* <UserItem titlt='社交账号绑定' content='绑定/解绑'/> */}
        </View>
      </View>
    );
  }
}
export default AccountInfo;