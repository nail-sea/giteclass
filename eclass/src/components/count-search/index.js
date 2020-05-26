import Taro, { Component, PureComponent } from "@tarojs/taro";
import { View, Text, Picker } from "@tarojs/components";
import { DqInput, BasicButton } from "@/components";
import utils from "@/utils/utils";
import "./index.scss";
import { formatStyle } from "../../utils/style";

export default class SearchHeader extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {};
  }
  static defaultProps = {
    s_t: "", //开始时间
    s_t_s: "", //开始时间的最早时间
    s_t_e: "", //开始时间的最晚时间
    e_t: "", //结束时间
    e_t_s: "",
    e_t_e: "",
    isId: true
  };

  async componentWillMount() { }

  change = (type, data) => {
    if (type == "search_id") {
      this.props.onChange(type, data);
    } else {
      this.props.onChange(type, data.detail.value);
    }
  };

  handleSearch = () => {
    this.props.onSearch();
  };

  render() {
    const { s_t, s_t_s, s_t_e, e_t, e_t_s, e_t_e, search_id, isId } = this.props;
    let start_t_e = s_t_e || "";
    let end_t_s = e_t_s || "";
    if (e_t) {
      start_t_e = s_t_e
        ? new Date(e_t).getTime() - new Date(s_t_e).getTime() > 0
          ? s_t_e
          : e_t
        : e_t;
    }
    if (s_t) {
      end_t_s = e_t_s
        ? new Date(s_t).getTime() - new Date(e_t_s).getTime() > 0
          ? s_t
          : e_t_s
        : s_t;
    }
    return (
      <View className="search-header">
        <View className="search-header__time">
          <Picker
            mode="date"
            start={s_t_s}
            end={start_t_e}
            value={s_t}
            onChange={this.change.bind(this, "start_time")}
          >
            <Text className="search-header__time-text">
              {s_t ? s_t : "开始日期"}
            </Text>
          </Picker>
          <Text>
            -
          </Text>
          <Picker
            mode="date"
            start={end_t_s}
            end={e_t_e}
            value={e_t}
            onChange={this.change.bind(this, "end_time")}
          >
            <Text className="search-header__time-text">
              {e_t ? e_t : "结束日期"}
            </Text>
          </Picker>
        </View>
        {isId && (
          <View className="search-header__input">
            <DqInput
              name="search_id"
              placeholder="请输入手机号"
              value={search_id}
              styleType="-style3"
              maxLength={11}
              onInput={this.change.bind(this, "search_id")}
            />
          </View>
        )}
        <View className="search-header__btn">
          <BasicButton
            label="搜索"
            styleType="-mini-border"
            onClick={this.handleSearch.bind(this)}
          >
            搜索
          </BasicButton>
        </View>
      </View>
    );
  }
}
