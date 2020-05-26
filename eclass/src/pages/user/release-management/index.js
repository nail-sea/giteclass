import Taro, { Component } from "@tarojs/taro";
import { View, Text, Image, ScrollView } from "@tarojs/components";
import { TitleBar, TabBar, NoData , DqButton, BasicButton, SkeletonList} from "@/components";
import { connect } from "@tarojs/redux";
import decorator from "@/config/decorator";
import { getWindowHeight } from "@/utils/style";
import ENUM from "@/config/enum";
import ItemHomeMin from "@/pages/class/item-master/item-home-min/index";
import global from "@/utils/global";
import { getPlatform } from "@/utils/common";
import { formatStyle } from "../../../utils/style";
import { stopPropagation } from "../../../utils/common";
import "./index.scss";
import Dq from "@/config/Dq";

@connect(({ user, classModels, publish, loading }) => ({
  ...user,
  ...classModels,
  ...publish,
  ...loading
}))
@decorator({needLogin: true})
class ReleaseManagement extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      loading:true,
      hasMore: true,
      page: 1,
      currentTab: "auditing",
      tabList: [
        // { id: "", name: "全部" },
        // { id: "waitpay", name: "待支付" },
        { id: "auditing", name: "审核中" },
        { id: "published", name: "已发布" },
        { id: "finished", name: "已结束" }
      ]
    }
  }

  config = {
    navigationBarTitleText: "发布管理"
  };

  static defaultProps = {
    publishList: [],
    userInfo: {},
  };

  async componentDidMount() {
    let data = await this.props.dispatch({
      type: "user/fetchMyInfo"
    });
    if(data){
      this.getList();
    }
  }

  async getList() {
    //获取列表数据
    let data = await this.props.dispatch({
      type: "user/fetchPublishmanagement",
      payload: {
        publish_type: this.state.currentTab,
        page: this.state.page
      }
    });
    this.setState(prevState => ({
      loading:false,
      page: prevState.page + 1,
      hasMore: data.list.length > 9
    }));

  }

  loadRecommend = () => {
    const isLoading = this.props.effects['user/fetchPublishmanagement']
    //加载更多
    if (!this.state.hasMore || isLoading) {
      return;
    }
    this.getList();
  };

  handleTab = id => {
    //切换tab
    this.setState({ currentTab: id, page: 1 }, () => {
      this.getList();
    });
  };

  onGoRelease = () => {
    //没有内容 去发布
    Dq.redirectTo({
      url: "/pages/release/release"
    });
  };

  onToDetail = (id, type) => {
    //查看详情
    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}&from=release-management`
    });
  };

  onToPersonalPage = uid => {
    //查看个人主页
    Dq.navigateTo({
      url: `/pages/user/personal-page/index?uid=${uid}`
    });
  };

  async cancelpayment(id) {
    //取消
    let data = await this.props.dispatch({
      type: "user/fetchCancelpayment",
      payload: {
        post_id: id
      }
    });
    if (data) {
      this.setState({ page: 1 }, () => {
        this.getList();
      });
    }
  }

  async onCancel(id, e) {
    //取消发布
    stopPropagation(e)
    let result = await Taro.showModal({ content: "确定取消支付？", confirmColor : '#F87C6A'});
    if (result.confirm) {
      this.cancelpayment(id);
    }
  }

  onGoPay = (id, e) => {
    //去支付
    stopPropagation(e)
    Dq.navigateTo({
      url: `/pages/release/pay-for/index?post_id=${id}`
    });
  };

  onRoofPlacement = async (id, e) => {
    //置顶
    stopPropagation(e)
    await this.props.dispatch({
      type: "publish/saveTop",
      payload: {
        status: ENUM.NOTOPSTATUS,
        index: "",
        key: "",
        value: ""
      }
    });
    Dq.navigateTo({
      url: `/pages/release/top/index?post_id=${id}&post_type=releaseManagementTop`
    });
  };

  async downshelfpost(id) {
    //下架
    let data = await this.props.dispatch({
      type: "user/fetchDownshelfpost",
      payload: {
        post_id: id
      }
    });
    if (data) {
      this.setState({ page: 1 }, () => {
        this.getList();
      });
    }
  }

  async onLowerShelf(id, e) {
    //下架
    stopPropagation(e)
    let result = await Taro.showModal({ content: "确定下架？" ,confirmColor : '#F87C6A'});
    if (result.confirm) {
      this.downshelfpost(id);
    }
  }

  handleBack = () => {
    //返回user
    Dq.redirectTo({
      url: "/pages/user/user"
    });
  };

  render() {
    const { currentTab, tabList, hasMore, loading } = this.state;
    const { userInfo, publishList } = this.props;
    const currentTabName = tabList.filter(item => item.id === currentTab)[0].name;
    const isLoading = this.props.effects['user/fetchPublishmanagement']

    return (
      <View className="release-management">
        <TitleBar
          title="发布管理"
          customBack={true}
          handleBack={this.handleBack.bind(this)}
        />
        <TabBar
          tabList={this.state.tabList}
          currentTab={this.state.currentTab}
          // compStyle={{ width: "50%" }}
          compStyle={{ flex: 1 }}
          onClick={this.handleTab}
        />
        <ScrollView
          scrollY
          className="release-management__wrap"
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(false, true, 39) }}
        >
          <View className="release-management__header"></View>
          <SkeletonList
            loading={loading} 
            itemProps={{height:200,avatar:false,rows:3}}
          >

            {publishList && publishList.length > 0 ? <View>
              <View className="main-list">
                {publishList.map((item, index) => {
                  return (
                    <ItemHomeMin
                      key={item.id}
                      item={item}
                      type="release-management"
                      avatar_url={userInfo.avatar_url}
                      user_name={userInfo.uname}
                      onHandleDetail={this.onToDetail.bind(
                        this,
                        item.id,
                        item.primary_category
                      )}
                      onHandleToPersonalPage={this.onToPersonalPage.bind(
                        this,
                        item.uid
                      )}
                    >
                      <View>
                        {item.publish_type == "waitpay" && (
                          <View className="release-management__list-btn">
                            <View className="release-management__list-btn__item">
                              <BasicButton
                                label="取消"
                                styleType="-mini-border"
                                onClick={this.onCancel.bind(this, item.id)}
                              >
                              取消</BasicButton>
                            </View>
                            <View className="release-management__list-btn__item">
                              <BasicButton
                                label="立即支付"
                                styleType="-mini"
                                onClick={this.onGoPay.bind(this, item.id)}
                              >立即支付</BasicButton>
                            </View>
                          </View>
                        )}
                        {item.publish_type == "published" && (
                          <View className="release-management__list-btn">
                            <View className="release-management__list-btn__item">
                              <BasicButton
                                label="置顶"
                                styleType="-mini"
                                onClick={this.onRoofPlacement.bind(this, item.id)}
                              >置顶</BasicButton>
                            </View>
                            <View className="release-management__list-btn__item">
                              <BasicButton
                                label="下架"
                                styleType="-mini"
                                onClick={this.onLowerShelf.bind(this, item.id)}
                              >下架</BasicButton>
                            </View>
                          </View>
                        )}
                      </View>
                    </ItemHomeMin>
                  );
                })}
              </View>
              <View className="list__bottom__loading">
                {isLoading && (
                  <Text className="list__bottom__loading-txt">正在加载中...</Text>
                )}
                {!hasMore && (
                  <Text className="list__bottom__loading-txt">没有更多了</Text>
                )}
              </View>
            </View>
            : <View>
                <NoData title="" tips={`还没有${currentTabName}的数据~`} />
                <View className={`release-management__btn`}>
                  <BasicButton
                    label="开始发布"
                    onClick={this.onGoRelease.bind(this)}
                    size="large"
                  >开始发布</BasicButton>
                </View>
              </View>
            }
          </SkeletonList>
        </ScrollView>
      </View>
    );
  }
}
export default ReleaseManagement;