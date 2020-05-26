import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import { HOST_AGENT } from "@/config/index";
import Dq from "@/config/Dq";
import "../detail/index.scss";
//帖子详情
const NoticeItemType = props => {
  if (!props.data) {
    return;
  }
  const item = props.data;

  return (
    <View>
       <View className="notice-view__view__date">
          <Text className="notice-view__view__date__txt">{item.mes_createtime}</Text>
       </View>
      <View
        className="notice-view__view__view"
      >
      
        <View className="notice-view__view__view__title">
          <Text className="notice-view__view__view__title__text">
            {item.mes_title}
          </Text>
        </View>
        <View className="notice-view__view__view__content">
          <Text className="notice-view__view__view__content__text">
            {item.mes_content}
          </Text>
          {/* <Text className="notice-view__view__view__content__text">
            时间：{item.mes_createtime}
          </Text> */}
        </View>
        {/* {item.mes_type } */}
        {item.mes_detailstype == "becomeAgent" ? (
          <View
            className="notice-view__view__view__btn"
            onClick={() => {
              Dq.navigateTo({
                url: `/pages/web-view/index?from=/pages/notice/detail/index&src=${HOST_AGENT}/login?env=${process.env.TARO_ENV}`
              });
            }}
          >
            <Text className="notice-view__view__view__btn__text">去后台</Text>
            <IconFont name="ic_zhankai" size={50} />
          </View>
        ) : null}
        {item.mes_type == 1 && item.auditstatus == "pass" ? (
          <View
            className="notice-view__view__view__btn"
            onClick={() => {
              Dq.navigateTo({
                url: `/pages/class/detail-master/index?post_id=${item.post_id}`
              });
            }}
          >
            <Text className="notice-view__view__view__btn__text1">详情</Text>
            <IconFont name="ic_zhankai" size={50} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

NoticeItemType.options = {
  addGlobalClass: true
};
export default NoticeItemType;
