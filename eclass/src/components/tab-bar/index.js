import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import "./index.scss";

export default class TabBar extends PureComponent {
  static defaultProps = {
    tabClass: "default",
    isFixed: false,
    currentTab: 1,
    tabList: [],
    compStyle: ""
  };

  handleClick = id => {
    this.props.onClick(id);
  };

  render() {
    const {
      tabClass,
      tabList,
      currentTab,
      isFixed,
      compStyle,
      isShow
    } = this.props;
    return (
      <View
        className={
          isFixed ? "tab-bar-" + tabClass + "--fixed" : "tab-bar-" + tabClass
        }
      >
        {tabList.map((item , index) => {
          const current = item.id === currentTab;
          return (
            <View
              // key={item.id }
              key={'tab-bar-item-'+index}
              className={classNames(
                "tab-bar-" + tabClass + "__item",
                current && "tab-bar-" + tabClass + "__item--active"
              )}
              onClick={this.handleClick.bind(this, item.id)}
              style={compStyle}
            >
              <Text>{item.name}</Text>
              <View
                className={classNames(
                  "tab-bar-" + tabClass + "__item__border",
                  current && "tab-bar-" + tabClass + "__item__border--active"
                )}
              ></View>
              {/* {
                isShow==-1 ? '': <View
                  className={classNames('tab-bar-' + tabClass + '__item__border', current && ('tab-bar-' + tabClass + '__item__border--active'))}
                ></View> 
              } */}
            </View>
          );
        })}
      </View>
    );
  }
}
