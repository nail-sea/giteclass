import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import "./item-house.scss";
import stdArray, { stdConfig, getPlatform , stopPropagation} from "@/utils/common";
import ENUM from "@/config/enum";
// import  from '@/utils/common'
import { STATIC_ASSETS } from "@/config";
import { Tag, DqImage } from "@/components";
import times from "@/utils/times";


let islocalMeet = "";
let isPrice = "";

export default class ItemHouse extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      showAll: false
    };
  }
  static defaultProps = {
    item: null,
    type: "",
    avatar_url: "",
    user_name: "",
    onHandleDetail: () => {}
  };

  handleDetail = e => {
    stopPropagation(e)
    this.props.onHandleDetail();
  };

  getPriceText(item){
    const {type} = this.props
    const _type = ENUM.ITEMTYPE[type] || "home"
    if (_type === 'localMeet' || _type === 'buyRentHouse_1') {
      return item.extend.price
      ? (_type === 'buyRentHouse_1')
          ? (item.second_category === '2' || item.second_category === '4')
            ? `¥${item.extend.price}/月`
            : `¥${item.extend.price}万`
        : `¥${item.extend.price}/人`
      :'面议'
    }
    return null
  }

  render() {
    const { item, type, avatar_url, user_name } = this.props;
    //个人主页，发布管理(名字头像传递进来)
    if (item) {
      const _type = ENUM.ITEMTYPE[type] || "home";
      let arr_label = stdArray.splitString(
        item.extend ? item.extend.advantage : ""
      );
      if(type == 'dating' && item.second_category == 1){
        arr_label = stdArray.splitString(
          item.extend ? item.extend.intention : ""
        );
      }
      const isSecondCategory = true;
      islocalMeet =
        _type == "localMeet"
          ? `${times.formatTimeStampToDate(item.extend.start_time)} - ${times.formatTimeStampToDate(item.extend.end_time)}`
          : `${item.extend.area || 0}㎡ | ${item.extend.room_hall_bathroom}`;
      {
        `¥${item.extend.price || 0}万`;
      }

      isPrice =
        (_type == "localMeet" || _type == "buyRentHouse_1") &&
        item.extend.price === 0
          ? "面议"
          : `¥${item.extend.price || 0}万`;
      if (_type == "dating") {
        islocalMeet = `${times.getFormaAges(item.extend.birth)}岁 | 身高${
          item.extend.height
        } | ${stdConfig.getData(
          item.primary_category,
          "education",
          item.extend.education.length ? item.extend.education : 1
        )}`;
        isPrice = "";
        if (arr_label.length >= 5) {
          arr_label.pop();
        }
      }

      // item.uname = '测试名字'
      let image_url =
        item.image_url && item.image_url.length > 0
          ? item.image_url
          : [STATIC_ASSETS("images/bg/icon_zanwutupian.png")];

      return (
        <View
          key={item.id}
          className="house-list__item"
          onClick={this.handleDetail}
        >
          <View className="house-list__item-flex">
            {image_url ? (
              <View
                className="house-list__item-imglist"
                onClick={this.handleDetail}
              >
                {image_url.map((img, index) => (
                  <View key={'item-house-img-'+index} className="house-list__item-imglist__item">
                    {index < 1 && (
                      <View
                        className="house-list__item-imglist__img"
                      >
                        <DqImage
                          mode="aspectFill"
                          src={img}
                        />
                      </View>
                    )}
                  </View>
                ))}
              </View>
            ):null}
            <View className="house-list__item-header">
              <View className="house-list__item-header__types">
                <View className="house-list__item-header__label">
                  {!!item.top_status && item.top_status >= ENUM.TOPSTATUS && (
                    <View className="house-list__item-header__types__item1">
                      <Text className="house-list__item-header__types__item1__text">顶</Text>
                    </View>
                  )}
                  {!!item.is_recommend && item.is_recommend == ENUM.RECOMMEND_STATUS && (
                    <Text className="house-list__item-header__types__item2">
                      <Text className="house-list__item-header__types__item2__text">荐</Text>
                    </Text>
                  )}
                  {/* {item.second_category && isSecondCategory && <View className='house-list__item-header__types__item3'>{stdConfig.getData( item.primary_category, 'second_category', item.second_category)}</View>} */}
                  {!!item.second_category && item.second_category != 0 && <Tag text={stdConfig.getData(item.primary_category,'second_category',item.second_category)} type={item.primary_category} />}
                  <View className="house-list__item-header__name">
                    <Text className="house-list__item-header__name__text" numberOfLines={1}>{item.title}</Text>
                  </View>
                </View>
              </View>
              <View
                className="house-list__item-content"
                onClick={this.handleDetail}
              >
                <Text className="house-list__item-content__word">
                  {islocalMeet}
                </Text>
                {isPrice?<Text className="house-list__item-content__salary">
                  {this.getPriceText(item)}
                </Text>:null}
              </View>
              {arr_label.length > 0 && (
                <View className="house-list__item-header__tags">
                  {arr_label.map((tag, index) => (
                    <Text
                      className="house-list__item-header__tags__item"
                      key={'item-house-label-'+index}
                    >
                      {stdConfig.getData(
                        item.primary_category,
                        (type == 'dating' && item.second_category == 1 ? "intention" : "advantage"),
                        tag
                      )}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View className="house-list__item-btn-continer">
            {this.props.children}
          </View>
        </View>
      );
    }
  }
}
