import Taro from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { STATIC_ASSETS } from "@/config";
import "../notice.scss";
// 消息首页列表item
const NoticeItem = props => {
  if (!props.data) {
    return <View> </View>;
  }
  const { data } = props;
  const { mes_num, mes_type, mes_data ,mes_title} = data || {};
  // mes_type 1=>系统消息  2=>E网助手  3=>店铺通知
  return (
    <View className="notice-wrap" onClick={() => props.onHandleClick(mes_type)}>
      <View className="notice-wrap__img-box">
        <Image
          className="notice-wrap__img"
          src={STATIC_ASSETS(`images/icon/notice_${mes_type||1}.png`)}
        />
      </View>
      <View className="notice-wrap__view">
        <View className="notice-wrap__view__top">
          <View className="notice-wrap__view__top__left">
           <Text className="notice-wrap__view__top__left__text">
            {mes_title}
            </Text>
          </View>
          <View className="notice-wrap__view__top__right">
            <Text className="notice-wrap__view__top__right__text">
              {mes_data.length>0 ? mes_data[0].mes_createtime : null}
            </Text>
          </View>
        </View>
        <View className="notice-wrap__view__bottom">
          <Text className="notice-wrap__view__bottom__text" numberOfLines={1}>
            {mes_data.length>0 ? mes_data[0].mes_content : null}
          </Text>
          {mes_num && mes_num > 0 ? (
            <Text className="notice-wrap__view__bottom__isread">
              {mes_num}
            </Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

NoticeItem.options = {
  addGlobalClass: true
};
export default NoticeItem;
