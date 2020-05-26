import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import './index.scss'

export default class TabBarIndex extends PureComponent {
  static defaultProps = {
    tabClass: 'default',
    isFixed: false,
    currentTab: 1,
    tabList: []
  }

  handleClick = (id) => {
    this.props.onClick(id)
  }

  render () {
    const { tabClass, tabList, currentTab, isFixed } = this.props
    return (
      <View className={isFixed ? ('tab-bar-' + tabClass + '--fixed') : 'tab-bar-' + tabClass}>
        {tabList.map((item) => {
          const current = item.id === currentTab
          return(
            <View 
              key={item.id}
              className={classNames('tab-bar-' + tabClass + '__item', current && ('tab-bar-' + tabClass + '__item--active'))}
              onClick={this.handleClick.bind(this, item.id)}
            >
              <Text>{item.name}</Text>
            </View>
          )
        })}
      </View>
    )
  }
}
