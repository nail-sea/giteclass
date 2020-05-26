import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import "./index.scss";
import { ROUTER_CLASS } from "@/config/enum";
import Dq from "@/config/Dq";

export default class SwiperIcon extends PureComponent {
  static defaultProps = {
    list: []
  };

  handleItemClick = id => {
    let tab_item = this.props.list[0][id];
    // console.log("handleItemClick",id,tab_item);
    if (tab_item && tab_item.url) {
      const router = ROUTER_CLASS[tab_item.url];
      if (router.length > 0) {
        Dq.navigateTo({
          url: router
        });
      }
    }
  };

  render() {
    const { list } = this.props;
    return (
      <View className="home-icon-list">
        <View
          className="home-icon-list__swiper"
        >
          {list.map((list_item, index) => (
            <View className="home-icon-list__swiper-item" key={`swiper-icon-row-${index}`}>
              {list_item.map((item, tick) => {
                return (
                  <View
                    key={`${item.rank}-${tick}`}
                    className="home-icon-list__swiper-item__icon"
                    onClick={this.handleItemClick.bind(this, tick)}
                  >
                    <Image
                      className="home-icon-list__swiper-item__icon__img"
                      src={item.header}
                    />
                    <Text className="home-icon-list__swiper-item__icon__text">
                      {item.text}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </View>
    );
  }
}
