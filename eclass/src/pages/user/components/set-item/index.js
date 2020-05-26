import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import IconFont from "@/components/iconfont";
import "./index.scss";

export default class UserItem extends Component {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  static defaultProps = {
    titlt: "",
    tips: "",
    isBorder: false,
    isMargin: false,
    isIcon: true,
    onhandleClick: () => {}
  };
  // onhandleClick = () => {
  //   this.props.onhandleClick()
  // }

  render() {
    const {
      titlt,
      tips,
      content,
      isBorder,
      isMargin,
      isIcon,
      onhandleClick
    } = this.props;
    return (
      <View
        className={classNames(
          "user-item",
          { "user-item__border": isBorder },
          { "user-item__margin": isMargin }
        )}
        onClick={onhandleClick}
      >
        <View className="user-item__main">
          <View className="user-item__main__tit">
            <Text className="user-item__main__tit__text">{titlt}</Text>
          </View>
          {tips ? (
            <View className="user-item__main__tips">
              <Text className="user-item__main__tips__text">{tips}</Text>
            </View>
          ): null}
        </View>
        <View className="user-item__body">
          {content ? (
            <View className="user-item__body__content">
              <Text className="user-item__body__content__text">{content}</Text>
            </View>
          ): null}
          <View className="user-item__body__layout">{this.props.children}</View>
        </View>
        <View className="user-item__icon">
          {isIcon && <IconFont name="ic_zhankai" color={"#c8c8c8"} size={54} />}
        </View>
      </View>
    );
  }
}
