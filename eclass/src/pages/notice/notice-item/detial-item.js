import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import Dq from "@/config/Dq";
import Platform from "@/platfrom";
import "../detail/index.scss";
// 店铺详情------------------
const DetailItem = props => {
  if (!props.data) {
    return;
  }

  const item = props.data;
  const showDetailList = {
    'userUsedCoupon': '/pages/user/card-center/index',
    'userBuyCoupon': '/pages/user/card-center/index',
    'shopEntrySuccess': `/pages/shopStore/my-store/index?shop_id=${item.shop_id}`,
    'shopReupShelf': `/pages/shopStore/my-store/index?shop_id=${item.shop_id}`,
    'notifyUsedCoupon': `/pages/shopStore/Coupon-management/index?shop_id=${item.shop_id}`,
    'auditCouponSuccess': `/pages/shopStore/Coupon-management/index?shop_id=${item.shop_id}`
  }
  
  const isShowDetail = Object.keys(showDetailList).indexOf(item.mes_detailstype) >= 0
  console.log(isShowDetail)
  let detailUrl = ''
  if(isShowDetail){
    detailUrl = showDetailList[item.mes_detailstype]
  }

  return (
    <View>
      {/* <View className="notice-view__view__date">
          <Text className="notice-view__view__date__txt">{item.mes_createtime}</Text>
       </View> */}
      <View className="notice-view__view__view">
        <View className="notice-view__view__view__title">
          <Text className="notice-view__view__view__title__text">
            {item.mes_title}
          </Text>
        </View>

        {item.mes_detailstype == 'notifyUsedCoupon' ? (
          <View className="notice-view__view__view__content">
            <Text className="notice-view__view__view__content__text">
              用户手机号：{item.coupon_mobile}
            </Text>
            <Text className="notice-view__view__view__content__text">
              使用金额：{item.coupon_name}
            </Text>
            <Text className="notice-view__view__view__content__text">
              使用时间：{item.coupon_usertime}
            </Text>
          </View>
        ) : (
          <View className="notice-view__view__view__content">
            <Text className="notice-view__view__view__content__text">
              {item.mes_content}
            </Text>
            <Text className="notice-view__view__view__content__text">
              时间：{item.mes_createtime}
            </Text>
            {item.mes_detailstype == 'shopDownShelf'&&<Text className="notice-view__view__view__content__text">
            若有疑问，请联系客服
            </Text>}
           
            <View className="notice-view__view__view__content__icon">
              {item.mes_detailstype == 'shopEntrySuccess' && item.auditstatus == "pass" ? (
                <IconFont
                  name={
                    item.auditstatus === "pass"
                      ? "icon_yitongguo"
                      : "icon_weitongguo"
                  }
                  size={100}
                />
              ) : null}
            </View>
          </View>
        )}
        {isShowDetail ? (
          <View
            className="notice-view__view__view__btn"
            onClick={() => {
              Dq.navigateTo({
                url: detailUrl
              });
            }}
          >
            <Text className="notice-view__view__view__btn__text">查看详情</Text>
            <IconFont name="ic_zhankai" size={50} />
          </View>
        ) : null}

        {item.mes_detailstype == 'shopDownShelf'? <View
            className="notice-view__view__view__btn"
            onClick={() =>{
              Dq.navigateTo({
                url: `/pages/service/server/index`
              });
            }}
          >
            <Text className="notice-view__view__view__btn__text">点击跳转客服</Text>
            <IconFont name="ic_zhankai" size={40} />
          </View>:null}
      </View>
    </View>
  );
};

DetailItem.options = {
  addGlobalClass: true
};
export default DetailItem;
