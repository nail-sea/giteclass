import Taro, { Component } from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import { TitleBar, NoData } from "@/components";
import { connect } from "@tarojs/redux";
import ENUM from "@/config/enum";
import Storage from "@/utils/storage";
import decorator from "@/config/decorator";
import NoticeItem from "./notice-item";
import Dq from "@/config/Dq";
import Platform from "@/platfrom";
import "./notice.scss";
@connect(({ notice }) => ({
  ...notice
}))
@decorator()
class Notice extends Component {
  config = {
    navigationBarTitleText: "客服"
  };

  state = {
    loginState: ""
  };

  componentDidMount() {
    this.fetchNotice()
  }

  async componentDidShow() {
    if(process.env.TARO_ENV === 'weapp'){
      if (typeof this.$scope.getTabBar === 'function' && this.$scope.getTabBar()) {
        await this.props.dispatch({
          type: "notice/getMessageCount",
          payload: {}
        })
        this.$scope.getTabBar().$component.setState({
          selected: 1,
          count: this.props.count
        })
      }  
    }
  }

  fetchNotice = async () => {
    const { dispatch} = this.props;
    const loginState = await Storage.getInstance().getLoginState();
    if (loginState === ENUM.LOGINSTATUS) {
      this.setState({
        loginState
      });
    
      await dispatch({
        type: "notice/fetchNoticeType",
        payload: {}
      });

      if(process.env.TARO_ENV === 'h5' || process.env.TARO_ENV === 'rn'){
        await dispatch({
          type: "notice/getMessageCount",
          payload: {}
        })
      }
      
    }
  };

  handleClick = mesType => {
    this.fetchNotice();

    Dq.navigateTo({
      url: `/pages/notice/detail/index?type=${mesType}`
    });
  };

  render() {
    const {
      mesType: { noticemesdata, sysmesdata, shopmesdata },
      count
    } = this.props;
    const { loginState } = this.state;

    return (
      <View className="notice-view">
        <TitleBar title="消息" is_back={false} />
        {/* <DqTabBar currentTab={1} count={count} /> */}
        {loginState === ENUM.LOGINSTATUS ? (
          <View className="notice-list">
            {/* 系统消息 */}
            {sysmesdata &&
            sysmesdata.mes_data? (
              <NoticeItem data={sysmesdata} onHandleClick={this.handleClick} />
            ) : null}
            {/* E网助手 */}
             {noticemesdata &&
            noticemesdata.mes_data? (
              <NoticeItem
                data={noticemesdata}
                onHandleClick={this.handleClick}
              />
            ) : null}
            {/* 店铺通知*/}
            {shopmesdata &&
            shopmesdata.mes_data ? (
              <NoticeItem data={shopmesdata} onHandleClick={this.handleClick} />
            ) : null}
             {/* 客服*/}
            <NoticeItem
              data={{
                mes_num: 0,
                mes_type: 4,
                mes_title: "联系客服",
                mes_data: [
                  {
                    mes_id: "",
                    mes_content: '', //"服务时间 24小时回复",
                    mes_createtime: ""
                  }
                ]
              }}
              onHandleClick={() =>{
                Dq.navigateTo({
                  url: `/pages/service/server/index`
                });
              }}
            />
          </View>
        ) : (
          <NoData tips="还没有任何消息哦~" />
        )}
      </View>
    );
  }
}

export default Notice;
