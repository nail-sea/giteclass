import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { Noticebar, TitleBar } from "@/components";
import Storage from "@/utils/storage";
import "./release.scss";
import ENUM , { ROUTER_CLASS_RELEASE } from "@/config/enum";
import { STATIC_ASSETS } from "@/config";
import { connect } from "@tarojs/redux";
import Dq from "@/config/Dq";
import decorator from "@/config/decorator";

const NAME = "release";
const RELEASE = "release_page";

@connect(({ user }) => ({
  ...user
}))
@decorator()
class Index extends Component {
  config = {
		navigationBarTitleText: '发布',
	}
  constructor() {
    super(...arguments);
    this.state = {
      list_item: [
        {
          header: STATIC_ASSETS("images/item/carpoolingCar.png"),
          rank: 1,
          text: "拼车租车",
          url: "carpoolingCar"
        },
        {
          header: STATIC_ASSETS("images/item/jobHunting.png"),
          rank: 2,
          text: "我要招人",
          url: "jobHunting_1"
        },
        {
          header: STATIC_ASSETS("images/item/ic_wyqz.png"),
          rank: 3,
          text: "我要求职",
          url: "jobHunting_2"
        },
        {
          header: STATIC_ASSETS("images/item/secondHand.png"),
          rank: 4,
          text: "二手物品",
          url: "secondHand"
        },
        {
          header: STATIC_ASSETS("images/item/buyRentHouse.png"),
          rank: 5,
          text: "租房买房",
          url: "buyRentHouse_1"
        },
        {
          header: STATIC_ASSETS("images/item/dating.png"),
          rank: 6,
          text: "征婚交友",
          url: "dating"
        },
        {
          header: STATIC_ASSETS("images/item/wantedAny.png"),
          rank: 7,
          text: "寻人寻物",
          url: "wantedAny"
        },
        {
          header: STATIC_ASSETS("images/item/localMeet.png"),
          rank: 8,
          text: "同城聚会",
          url: "localMeet"
        },
        {
          header: STATIC_ASSETS("images/item/businessPartnership.png"),
          rank: 9,
          text: "创业合伙",
          url: "businessPartnership"
        },
        {
          header: STATIC_ASSETS("images/item/localService.png"),
          rank: 10,
          text: "本地服务",
          url: "localService"
        },
        {
          header: STATIC_ASSETS("images/item/productPromotion.png"),
          rank: 11,
          text: "商品促销",
          url: "productPromotion"
        }
      ],
      count_gold: 100,
      loginState: 0
    };
  }

  async componentDidMount() {
    this.setState({
      loginState: await Storage.getInstance().getLoginState()
    });
    await this.props.dispatch({
      type: "user/fetchMyInfo",
      payload: {
        isRefresh: true
      }
    });
    if(process.env.TARO_ENV === 'weapp'){
      if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
        this.$scope.getTabBar().$component.setState({
          selected: 2
        })
      }  
    }
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleItemClick = id => {
    let tab_item = this.state.list_item[id];
    if (tab_item && tab_item.url) {
      const router = ROUTER_CLASS_RELEASE[tab_item.url];
      if (router.length > 0) {
        Dq.navigateTo({
          url: router
        });
      } else {
        Taro.showToast({
          title: "该功能还没有开通哦~",
          icon: "none",
          duration: 2000
        });
      }
    }
  };

  renderLoginPage = () => {
    const { list_item, loginState } = this.state;
    const { userInfo } = this.props;
    const e_coin = loginState === ENUM.LOGINSTATUS ? userInfo&&userInfo.e_coin : 0;

    return (
      <View>
        <TitleBar title="E网发布" is_back={false} />
        <View className={`${RELEASE}-link`}>
          <Noticebar isMove={false}/>
        </View>
        <View className={`${RELEASE}-content`}>
          <View className={`${RELEASE}-content_title`}>
            <Text className={`${RELEASE}-content_title__text`}>
              请选发布信息类型
            </Text>
          </View>
          <View className={`${RELEASE}-content_list`}>
            {list_item.map((item, index) => {
              return (
                <View
                  key={item.rank}
                  className={`${RELEASE}-content_list__icon`}
                  onClick={this.handleItemClick.bind(this, index)}
                >
                  <Image
                    className={`${RELEASE}-content_list__icon__img`}
                    src={item.header}
                  />
                  <Text className={`${RELEASE}-content_list__icon__text`}>
                    {item.text}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View className={`${RELEASE}-bottom`}>
          <View className={`${RELEASE}-bottom_title1`}>
            <Text className={`${RELEASE}-bottom_title1__text`}>
              {`账户可用E币 `}
              <Text className={`${RELEASE}-bottom_title1_count`}>{e_coin}</Text>
            </Text>
          </View>
          {/* <View className={`${RELEASE}-bottom_title2`}>
            <Text className={`${RELEASE}-bottom_title2__text`}>
              （1元=1E币，E币可用来发布信息和置顶
            </Text>
          </View>
          <View className={`${RELEASE}-bottom_title3`}>
            <Text className={`${RELEASE}-botton_title3__text`}>
              充值即送积分，50积分即可免费发布消息
            </Text>
          </View> */}
          <View
            className={`${RELEASE}-bottom_btn`}
            onClick={() => {
              Dq.navigateTo({
                url: "/pages/release/recharge/index"
              });
            }}
          >
            <Text className={`${RELEASE}-bottom_btn__text`}>立即充值</Text>
          </View>
        </View>
      </View>
    );
  };

  renderLogoutPage = () => {
    return (
      <View className={`${RELEASE}-bottom`}>
        <View className={`${RELEASE}-bottom_text`}>
          <Text className={`${RELEASE}-bottom_text__text`}>
            您还没有登录哦~
          </Text>
        </View>
        <View
          className={`${RELEASE}-bottom_btn`}
          onClick={() => {
            Dq.navigateTo({
              url: `${ENUM.LOGINURL}?url=release`
            });
          }}
        >
          <Text className={`${RELEASE}-bottom_btn__text`}>去登录</Text>
        </View>
      </View>
    );
  };

  render() {
    const { loginState } = this.state;
    return (
      <View className={`${NAME}${RELEASE}`}>
        {loginState === ENUM.LOGINSTATUS
          ? this.renderLoginPage()
          : this.renderLogoutPage()}
        {/* <DqTabBar currentTab={2} /> */}
      </View>
    );
  }
}
export default Index;