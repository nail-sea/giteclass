import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components';
import { Animated, Easing } from 'react-native';
import './index.scss'
import { STATIC_ASSETS } from '../../config'
export default class Noticebar extends PureComponent {
  static defaultProps = {
    isMove : true,
    isMarquee: true,
    speed: 10,
    list: ['免责声明:本平台不对任何人提供任何形式担保!']
  }
  constructor(props) {
    super(props)
    this.state = {
      width: 0,
      scrollValue : new Animated.Value(0)
    }
    this.createAnimation(0)
  }

  componentWillReceiveProps(nextProps) {
    
  }

  getDuration = (value) => {
    return (1 - value)  * this.props.speed * 1000
  }

  createAnimation = (value) => {
    this.scrollAnimation = Animated.timing(this.state.scrollValue, {
      toValue: 1, 
      duration: this.getDuration(value),
      easing: Easing.linear
    })
  }

  scroll = () => {
    this.state.scrollValue.setValue(0)
    this.scrollAnimation.start(this.scroll)
  }

  start = () => {
    this.scrollAnimation.start(() => {
      this.createAnimation(0)
      this.scroll()
    })
  }

  stop = () => {
    this.state.scrollValue.stopAnimation(value => {
      this.createAnimation(value)
    })
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
  }


  handleLink = () => {
    // Dq.navigateTo({
    //   url: '/pages/notice/notice'
    // })
  }

  onLayout = ({nativeEvent}) => {
    const {layout: {width}} = nativeEvent
    this.setState({width})
  }

  getTransform = () => {
    const translateX = this.state.scrollValue.interpolate({
      inputRange:[0, 1],
      outputRange:[this.state.width / 2, -this.state.width/ 2]
    })
    return {transform: [
      {translateX}
    ]}
  }

  render() {
    const { list } = this.props
    return (
      <View className='notice-bar' onClick={this.handleLink} >
        <Image className='notice-bar__img' src={STATIC_ASSETS('images/icon/notice.png')} />
        <View className='notice-bar__continer' ref='noticeBarContiner'>
          <Animated.View className="notice-bar__content" style={this.getTransform()} onLayout={this.onLayout}>
            {list.map((item, index) => (
              <View
                key={'notice-bar-item-'+index}
                className='notice-bar__item'
              >
                <Text className='notice-bar__item__text'>{item}</Text>
              </View>
            ))}
          </Animated.View>
        </View>
        {/* <View className='notice-bar__icon'>
          <IconFont className='notice-bar__icon' name="ic_zhankai" color={'#c8c8c8'} size={50} />
        </View> */}
      </View>
    )
  }
}
