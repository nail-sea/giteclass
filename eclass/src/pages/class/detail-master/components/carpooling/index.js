import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqInput ,TitleBar} from "@/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import storage from "@/utils/storage";
import times from "@/utils/times";

import "./index.scss";

@connect(({ search }) => ({
  ...search
}))
class CarpoolingCarDetail extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    data: {extend:{}},
  };

  render() {
    const { data } = this.props;
    const base_class = "carpoolingCar__main-list__item";
    return (
      <View className="carpoolingCar-detail__info">
        <View className={`${base_class}__info`}>
          <View className={`${base_class}__info__item`}>
            <IconFont name="icon_zuchedinbiaoshi" size="16" color={'#C8C8C8'}/>
            <Text className={`${base_class}__info__item__text`}>{data.extend.member_num}{data.second_category == 2 ? `座空闲 • ` : `人乘车 • `}{times.getRelativeDate(data.extend.date, true)}</Text>
          </View>
          <View className={`${base_class}__info__item`}>
            <IconFont name="icon_zuchedinbiaoshi" size="16" color={'#70DCC7'}/>
            <Text className={`${base_class}__info__item__text`}>{data.extend.start_address}</Text>
          </View>
          <View className={`${base_class}__info__item`}>
            <IconFont name="icon_zuchedinbiaoshi" size="16" color={'#F87C6A'}/>
            <Text className={`${base_class}__info__item__text`}>{data.extend.end_address}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default CarpoolingCarDetail;