import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { ImageBackground, StyleSheet, TouchableOpacity, Animated , SafeAreaView} from "react-native";
import { connect } from "@tarojs/redux";
import "./index.scss";
import { STATIC_ASSETS } from "@/config";
import Storage from "@/utils/storage";
import ENUM from "@/config/enum";
import classnames from "classnames";
const TABBAR_CONFIG = {
  TABS:[
    {showBadge:false, showRedDot:false},
    {showBadge:true, showRedDot:false, badgeMax:99},
    {showBadge:false, showRedDot:false},
    {showBadge:false, showRedDot:false},
    {showBadge:false, showRedDot:false},
  ]
}
@connect(({ notice }) => ({
  notice
}))
export default class CustomTabBar extends PureComponent {

  componentDidMount = async () => {
    const loginState = await Storage.getInstance().getLoginState()
    if (loginState === ENUM.LOGINSTATUS) {
      this.props.dispatch({
        type: "notice/getMessageCount",
        payload: {}
      });
    }
  };

  _getTabItemWrapClass = ({ index }) => {
    return 'custom-tab-bar__item'
  }

  _renderBadge = ({route, index}) => {
    const {showBadge, showRedDot, badgeMax} = TABBAR_CONFIG.TABS[index]
    let {notice:{count}} = this.props
    // let count = 100
    if (!showBadge && !showRedDot) return null
    if(!count) return null
    count = Number(count)
    const badge = count > badgeMax?`${badgeMax}+`:`${count}`
    return (
      <View className="custom-tab-bar__item__badge">
        <Text className="custom-tab-bar__item__badge__text">{badge}</Text>
      </View>
    )
  }

  _renderIcon = ({ route, focused, index }) => {
    const {
      tabList
    } = this.props
    const {selectedIconPath, iconPath} = tabList[index]
    return <View style={{ flex: 1 }}>
      <Animated.View className="custom-tab-bar__item__icon-wrap" style={{ opacity: Number(focused) }}>
        <Image
          src={selectedIconPath}
          className={classnames('custom-tab-bar__item__icon', { 'custom-tab-bar__item__icon--center': index === 2 })}
        />
      </Animated.View>
      <Animated.View className="custom-tab-bar__item__icon-wrap" style={{ opacity: Number(!focused) }}>
        <Image 
          src={iconPath }
          className={classnames('custom-tab-bar__item__icon', { 'custom-tab-bar__item__icon--center': index === 2 })}
        />
      </Animated.View>
    </View>
  }

  _renderLabel = ({ route, focused, index }) => {
    const {
      showLabel,
    } = this.props;
    if (showLabel === false) {
      return null
    }
    const label = this.props.getLabelText({ route })
    return (
      <Animated.Text numberOfLines={1} className={classnames('custom-tab-bar__item__label', { 'custom-tab-bar__item__label--focused': focused })}>
        {label}
      </Animated.Text>
    )
  }

  render() {
    const {
      navigation,
      onTabPress,
    } = this.props;

    const { routes } = navigation.state;
    const bgUrl = STATIC_ASSETS("images/tab-bar/tabbar_bg.png");
    return (
      <SafeAreaView style={{backgroundColor: '#fff'}}>
        <ImageBackground
          className="custom-tab-bar"
          imageStyle={styles.bg}
          source={bgUrl}
          onError={() => console.log("bg load error")}
        >
          {routes.map((route, index) => {
            const focused = index === navigation.state.index
            const scene = { route, focused, index }
            const accessibilityLabel = this.props.getAccessibilityLabel({
              route
            });
            const testID = this.props.getTestID({ route });
            return (
              <TouchableOpacity activeOpacity={.8} key={route.key} className="custom-tab-bar__item" onPress={() => onTabPress({ route })} testID={testID} accessibilityLabel={accessibilityLabel}>
                <View style={{width:'100%',height:'100%', alignItems:'center', justifyContent:'center'}}>
                  {this._renderBadge(scene)}
                  {this._renderIcon(scene)}
                  {this._renderLabel(scene)}
                </View>
              </TouchableOpacity>
            );
          })}
        </ImageBackground>
      </SafeAreaView>
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
