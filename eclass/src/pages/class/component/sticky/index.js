import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import IconFont from '@/components/iconfont'
import { DqFormItem } from '@/components'
import ENUM from '@/config/enum'
import Dq from "@/config/Dq";
import './index.scss'
function ClassSticky(props) {
  const { top = {}, post_id } = props
  const onItemClick = () => {
    Dq.navigateTo({
      url: `/pages/release/top/index?post_id=${post_id}`
    })
  }
  return (
    <DqFormItem
      label="信息置顶"
      arrow="horizontal"
      onClick={onItemClick}
    >
      {top.top_status >= ENUM.TOPSTATUS ?
        <Text className="dq-class-sticky dq-class-sticky--active">{`置顶${top.top_day}天  ¥${top.top_total_money}`}</Text>
        : <Text className="dq-class-sticky">选择后信息将显示在最顶部</Text>}
    </DqFormItem>
  );
}

export default ClassSticky;