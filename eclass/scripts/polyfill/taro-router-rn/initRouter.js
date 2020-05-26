import React from 'react' // eslint-disable-line
import getWrappedScreen from './getWrappedScreen'
import { getNavigationOptions } from './utils'

const {createStackNavigator, createBottomTabNavigator} = require('react-navigation')

function getTaroTabBarIconConfig (index, key) {
  const _taroTabBarIconConfig = global._taroTabBarIconConfig || {}
  return _taroTabBarIconConfig[index] && _taroTabBarIconConfig[index][key]
}

function getRouteParam (navigation, name) {
  let routeState = navigation.state.routes[navigation.state.index]
  return routeState.params && routeState.params[name]
}

function getTabBarVisibleFlag (navigation) {
  const tabBarVisible = getRouteParam(navigation, '_tabBarVisible')
  if (typeof tabBarVisible === 'boolean') {
    return tabBarVisible
  } else {
    return navigation.state.index === 0 // 第一级不显示 tabBar
  }
}

/**
 * @param pageList
 * @param Taro
 * @param navigationOptions config.navigationOptions
 * @returns {*}
 */
function getRootStack ({pageList, Taro, navigationOptions}) {
  let RouteConfigs = {}
  pageList.forEach(v => {
    const pageKey = v[0]
    const Screen = v[1]
    RouteConfigs[pageKey] = getWrappedScreen(Screen, Taro, navigationOptions)
  })

  // 让rn支持背景颜色设置,支持透明色
  let stackNavigatorOptions = navigationOptions.stackNavigatorOptions || {}
  let navigatorOptions = {
    cardStyle: { // 第一层颜色设置
      backgroundColor: navigationOptions.backgroundColor
    },
    transitionConfig: () => ({
      containerStyle: { // 第二层颜色设置
        backgroundColor: navigationOptions.backgroundColor
      }
    }),
    ...stackNavigatorOptions
  }
  return createStackNavigator(RouteConfigs, {headerLayoutPreset: 'center', ...navigatorOptions})
}

function getRootStackPageList ({pageList, tabBar, currentTabPath}) {
  const tabPathList = tabBar.list.map(item => item.pagePath)
  const currentPage = pageList.find(item => item[0] === currentTabPath)
  if (currentPage === undefined) {
    throw new Error('tabBar 的 pagePath 必须是 pages 配置页面')
  }
  const newPageList = pageList.filter(item => tabPathList.indexOf(item[0]) === -1) // 去除 tabPathList 里的 pagePat
  newPageList.unshift(currentPage)
  return newPageList
}

function getTabRouteConfig ({pageList, Taro, tabBar, navigationOptions}) {
  let RouteConfigs = {}
  // newPageList 去除了 tabBar 配置里面的页面，但包含当前 tabBar 页面
  // 防止页面跳转时 tabBar 和 stack 相互干扰，保证每个 tabBar 堆栈的独立性
  tabBar.list.forEach((item) => {
    const currentTabPath = item.pagePath
    const page = pageList.find(([path, component]) => path === currentTabPath)
    if(page){
      const Screen = page[1]
      RouteConfigs[currentTabPath] = {screen:getWrappedScreen(Screen, Taro)}
    }
  })
  return RouteConfigs
}

function getTabBarRootStack ({pageList, Taro, tabBar, navigationOptions}) {
  const RouteConfigs = getTabRouteConfig({pageList, Taro, tabBar, navigationOptions})
  // TODO tabBar.position
  const tabNavigator = createBottomTabNavigator(RouteConfigs, {
    initialRouteName: pageList[0][0], // app.json里pages的顺序，第一项是默认打开页
    navigationOptions: ({navigation}) => ({ // 这里得到的是 tab 的 navigation
      
      tabBarLabel: (() => {
        const {routeName} = navigation.state
        const tabBarIndex = tabBar.list.findIndex(item => item.pagePath === routeName) + 1
        const itemText = getTaroTabBarIconConfig(tabBarIndex, 'itemText')
        return itemText || tabBar.list.find(item => item.pagePath === navigation.state.routeName).text
      })(),
      // tabBarVisible: getTabBarVisibleFlag(navigation)
    }),
    /**
     * color ✅
     * selectedColor ✅
     * backgroundColor ✅
     * borderStyle 🤔
     * position ❌
     * custom ❌
     */
    tabBarOptions: {
      backBehavior: 'initialRoute',
      activeTintColor: tabBar.selectedColor || '#3cc51f',
      inactiveTintColor: tabBar.color || '#7A7E83',
      activeBackgroundColor: tabBar.backgroundColor || '#ffffff',
      inactiveBackgroundColor: tabBar.backgroundColor || '#ffffff',
      style: tabBar.borderStyle ? {
        backgroundColor: tabBar.borderStyle
      } : {},
      tabList:tabBar.list
    },
    tabBarComponent:tabBar.tabBarComponent
  })

  const stackRouteConfig = {
    tab:{
      screen:tabNavigator
    },
    initialRouteName:'tab'
  }
  pageList.forEach(v => {
    const pageKey = v[0]
    const Screen = v[1]
    stackRouteConfig[pageKey] = {screen:getWrappedScreen(Screen, Taro)}
  })
  return createStackNavigator(stackRouteConfig,{headerMode:'none'})

}

/**
 * @description
 * @param pageList  [['pages/index/index', pagesindexindex]]
 * @param Taro
 * @param navigationOptions 头部导航相关配置 App.config.navigationOptions 全局
 * @param tabBar  tabBar相关配置 App.config.tabBar
 * @returns {*}
 */
const initRouter = (pageList, Taro, {window = {}, tabBar}) => {
  const navigationOptions = getNavigationOptions(window)
  if (tabBar && tabBar.list) {
    return getTabBarRootStack({pageList, Taro, tabBar, navigationOptions})
  } else {
    return getRootStack({pageList, Taro, navigationOptions})
  }
}

export {
  getRootStack, getTabRouteConfig, initRouter, getRootStackPageList
}

