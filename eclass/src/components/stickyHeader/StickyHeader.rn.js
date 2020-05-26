import Taro, { Component, PureComponent } from "@tarojs/taro";
import { Animated, StyleSheet } from "react-native";
class StickyHeader extends PureComponent {
  static defaultProps = {
    stickyHeaderY: -1,
    stickyScrollY: new Animated.Value(0),
    stickyStyle:null,
    onStickyChange:() => {}
  };

  constructor(props) {
    super(props);
    this.state = {
      stickLayoutY: 0,
      sticky: false
    }
  }

  componentDidMount() {
    this.props.stickyScrollY.addListener(this._onStickyScroll)
  }

  componentWillUnmount() {
    
  }

  _getOffsetY = () => {
    const { stickyHeaderY } = this.props;
    const { stickyLayoutY } = this.state;
    return stickyHeaderY != -1 ? stickyHeaderY : stickyLayoutY;
  }

  _onStickyScroll = ({value}) => {
    const {onStickyChange} = this.props
    const offsetY = this._getOffsetY()
    const sticky = value >= offsetY
    if (sticky !== this.state.sticky) {
      this.setState({sticky})
      onStickyChange(sticky)
    }
  }

  _onLayout = event => {
    this.setState({
      stickyLayoutY: event.nativeEvent.layout.y
    });
  };

  _getTranslateY = () => {
    const {  stickyScrollY } = this.props;
    let offsetY = this._getOffsetY()
    const translateY = stickyScrollY.interpolate({
      inputRange: [-1, 0, offsetY, offsetY + 1],
      outputRange: [0, 0, 0, 1]
    });
    return translateY
  };

  _getStickyStyle = () => {
    const {sticky} = this.state
    return sticky? this.props.stickyStyle: null
  }

  render() {
    const {children, style} = this.props
    const stickyStyle = this._getStickyStyle()
    return (
      <Animated.View
        style={[
          style,
          stickyStyle,
          styles.container,
          {
            transform:[
              {translateY:this._getTranslateY()}
            ]
          }
        ]}
      >
        {children}
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    zIndex: 10000,
    // width:'100%',
  }
})

export default StickyHeader;
