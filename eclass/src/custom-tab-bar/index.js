import Taro, { Component } from '@tarojs/taro'
import { CoverView, CoverImage, View, Text} from '@tarojs/components'
import { STATIC_ASSETS } from "@/config";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import './index.scss'

@connect(({ notice }) => ({
  ...notice
}))
@decorator()
class customTabBar extends Component {
  state = {
    selected: 0,
    color: '#A0A0A0',
    selectedColor: '#F87C6A',
    list: [{
      pagePath: '/pages/home/index',
      iconPath: STATIC_ASSETS("images/tab-bar/home.png"),
      selectedIconPath: STATIC_ASSETS("images/tab-bar/home-active.png"),
      text: '首页',
      key:'home',
    },{
      pagePath: "/pages/notice/notice",
      iconPath: STATIC_ASSETS("images/tab-bar/notice.png"),
      selectedIconPath: STATIC_ASSETS("images/tab-bar/notice-active.png"),
      text: "客服",
      key:'notice'
    },
    {
      key:'release',
    },
    {
      pagePath: "/pages/shopStore/index",
      iconPath: STATIC_ASSETS("images/icon/icon_dianpu.png"),
      selectedIconPath: STATIC_ASSETS("images/tab-bar/icon_dianpu.png"),
      text: "店铺",
      key:'store'
    },
    {
      pagePath: "/pages/user/user",
      iconPath: STATIC_ASSETS("images/tab-bar/user.png"),
      selectedIconPath: STATIC_ASSETS("images/tab-bar/user-active.png"),
      text: "我的",
      key:'user'
    }]
  }

  switchTab = (item) => {
    const url = item.pagePath
    Taro.switchTab({
      url
    })
  }

  jumpIntellect = () => {
    this.setState({
      selected: 2
    },()=>{Taro.switchTab({url: '/pages/release/release'})})
    
  }

  componentDidMount(){
    const { count, dispatch } = this.props
    if(count===''){
      dispatch({
        type: "notice/getMessageCount",
        payload: {}
      })
    }
  }

  // 自定义 tabBar的页面
  render() {
    const { list, selected, selectedColor, color } = this.state
    const { count } = this.props
    return ( 
      <CoverView className='tab-bar'  style={{
        backgroundImage: `url(${STATIC_ASSETS(
          "images/tab-bar/tabbar_bg.png"
        )})`
      }}>
        <CoverView className='tab-bar-wrap'>
          {
            list.map((item, index) => {
              if(index===2) return <View className='tab-bar-wrap-item'></View>
              return <CoverView className='tab-bar-wrap-item'
                onClick={this.switchTab.bind(this, item)}
                data-path={item.pagePath}
                key={item.key}
              >
                <CoverImage className='tab-bar-wrap-item-icon' src={selected === index ? item.selectedIconPath : item.iconPath} />
                {item.key==='notice'&&count>0&&<CoverView className='tab-bar-wrap-item-count'>{count}</CoverView>}
                <CoverView className='tab-bar-wrap-item-btn'
                    style={{color: selected === index ? selectedColor : color}}
                  >
                    <CoverView>{item.text}</CoverView>
                </CoverView>
              </CoverView>
            })
          }
        </CoverView>
        <CoverView  className='intellect-icon'>
          <CoverImage  className='intellect-icon-img' src={STATIC_ASSETS("images/tab-bar/release.png")} onClick={this.jumpIntellect} />
          <CoverView className="intellect-icon-btn">发布</CoverView>
        </CoverView>
      </CoverView>
    )
  }
}
export default customTabBar
  