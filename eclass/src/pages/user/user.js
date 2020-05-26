import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqScrollView } from "@/components";
import { HOST_AGENT } from "@/config/index";
import IconFont from "@/components/iconfont";
import Storage from "@/utils/storage";
import { connect } from "@tarojs/redux";
import ENUM from "@/config/enum";
import decorator from "@/config/decorator";
import classNames from "classnames";
import {getPlatform} from'@/utils/common'
import { getWindowHeight } from "@/utils/style";
import Tips from "@/utils/tips";
import Platform from "@/platfrom";
import Dq from "@/config/Dq";
import UserHeader from './components/userHeader'
import "./user.scss";

@connect(({ user, loginRegister }) => ({
  ...user,
  ...loginRegister
}))
@decorator()
class Index extends Component {
  config = {
    navigationBarTitleText: "我的",
    disableScroll: getPlatform().isRN
  };

  constructor() {
    super(...arguments);
    this.state = {
      list_item: [
        {
          header: "icon_zhuye",
          rank: 1,
          text: "我的主页",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needAgent: false,
          url: "/pages/user/personal-page/index"
        },
        {
          header: "icon_wodefabu",
          rank: 2,
          text: "我的发布",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needAgent: false,
          url: "/pages/user/release-management/index"
        },
        {
          header: "icon_wodekaquanyouhuiquanguanli",
          rank: 3,
          text: "我的卡券",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needAgent: false,
          style: true,
          url: "/pages/user/card-center/index"
        },
        {
          header: "icon_dianpuruzhu",
          rank: 4,
          text: "店铺入驻",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needShop: 1,
          needAgent: false,
          style:true,
          url: "/pages/shopStore/apply-settled/index"
        },
        {
          header: "icon_dianpuguanli",
          rank: 5,
          text: "店铺管理",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needShop: 2,
          needAgent: false,
          style: true,
          url: "/pages/shopStore/my-store/index"
        },
        {
          header: "icon_zhanzhangguanli",
          rank: 6,
          text: "站长管理",
          isNeedLogin: true,
          isNeedLoginShow: true,
          needAgent: true,
          url: HOST_AGENT 
        },
        {
          header: "icon_yaoqingma",
          rank: 7,
          text: "邀请码",
          isNeedLogin: true,
          isNeedLoginShow: false,
          needAgent: true,
          style: true,
          url: '/pages/share/index'
        },
        {
          header: "icon_xiaoxizhognxin",
          rank: 8,
          text: "消息中心",
          isNeedLogin: true,
          isNeedLoginShow: false,
          needAgent: false,
          url: "/pages/notice/notice"
        },
        {
          header: "icon_kefu",
          rank:11,
          text: "招募加盟商",
          isNeedLogin: true,
          isNeedLoginShow: false,
          needAgent: false,
          url: "/pages/service/server/Recruit"
        },
        {
          header: "icon_kefu",
          rank: 9,
          text: "客服",
          isNeedLogin: true,
          isNeedLoginShow: false,
          needAgent: false,
          style: true,
          url: "/pages/service/server/index"
        },
        {
          header:'icon_guanyuEwang',
          rank:10,
          text:'关于E网',
          isNeedLogin:false,
          isNeedLoginShow:false,
          needAgent:false,
          url:'/pages/login-register/notice/index'
        }
      ],
      userInfo: {},
      loginState: 2
    };
  }
  async MyInfo() {
    await this.props
      .dispatch({
        type: "user/fetchMyInfo",
        payload: {
          isRefresh: true
        }
      })
      .then(data => {
        this.setState({ userInfo: data });
      });
  }

  async componentDidShow() {
    const loginState = await Storage.getInstance().getLoginState();
    this.setState({ loginState });
    if (loginState == ENUM.LOGINSTATUS) {
      this.MyInfo();
    }
    if(process.env.TARO_ENV === 'weapp'){
      if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
        this.$scope.getTabBar().$component.setState({
          selected: 4
        })
      }  
    }
  }

  async componentDidMount() {
    const loginState = await Storage.getInstance().getLoginState();
    this.setState({ loginState });
    if (loginState == ENUM.LOGINSTATUS) {
      this.MyInfo();
    }
  }

  handleItemClick = id => {
    const isLogin = this.state.loginState == ENUM.LOGINSTATUS;
    const { userInfo:{mobile} } = this.state

    let tab_item = this.state.list_item[id];
    if (tab_item && tab_item.url) {
      if (!tab_item.isNeedLogin || (tab_item.isNeedLogin && isLogin)) {
        let { url } = tab_item;
        if (tab_item.url === HOST_AGENT) {
          Platform.LinksExternal(`${url}?env=${process.env.TARO_ENV}&mobile=${mobile}`);
        }else {
          Dq.navigateTo({
            url
          });
        }

      } else {
        Taro.showModal({
          title: "",
          content: "您还未登录哦",
          confirmText: "去登录",
          confirmColor : '#F87C6A',
          success: msg => {
            if (msg.confirm) {
              this.handleLogin();
            }
          }
        });
      }
    } else {
      Tips.toast("该功能还没有开通哦~");
    }
  };

  handleToAccountManagement = () => {
    Dq.navigateTo({
      url: "/pages/user/account-management/index"
    });
  };

  handleLogin = () => {
    Dq.navigateTo({
      url: `${ENUM.LOGINURL}?url=user`
    });
  };

  renderHeader = () => {
    const { userInfo, loginState } = this.state;
    const isLogin = loginState == ENUM.LOGINSTATUS;
    return (
      <UserHeader 
        isLogin={isLogin}
        userInfo={userInfo}
        gotoAccountManager={this.handleToAccountManagement}
        onItemClick={this.handleItemClick.bind(this, 0)}
        gotoLogin={this.handleLogin}
      />
    );
  };

  filterListItem = (list) => {
    const { userInfo, loginState } = this.state;
    const isLogin = loginState == ENUM.LOGINSTATUS;
    const CLASSNAME = "user__icon-list";
    let arr = []
    list.forEach(i => {
      let item = i
      item.isShow = true
      if ((item.isNeedLoginShow && !isLogin) || (item.needAgent && userInfo.is_agent != 1)) {
        item.isShow = false
      } else {
        if (item.needShop) {

          //店铺入驻始终显示
          if (
            item.needShop == 1 &&
            userInfo.is_shop &&
            userInfo.is_shop != 0
          ) {
            //店铺入驻
            item.style = false
          }
          if (item.needShop == 2) {
            // 店铺管理
            if (!userInfo.is_shop|| userInfo.is_shop == 0) {
              //无店铺
              item.isShow = false
            }
            // if (
            //   userInfo.audit_status != 1 &&
            //   ENUM.AUDIT_STATUS[userInfo.audit_status - 1]
            // ) {
            //   // 店铺审核状态
            //   item.text = `店铺${
            //     ENUM.AUDIT_STATUS[userInfo.audit_status - 1].name
            //     }`;
            // }
          }
          // if(item.needAgent)
        }
      }
      arr.push(item)
    });
    return arr
  }

  renderIconList() {
    const { list_item, userInfo, loginState } = this.state;
    const isLogin = loginState == ENUM.LOGINSTATUS;
    const CLASSNAME = "user__icon-list";
    let list_icon_item = this.filterListItem(list_item)

    return (
      <View className={`${CLASSNAME}`}>
        {list_icon_item.map((item, index) => {
          return item.isShow ? (
            <View
              className={classNames(`${CLASSNAME}__bottom`, {
                [`${CLASSNAME}__bottom__margin`]: item.style
              })}
              key={item.rank}
              onClick={() => {
                this.handleItemClick(index);
              }}
            >
              <View className={`${CLASSNAME}__item`}>
                <View className={`${CLASSNAME}__item__view`}>
                  <IconFont name={item.header} size={42} />
                  <Text className={`${CLASSNAME}__item__text`}>
                    {item.text}
                  </Text>
                </View>
                <IconFont name="ic_zhankai_big" size={50} />
              </View>
            </View>
          ) : null;
        })}
      </View>
    );
  }

  render() {
    return (
      <View className="user">
        <DqScrollView
          scrollStyle={{
            background: "#fff",
            height: getWindowHeight(true, false)
          }}
          refresherDisabled={true}
          moveDisabled={true}
        >
          {this.renderHeader()}
          {this.renderIconList()}
          {/* {this.renderUserBtn()} */}
        </DqScrollView>
        {/* <DqTabBar currentTab={4} /> */}
      </View>
    );
  }
}
export default Index;