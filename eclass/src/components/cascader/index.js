import Taro, { Component, PureComponent } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import { getPlatform } from "@/utils/common";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import classNames from 'classnames'
import './index.scss'

@connect(({ location }) => ({
  ...location
}))
@decorator()
class Cascader extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      tabList: [ // 定位切换tab
        { id: 1, initname: "请选择省", name: "请选择省", selector_city: -1 },
        { id: 2, initname: "请选择市", name: "请选择市", selector_city: -1 },
        { id: 3, initname: "选择区/县", name: "选择区/县", selector_city: -1 },
        { id: 4, initname: "选择乡/镇", name: "选择乡/镇", selector_city: -1 }
        // { id: 5, initname: '选择小区', name: '选择小区',selector_city:0}
      ],
      currentTab: 1,
      select_citys:[]//当前已选的省市区
    };
  }
  static defaultProps = {
    tabClass: 'tag',
    tabLevel: 4,
    compStyle:'',
    selector:[],
    title: "",
    isHeight: false,
    onSelect: () => {},
  }

  componentDidMount() {
    this.dispatchLocation(1);
  }

  dispatchLocation = async _id => {// 请求下级列表
    await this.props.dispatch({
      type: "location/getLevelArea",
      payload: {
        up_id: _id
      }
    });
  }

  onTab = id => { //切换城市层级
    let index = id == 1 ? 0 : id - 2;
    let selector_city = this.state.tabList[index]["selector_city"];
    if (selector_city != -1) {
      this.setState({ currentTab: id });
      selector_city = id == 1 ? 1 : selector_city;
      this.dispatchLocation(selector_city);
    }
  }

  // 最后一级时跳转首页
  onEndSelect = async (select_item) => {
    const res = await this.props.dispatch({
      type: "location/getLightCityInfo",
      payload: {
        district_sqe: select_item.district_sqe
      }
    })
    if(res) this.props.onSelect(res.area_info)
  }


  onChoose = async (item, index) => { //选择某个地区
    if (!getPlatform().isRN) {
      Taro.pageScrollTo({
        scrollTop: 0,
        duration: 20
      })
    }
    const { tabList, select_citys, currentTab } = this.state
    const { tabLevel } = this.props
    if (currentTab >= tabLevel || (currentTab != 1 && index == 0)) {
      let select_item = index == 0 ? select_citys[select_citys.length - 1] : item;
      this.onEndSelect(select_item)
      return;
    }

    const select_citys_list = select_citys.filter((ele, index) => {
      return index < currentTab
    })
    select_citys_list[currentTab - 1] = item;

    this.setState(prevState => ({
      tabList: prevState.tabList.map(ele => {
        if(ele.id == currentTab){
          ele.name = item.city_name
          ele.selector_city = item.city_id
        } else if (ele.id > currentTab){
          ele.name = ele.initname
          ele.selector_city = -1
        }
        return ele
      }),
      select_citys: select_citys_list,
      currentTab: prevState.currentTab + 1
    }),async () => {
      if (item.city_id != -1) {
        await this.dispatchLocation(item.city_id);
        if(this.props.selectPosition.length <= 0){
          this.onEndSelect(item)
        }
      }
    })
  };
  renderSelectPosition = () => {
    const { currentTab, select_citys } = this.state
    const { selectPosition} = this.props
    return(
      <View className='cascader-panel__list'>
        {selectPosition.map((item, index) => {
          const c = select_citys && select_citys[currentTab - 1] && select_citys[currentTab - 1].city_id == item.city_id ? '--active' : ''
          return(
            <View key={item.city_id} className='cascader-panel__item' onClick={this.onChoose.bind(this, item, index)}>
                <Text className={`cascader-panel__item__text${c}`}>{item.city_name}</Text>
            </View>
          )
        })}
      </View>
    )
    
  }


  render () {
    const { tabList, currentTab, select_citys } = this.state
    const { tabClass, tabLevel, selector, compStyle, selectPosition, title, isHeight} = this.props
    return (
      <View className={'cascader'}>
        {title ? <View className='cascader__title'>
          <Text className="cascader__title__text">{ title }</Text>
        </View> : null}
        {tabList ? <View className={`cascader-${tabClass}`}>
          {tabList.map((item) => {
            const current = item.id === currentTab
            if(item.id > tabLevel) return
            return(
              <View 
                key={item.id}
                className={classNames(`cascader-${tabClass}__item`, {[`cascader-${tabClass}__item--active`]: current} )}
                onClick={this.onTab.bind(this, item.id)}
                style={compStyle}
              >
                <Text className={`cascader-${tabClass}__item__text cascader-${tabClass}__item--active__text`}>{item.name}</Text>
                <View
                  className={classNames(`cascader-${tabClass}__item__border`, {[`cascader-${tabClass}__item__border--active`]: current})}
                ></View>
              </View>
            )
          })}
        </View> : null}

        {selectPosition ? <View className='cascader-panel'>
          {isHeight 
            ? <ScrollView
                scrollY
                className="cascader-panel__scroll"
              >
                {this.renderSelectPosition()}
              </ScrollView>
            : <View>{this.renderSelectPosition()}</View>
          }
        </View> : null}
      </View>
    )
  }
}
export default Cascader;