import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import stdArray, { stdConfig } from "@/utils/common";
import "./index.scss";

class DatingDetail extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    data: '',
  };

  render() {
    const { data } = this.props;
    return (
      <View className="jw-detail__advantage">
        <Text className="jw-detail__advantage__title1">{"关于TA"}</Text>
        <View className="jw-detail__advantage__list">
          {stdArray
            .splitString(data.extend ? (data.second_category == 1 ? data.extend.intention :data.extend.advantage) : "")
            .map((item, index) => {
              return (
                <Text className="jw-detail__advantage__list__text">
                  {stdConfig.getData(
                    data.primary_category,
                    (data.second_category == 1 ? "intention" : "advantage"),
                    item
                  )}
                </Text>
              );
            })}
        </View>
        <Text className="jw-detail__advantage__title1">{"TA喜欢"}</Text>
        <View className="jw-detail__advantage__list">
          {stdArray
            .splitString(data.extend ? (data.second_category == 1 ? data.extend.advantage : data.extend.intention) : "")
            .map((item, index) => {
              return (
                <Text className="jw-detail__advantage__list__text">
                  {stdConfig.getData(
                    data.primary_category,
                    (data.second_category == 1 ? "advantage" : "intention"),
                    item
                  )}
                </Text>
              );
            })}
        </View>
        <Text className="jw-detail__advantage__title1">TA的照片</Text>
      </View>
    );
  }
}
export default DatingDetail;