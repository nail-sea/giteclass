import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { TitleBar } from "@/components";
import "./service.scss";
import Dq from "@/config/Dq";
import { STATIC_ASSETS } from "@/config";

class Service extends Component {
  config = {
    navigationBarTitleText: "首页"
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleBack = () => {
    Dq.redirectTo({
      url: "/pages/user/user"
    });
  };

  render() {
    return (
      <View className="index">
        <TitleBar
          title="客服"
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <View className="serivce-nodata">
          <Image
            className="serivce-nodata__img"
            src={STATIC_ASSETS("images/item/ic_zzgl.png")}
          ></Image>
          <Text className="serivce-nodata__text">这里还没有任何消息哦~</Text>
        </View>
      </View>
    );
  }
}
export default Service;