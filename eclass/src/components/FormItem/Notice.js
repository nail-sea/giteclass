import Taro, { Component, Children } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import Dq from "@/config/Dq";
import "@/assets/styles/form.scss";
const NAME = "dq-form-continer";

export default class Notice extends Component {
  static defaultProps = {
    onChange: () => {},
    accept: false
  };
  render() {
    const { accept, onChange } = this.props;
    return (
      <View className={`${NAME}__clause`}>
        <View>
          <Text className={`${NAME}__clause__text`}>发布条款</Text>
        </View>
        <View className={`${NAME}__clause__check`}>
          <View
            className={`${NAME}__clause__check__view`}
            onClick={() => onChange(!accept)}
          >
            <IconFont
              name="duihao_selected"
              color={accept ? "#F87C6A" : "#bbb"}
              size={38}
            />
            <Text className={`${NAME}__clause__check__view__txt`}>
              已阅读，并同意
            </Text>
          </View>
          <Text
            className={`${NAME}__clause__btn`}
            onClick={() => {
              Dq.navigateTo({
                url: "/pages/release/notice/index"
              });
            }}
          >
            【发布须知】
          </Text>
          <Text
            className={`${NAME}__clause__btn`}
            onClick={() => {
              Dq.navigateTo({
                url: "/pages/release/eCoinService/index"
              });
            }}
          >
            【E币服务协议】
          </Text>
        </View>
      </View>
    );
  }
}
