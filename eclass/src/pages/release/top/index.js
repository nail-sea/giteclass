import Taro, { Component } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { DqCheckbox, DqButton ,TitleBar,BasicButton} from "@/components";
import { connect } from "@tarojs/redux";
import ENUM from "@/config/enum";
import IconFont from "@/components/iconfont";
import Dq from "@/config/Dq";
import "./index.scss";
import { getPlatform, stopPropagation } from "../../../utils/common";

@connect(({ publish }) => ({
  ...publish
}))
class Index extends Component {
  config = {
    navigationBarTitleText: "信息置顶"
  };
  state = {
    topArr: [
      { key: 1, value: 10, checked: false },
      { key: 3, value: 30, checked: false },
      { key: 7, value: 70, checked: false },
      { key: 15, value: 150, checked: false }
    ],
    isSubmit: false,
    selectedTop: {}
  };

  componentDidMount() {
    const { top } = this.props;
    const listData = [...this.state.topArr]; //复制数组--浅拷贝

    if (top.top_status >= ENUM.TOPSTATUS) {
      this.setState({
        topArr: listData.map((item, idx) =>
          idx === top.index ? { ...item, checked: true } : item
        ),
        selectedTop: { ...top },
        isSubmit: true
      });
    }
  }

  handleCheckbox = (index, item, e) => {
    stopPropagation(e)
    const { topArr } = this.state;
    let result = topArr.map(data => {
      if (data.key === item.key) {
        data.checked = true;
      } else {
        data.checked = false;
      }
      return data;
    });

    this.setState({
      topArr: result,
      selectedTop: { index, ...item, status: ENUM.TOPSTATUS },
      isSubmit: true
    });
  };

  async handleSubmit() {
    const { dispatch, top } = this.props;
    const { post_id, post_type } = this.$router.params;
    const { selectedTop } = this.state;
    await dispatch({
      type: "publish/saveTop",
      payload: { ...selectedTop } || { ...top }
    });
    if (post_type) {
      if (selectedTop.key) {
        Dq.redirectTo({
          url: `/pages/release/pay-for/post-pay-for?post_id=${post_id}&post_type=${post_type}&top_status=${ENUM.TOPSTATUS}`
        });
      } else {
        Taro.showToast({
          title: "请选择置顶天数",
          icon: "none",
          duration: 2000
        });
      }
    } else {
      Taro.navigateBack({
        delta: 1 // 返回上一级页面。
      });
    }
  }

  render() {
    const { topArr, isSubmit } = this.state;

    return (
      <View className="top-wrap">
        <TitleBar title="信息置顶" />
        <View className="top-wrap__top">
          <Text className="top-wrap__top__title">信息置顶</Text>
          <Text className="top-wrap__top__desc">
            系统自动把推广信息置顶到高曝光位置,按展示天数付费,立即生效
          </Text>
        </View>
        <View className="top-wrap__bottom">
          {topArr.map((item, index) => {
            return (
              <View
                className="top-wrap__bottom__item"
                onClick={this.handleCheckbox.bind(this, index, item)}
              >
                <View className="top-wrap__bottom__item__view">
                  <IconFont
                    name="duihao_selected"
                    color={item.checked ? "#F87C6A" : "rgba(160,160,160,1 )"}
                    size={40}
                  />
                  <Text className="top-wrap__bottom__item__view__text">
                    选择置顶{item.key}天
                  </Text>
                </View>
                <Text className="top-wrap__bottom__item__text">
                  ¥{item.value}
                </Text>
              </View>
            );
          })}
        </View>
        <View className="top-wrap__button">
          <BasicButton
            label="确定"
            disabled={!isSubmit}
            size="large"
            onClick={this.handleSubmit.bind(this)}
          >确定</BasicButton>
        </View>
      </View>
    );
  }
}
export default Index;