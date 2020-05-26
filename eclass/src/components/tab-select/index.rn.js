import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { StyleSheet } from "react-native";
import IconFont from "@/components/iconfont";
import { DqTagSelect } from "@/components";
import "./index.scss";

export default class TabSelect extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }

  static defaultProps = {
    tabList: [],
    current: -1,
    styleHeader: "", //basic<普通Picker选择器> ， manu<一列链表选择器>  ， tag<标签选择器>
    isShowBtn: false
  };

  onTab = item => {
    //自定义选择列表 选择每个选项事件
    if (item.id == this.props.current) {
      this.props.onTab(-1);
    } else {
      this.props.onTab(item.id);
    }
  };

  onSelect = item => {
    this.props.onChecked(item[0]);
  };

  onSure = () => {
    this.props.onTab(-1);
  };

  onClear = () => {
    this.props.onClear(this.props.current);
  };

  render() {
    const { tabList, current, styleHeader, styleBody, isShowBtn } = this.props;

    return (
      <View className="tab-select">
        <View className="tab-select__header" style={styleHeader}>
          {tabList.map(item => {
            const c = item.id === current ? "--active" : "";
            const t = item.active ? "--active" : "";
            return (
              <View
                key={item.id}
                className={"tab-select__header__item" + c}
                onClick={this.onTab.bind(this, item)}
              >
                <Text className={"tab-select__header__item__text" + t}>
                  {item.label}
                </Text>
                <IconFont
                  name={item.id === current ? "icon_shouqi" : "icon_zhankai"}
                  color={item.id === current ? "#F87C6A" : "#747474"}
                  size={50}
                />
              </View>
            );
          })}
        </View>

        {current >= 0 && (
          <View
            className="tab-select__body"
            style={[StyleSheet.absoluteFillObject, styleBody]}
          >
            <View
              className="tab-select__body__bg"
              onClick={this.onSure.bind(this)}
            ></View>
            <View className="tab-select__body__content">
              {this.props.children}
              {
                <View>
                  <DqTagSelect
                    max="1"
                    selector={this.props.items[current]}
                    selected={this.props.checked[current]}
                    onChangeSelect={this.onSelect.bind(this)}
                  />
                </View>
              }
            </View>
            {isShowBtn && (
              <View className="tab-select__body__btn">
                <View
                  className="tab-select__body__btn__clear"
                  onClick={this.onClear.bind(this)}
                >
                  <Text className="tab-select__body__btn__clear__text">
                    清除
                  </Text>
                </View>
                <View
                  className="tab-select__body__btn__sure"
                  onClick={this.onSure.bind(this)}
                >
                  <Text className="tab-select__body__btn__sure__text">
                    确定
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}
