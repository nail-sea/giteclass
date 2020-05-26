import Taro, { PureComponent } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import IconFont from "@/components/iconfont";
import "./index.scss";

export default class DqTagSelect extends PureComponent {
  static options = {
    addGlobalClass: true
  };

  constructor() {
    super(...arguments);
    this.state = {};
  }

  static defaultProps = {
    tadTitle: "",
    selector: [],
    selected: [],
    max: 999,
    min: 1
  };

  copyArr = arr => {
    if (!arr) {
      arr = [];
    }
    const arr1 = [];
    arr.forEach(i => {
      arr1.push(i);
    });
    return arr1;
  };

  onSelItem = item => {
    //自定义选择列表 选择每个选项事件
    let arr = [].concat(this.props.selected);
    if (this.props.max == 1) {
      arr = [item.id];
    } else {
      if (arr.indexOf(item.id) == -1 && arr.length < this.props.max) {
        arr.push(item.id);
      } else if (arr.indexOf(item.id) == -1 && arr.length >= this.props.max) {
        Taro.showToast({
          title: "最多选择" + this.props.max + "项",
          icon: "none",
          duration: 2000
        });
      } else if (arr.indexOf(item.id) >= 0) {
        arr.splice(arr.indexOf(item.id), 1);
      }
    }
    this.props.onChangeSelect(arr);
  };

  render() {
    const { tadTitle, selector, selected, max } = this.props;
    return (
      <View className="dq-tagsel">
        {tadTitle ? (
          <View className="dq-tagsel__title">
            <Text className="dq-tagsel__title__text">{tadTitle}</Text>
          </View>
        ) : null}
        <View className="dq-tagsel__content">
          {selector.map(item => {
            const c = selected.indexOf(item.id) === -1 ? "" : "--active";
            return (
              <View
                key={item.id}
                className={"dq-tagsel__content__item" + c}
                onClick={this.onSelItem.bind(this, item)}
              >
                <Text className={"dq-tagsel__content__item__text" + c}>
                  {item.label}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}
