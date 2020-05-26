import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { ImageBackground, StyleSheet } from "react-native";
import { connect } from "@tarojs/redux";
import "./index.scss";
import { STATIC_ASSETS } from "@/config";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
import Dq from "@/config/Dq";

@connect(({ notice }) => ({
  ...notice
}))
export default class DqTabBar extends PureComponent {
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
    ]
  };

  handleClick = (path, index) => {
    const { currentTab } = this.props;
    if (currentTab !== index) {
      Dq.redirectTo({ url: path });
    }
  };

  componentDidMount = async () => {
    await this.setState({
      loginState: Storage.getInstance().getLoginState()
    });

    if (this.state.loginState === ENUM.LOGINSTATUS) {
      await this.props.dispatch({
        type: "notice/getMessageCount",
        payload: {}
      });
    }
  };

  countRender() {
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

  getSource = src => {
    return typeof src === "string" ? { uri: src } : src;
  };

  render() {
    const { tabList } = this.state;
    const { currentTab } = this.props;
    const bgUrl = STATIC_ASSETS("images/tab-bar/tabbar_bg.png");
    return (
      <ImageBackground
        className="tab-bar"
        imageStyle={styles.bg}
        source={bgUrl}
        onError={() => console.log("bg load error")}
      >
        <View className="tab-bar__view">
          {tabList.map((item, index) => {
            return (
              <View
                key={item.key}
                className="tab-bar__view__view"
                onClick={() => {
                  this.handleClick(item.pagePath, index);
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
                        {this.countRender()}
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
                    {" "}
                    {item.text}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  bg: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
    // backgroundColor:'#fff',
  }
});
