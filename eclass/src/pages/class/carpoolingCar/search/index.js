import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import { DqInput ,TitleBar, FormInput} from "@/components";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import storage from "@/utils/storage";
import { ROUTER_CLASS } from "@/config/enum";
import "./index.scss";

@connect(({ search }) => ({
  ...search
}))
class CarpoolingCarSearch extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      historyList:[]
    };
  }
  static defaultProps = {
    searchText: '',
    onSearch: () => {},
    onHandleInput: () => {},
  };

  componentWillMount() {
    this.setState({
      historyList: storage.getInstance().getHistorySearch('carpoolingCar') || []
    });
  }

  

  historyClear = () => {
    //清除历史记录
    if (this.state.historyList.length > 0) {
      this.setState({ historyList: [] });
      storage.getInstance().setHistorySearch('carpoolingCar', []);
    }
  };

  tagClick = item => {//点击搜索历史
    this.props.onHandleInput(item)
    this.handleSearch();
  };

  tagDelClick = item => { //删除某条历史记录
    const { historyList } = this.state
    let index = historyList.indexOf(item);
    if (index > -1) {
      historyList.splice(index, 1)
      this.setState({ historyList: historyList },() => {
        storage.getInstance().setHistorySearch('carpoolingCar', this.state.historyList);
      })
    }
  };

  handleInput = (value) => {
    //搜索框输入事件
    this.props.onHandleInput(value)
  };

  handleSearch = () => {
    //点击搜索按钮事件  存储历史记录
    const { searchText } = this.props;
    let index = this.state.historyList.indexOf(searchText);
    if (index < 0 && searchText) {
      this.setState(prevState => ({
        historyList: prevState.historyList.concat(searchText)
      }),() => {
        storage.getInstance().setHistorySearch('carpoolingCar', this.state.historyList);
      })
    }
    this.props.onSearch()
  };

  render() {
    const { historyList } = this.state;
    const { searchText } = this.props;
    return (
      <View className="search-page">
        <View className="search-page__header">
          <View className="search-page__header_icon">
            <IconFont name="ic_sousuo" color="#D1D1D1" size={34} />
          </View>
          <View className="search-page__header__input">
            <FormInput
              placeholder="请输入地点"
              inputStyleDq={{ "padding-right": "34px" }}
              value={searchText}
              onInput={this.handleInput.bind(this)}
            />
          </View>
          <View
            className="search-page__header__btn"
            onClick={this.handleSearch.bind(this)}
          >
            <Text className="search-page__header__btn__text">确定</Text>
          </View>
        </View>
        <View className="search-page__search-title">
          <Text className="search-page__search-title__text">历史搜索</Text>
          <View
            className="search-page__search-title_icon"
            onClick={this.historyClear.bind(this)}
          >
            <IconFont name="icon_shanchu" color="#A0A0A0" size={34} />
          </View>
        </View>
        {historyList ? (
          <View className="search-page__search-history">
            {historyList.map((item, index) => (
              <View key={`${index}`} className="search-page__history-list">
                <IconFont name="icon_shijian" color="#A0A0A0" size={34} />
                <Text
                  className="search-page__history-list__word"
                  onClick={this.tagClick.bind(this, item)}
                >
                  {item}
                </Text>
                <Text
                  className="search-page__history-list__del"
                  onClick={this.tagDelClick.bind(this, item)}
                >
                  ×
                </Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>
    );
  }
}
export default CarpoolingCarSearch;