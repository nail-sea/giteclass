import Taro, { Component } from "@tarojs/taro";
import { View } from "@tarojs/components";

function Touchable(props) {
  return <View>{props.children}</View>;
}
export default Touchable;
