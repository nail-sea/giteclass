import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import "./item-simpletext.scss";

export default class ItemSimpletext extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    item: null,
    page: "",
    onHandleDetail: () => {}
  };

  handleDetail = () => {
    this.props.onHandleDetail();
  };

  render() {
    const { item, page } = this.props;
    if (item) {
      return (
        <View
          key={item.id}
          className="simpletext-list__item"
          onClick={this.handleDetail}
        >
          <View className="simpletext-list__item__title">
            <Text className="simpletext-list__item__title__text">
              {item.title}
            </Text>
          </View>
          <View className="simpletext-list__item__content">
            <Text className="simpletext-list__item__content__text">
              {item.describe}
            </Text>
          </View>
          <View className="simpletext-list__item__position">
            <IconFont name="icon_dingwei" size={34} />
            <Text className="simpletext-list__item__position__text">
                {item.area_name}
            </Text>
          </View>
          {this.props.children}
        </View>
      );
    }
  }
}
