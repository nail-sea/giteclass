import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { connect } from "@tarojs/redux";
import "./index.scss";
import { STATIC_ASSETS } from "@/config";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
// import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import utils from "@/utils/utils";

@connect(({ notice }) => ({
  ...notice
}))
class DqTabBar extends PureComponent {
  static defaultProps = {
    tabClass: "default",
    isFixed: false,
    currentTab: 1,
    loginState: 2,
    compStyle: ""
  };

  state = {
    tabList: [
      {
        pagePath: "/pages/home/index",
        iconPath: STATIC_ASSETS("images/tab-bar/home.png"),
        selectedIconPath: STATIC_ASSETS("images/tab-bar/home-active.png"),
        text: "首页",
        key: 1
      },
      {
        pagePath: "/pages/notice/notice",
        iconPath: STATIC_ASSETS("images/tab-bar/notice.png"),
        selectedIconPath: STATIC_ASSETS("images/tab-bar/notice-active.png"),
        text: "客服",
        key: 2
      },
      {
        pagePath: "/pages/release/release",
        iconPath: STATIC_ASSETS("images/tab-bar/release.png"),
        selectedIconPath: STATIC_ASSETS("images/tab-bar/release.png"),
        text: "发布",
        key: 3
      },
      {
        pagePath: "/pages/shopStore/index",
        iconPath: STATIC_ASSETS("images/icon/icon_dianpu.png"),
        selectedIconPath: STATIC_ASSETS("images/tab-bar/icon_dianpu.png"),
        text: "店铺",
        key: 4
      },
      {
        pagePath: "/pages/user/user",
        iconPath: STATIC_ASSETS("images/tab-bar/user.png"),
        selectedIconPath: STATIC_ASSETS("images/tab-bar/user-active.png"),
        text: "我的",
        key: 5
      }
    ],
    count: 0
  };

  handleClick = path => {
    const route = utils.getPageUrl(1);
    if (route != path) Dq.redirectTo({ url: path });
  };

  componentDidMount = async () => {
    const loginState = await Storage.getInstance().getLoginState();
    if (loginState === ENUM.LOGINSTATUS) {
      this.setState({
        loginState,
        count: this.props.count
      });
    }
  };

  renderMessageCount() {
    const { loginState } = this.state;
    const { count } = this.props;
    
    return (
      <View>
        {loginState === ENUM.LOGINSTATUS ? (
          <View>
            {count > 99 ? (
              <Text className="tab-bar__view__view__message__box__num">
                99+
              </Text>
            ) : (
              <View>
                {count > 0 ? (
                  <Text className="tab-bar__view__view__message__box__num">
                    {count}
                  </Text>
                ) : null}
              </View>
            )}
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const { tabList } = this.state;
    const { currentTab } = this.props;
    console.log(this.props)
    return (
      <View
        className="tab-bar"
        style={{
          backgroundImage: `url(${STATIC_ASSETS(
            "images/tab-bar/tabbar_bg.png"
          )})`
        }}
      >
        <View className="tab-bar__view">
          {tabList.map((item, index) => {
            return (
              <View
                // key={item.key}
                key={'dq-tab-bar-item-'+index}
                className="tab-bar__view__view"
                onClick={() => {
                  this.handleClick(item.pagePath);
                }}
              >
                {index === 2 ? (
                  <View className="tab-bar__view__view__message">
                    <Image
                      className="tab-bar__view__view__main-img"
                      src={item.iconPath}
                    />
                  </View>
                ) : (
                  <View className="tab-bar__view__view__message">
                    {index === 1 ? (
                      <View className="tab-bar__view__view__message__box">
                        {this.renderMessageCount()}
                        <Image
                          className="tab-bar__view__view__main"
                          src={
                            currentTab === index
                              ? item.selectedIconPath
                              : item.iconPath
                          }
                        />
                      </View>
                    ) : (
                      <Image
                        className="tab-bar__view__view__main"
                        src={
                          currentTab === index
                            ? item.selectedIconPath
                            : item.iconPath
                        }
                      />
                    )}
                  </View>
                )}
                <View className="tab-bar__view__view__box">
                  <Text
                    className={`tab-bar__view__view__box__${
                      currentTab === index ? "text" : "text-active"
                    }`}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
export default DqTabBar