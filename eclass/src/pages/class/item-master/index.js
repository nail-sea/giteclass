import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import ItemHome from "./item-home/item-home";
import ItemHouse from "./item-house/item-house";
import ItemSimpletext from "./item-simpletext/item-simpletext";
// import ItemMiddle from './item-middle/item-middle'
import ENUM from "@/config/enum";
import Dq from "@/config/Dq";
import "./index.scss";

const itemTypeList = {
  postings: ["jobHunting"],
  simpletext: ["recommend"],
  notice: []
};

export default class ItemMaster extends PureComponent {
  static defaultProps = {
    type: "default",
    item_data: null,
    avatar_url: "", //个人主页和发布管理时传入头像
    user_name: "", //个人主页和发布管理时传入用户名
    onHandleDetail: () => {}, //点击去详情
    onHandleToPersonalPage: () => {} //点击去个人主页
  };

  onToDetail = id => {
    //查看详情
    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}&wechat=1`
    })
  };

  render() {
    const {
      item_data,
      type,
      avatar_url,
      user_name,
      onHandleDetail,
      onHandleToPersonalPage
    } = this.props;
    // let i_type = type
    // if(item_data.primary_category && item_data.primary_category){
    //   i_type = Object.keys(itemTypeList).find(item => {
    //     return itemTypeList[item].indexOf(item_data.primary_category) >= 0
    //   })
    // }
    // console.log("item-master",item_data.post_id , type)
    return (
      <View className="item-master">
        {(type == ENUM.ITEMTYPE.home ||
          type == '/pages/home/index' ||
          type == ENUM.ITEMTYPE.jobHunting_1 ||
          type == ENUM.ITEMTYPE.jobHunting_2 ||
          type == ENUM.ITEMTYPE.secondHand ||
          type == ENUM.ITEMTYPE.wantedAny ||
          type == ENUM.ITEMTYPE.localService ||
          type == ENUM.ITEMTYPE.productPromotion ||
          type == ENUM.ITEMTYPE.businessPartnership ||
          type == ENUM.ITEMTYPE.buyRentHouse_2 ||
          type == ENUM.ITEMTYPE["release-management"] ||
          type == ENUM.ITEMTYPE["personal-page"]) && (
          <ItemHome
            item={item_data}
            type={type}
            avatar_url={avatar_url}
            user_name={user_name}
            onHandleDetail={onHandleDetail}
            onHandleToPersonalPage={onHandleToPersonalPage}
          >
            {this.props.children}
          </ItemHome>
        )}
        {type == ENUM.ITEMTYPE.buyRentHouse_1 && (
          <ItemHouse
            item={item_data}
            type={type}
            avatar_url={avatar_url}
            user_name={user_name}
            onHandleDetail={onHandleDetail}
            onHandleToPersonalPage={onHandleToPersonalPage}
          >
            {this.props.children}
          </ItemHouse>
        )}
        {(type == ENUM.ITEMTYPE.simpletext) && (
          <ItemSimpletext
            item={item_data}
            type={type}
            avatar_url={avatar_url}
            user_name={user_name}
            onHandleDetail={onHandleDetail}
            onHandleToPersonalPage={onHandleToPersonalPage}
          >
            {this.props.children}
          </ItemSimpletext>
        )}
        {(type == ENUM.ITEMTYPE.localMeet ||
          type == ENUM.ITEMTYPE.dating) && (
          <ItemHouse
            item={item_data}
            type={type}
            avatar_url={avatar_url}
            user_name={user_name}
            onHandleDetail={onHandleDetail}
            onHandleToPersonalPage={onHandleToPersonalPage}
          >
            {this.props.children}
          </ItemHouse>
        )}
        {/* {type == 2 && <ItemMiddle item={item_data} type={i_type} page={page}/>} */}
      </View>
    );
  }
}
