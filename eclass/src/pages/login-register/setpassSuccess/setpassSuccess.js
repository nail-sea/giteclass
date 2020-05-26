import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { TitleBar ,DqButton} from "@/components";
import Dq from "@/config/Dq";
import "./setpassSuccess.scss";

class Service extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      title: "设置密码成功"
    };
  }

  config = {
    navigationBarTitleText: "设置密码成功"
  };

  onSure = () => {
    Dq.redirectTo({
      url: `/pages/user/user`
    });
  };

  render() {
    const base_class = "login-register";
    const { title } = this.state;
    return (
      <View className={`${base_class}`}>
        <TitleBar title="" />
        <View className={`${base_class}__success-word`}><Text>{title}</Text></View>
        <View className={`${base_class}__con`}>
          <View className={`${base_class}__con__btn`}>
            <DqButton label="完成" onClick={this.onSure.bind(this)} />
          </View>
        </View>
      </View>
    );
  }
}
export default Service;