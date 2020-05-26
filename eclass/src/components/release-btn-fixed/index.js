import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import "./index.scss";
import { STATIC_ASSETS } from "../../config";
import ENUM, { ROUTER_CLASS_RELEASE } from "@/config/enum";
import Dq from "@/config/Dq";

export default function ReleaseBtnFixed(props) {


  const handleToRelease = () => {
    const { name } = props.params;
    const router = ROUTER_CLASS_RELEASE[name];
    if (router.length > 0) {
      //跳转去发布
      Dq.navigateTo({
        // url: `/pages/release/release`
        url: router
      });
    }
  };

  const { style, title } = props;
  return (
    <View
      className="fixed_release_btn"
      style={style}
      onClick={handleToRelease}
    >
      <Image
        className="fixed_release_btn__img"
        src={STATIC_ASSETS("images/icon/release.png")}
      />
      <Text className="fixed_release_btn__text">
        {title ? title : "发布"}
      </Text>
    </View>
  );
}
ReleaseBtnFixed.defaultProps = {
  params: {}
}