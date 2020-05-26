import Taro, { useState } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import DqLoading from '../dq-loading'

import './index.scss'

var isTop = true;//是否到达顶部
var startP = null;
export default function DqScrollView(props) {
  const {onRefresh = ()=> {}, onScrollToLower = ()=> {} ,onScroll = () => {} , scrollStyle , hasMore , refresherDisabled=false , moveDisabled=false } = props
  const [downDragStyle, setDownDragStyle] = useState({height: 0 + 'px'})
  const [dargStyle, setDargStyle] = useState({ top: 0 + 'px' })
  const [downText, setDownText] = useState('下拉刷新')
  const [scrollY, setScrollY] = useState(true)
  const [dargState, setDargState] = useState(0) // 0无操作 1释放刷新 2 下拉刷新 
  // const [startP, setStartP] = useState({})
  // const [hasMore, setHasMove] = useState('more')s

  const touchmove = e => {
    if(refresherDisabled){
      return
    }

    if(!isTop || !startP.clientX){
      startP = e.touches[0];
      return;
    }


    let move_p = e.touches[0],//移动时的位置
      deviationX = 0.60,//左右偏移量(超过这个偏移量不执行下拉操作)
      deviationY = 56,//拉动长度（低于这个值的时候不执行）
      maxY = 80;//拉动的最大高度
 
    let start_x = startP.clientX,
      start_y = startP.clientY,
      move_x = move_p.clientX,
      move_y = move_p.clientY
    let dev = Math.abs(move_x - start_x) / Math.abs(move_y - start_y)
    // console.log("touchmove------dev",dev)
    if (dev < deviationX) {//当偏移数值大于设置的偏移数值时则不执行操作
      if (move_y - start_y > 0) {//下拉操作
        let pY = Math.abs(move_y - start_y) / 3.5;//拖动倍率
        if (pY >= deviationY) {
          // console.log("touchmove------释放刷新",dargState)

          setDargState(1)
          setDownText('释放刷新')
        } else {
          setDargState(2)
          setDownText('下拉刷新')
          // console.log("touchmove------下拉刷新",dargState)

        }
        if (pY >= maxY) {
          pY = maxY
        }
        setDargStyle({top: pY + 'px'})
        setDownDragStyle({height: pY + 'px'})
        setScrollY(false)

          e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
        // e.stopPropagation();
      }
  }
  }
  const touchEnd = e => {
    if(!isTop){
      return;
    }
    console.log("touchEnd",dargState)

    if (dargState === 1) {
      _down()
    }
    setDargState(0)
    reduction()
  }
  const touchcancel = e => {
    // console.log("touchcancel-------------")

    touchEnd(e);
  }
  const _down = () => {
    // console.log("_down------")
    
    if(refresherDisabled){
      return
    }
    onRefresh()
  }
  const touchScroll = (e)=>{
    if(isTop){
      const { scrollTop } = e.detail;
      if(scrollTop > 30){
        isTop = false;
      }
    }
    // console.log("touchScroll------",isTop)

    onScroll(e);
  }
  const reduction = () => {
    if(refresherDisabled){
      return
    }
    // 刷新之后重置
    setDargStyle({top: 0 + 'px'})
    setDownDragStyle({height: 0 + 'px'})
    setScrollY(true)
    setDargState(0)
    setDownText('下拉刷新')
  }
  const touchStart = e => {
    if(refresherDisabled){
      return
    }
    // console.log("touchStart------",e.touches[0])

    startP = e.touches[0];
    // setStartP(e.touches[0])
  }
  const onScrollToUpper = (e) => {
    console.log("onScrollToUpper")
    isTop = true;
  }
  // console.log(info)
  const loadRecommend = () => {
    console.log("loadRecommend",hasMore)
    if (!hasMore) {
      return;
    }

    onScrollToLower()
  }

  return (
    <View className='DqScrollView' style={scrollStyle}>
      <View className='DqScrollView__downDragBox' style={downDragStyle}>
          <DqLoading  size={'32'} color={"#ff0000"} ></DqLoading>
          <Text className="DqScrollView__downDragBox__downText">{downText}</Text>
      </View>
      <ScrollView
        style={dargStyle}
        className='DqScrollView__container'
        scrollY={scrollY}
        onTouchMove={touchmove}
        onTouchEnd={touchEnd}
        onTouchStart={touchStart}
        onTouchCancel = {touchcancel}
        onScrollToLower={() => loadRecommend()}
        scrollWithAnimation
        onScroll={touchScroll}
        onScrollToUpper={onScrollToUpper}
      >
        {props.children}

      {!moveDisabled && <View className='DqScrollView__loadmore'>{hasMore ? '正在加载中' : '更多内容，敬请期待'}</View>}
      </ScrollView>
    </View>
  )
}
