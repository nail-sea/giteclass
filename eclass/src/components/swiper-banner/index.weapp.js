import Taro, { Component } from "@tarojs/taro";
import { View, Swiper, SwiperItem, Image } from "@tarojs/components";
import "./index.weapp.scss";

export default class SwiperBanner extends Component {
  static defaultProps = {
    data: []
  };

  render() {
    const { data, styleType } = this.props;
 
    return (
      <View className={styleType + "-banner"} >
        <Swiper
          className={styleType + "-banner__swiper"}
          circular
          autoplay
          indicatorDots
          indicatorActiveColor="#fff"
        >
          {data.map(item => (
            <SwiperItem key={item.rank} className="banner__swiper-item">
              <View className="banner__swiper-item__wrap">
                <Image className="banner__swiper-item-img" src={item.img} mode="scaleToFill" />
              </View>
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    );
  }
}
