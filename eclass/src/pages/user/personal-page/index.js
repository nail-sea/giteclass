import Taro, { Component } from "@tarojs/taro";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import { getWindowHeight } from "@/utils/style";
import { STATIC_ASSETS } from "@/config/index";
import IconFont from "@/components/iconfont";
import { connect } from "@tarojs/redux";
import ItemMaster from "@/pages/class/item-master/index";
import decorator from "@/config/decorator";
import Dq from "@/config/Dq";
import "./index.scss";

@connect(({ user, loading }) => ({
  ...user,
  ...loading
}))

@decorator()

class Index extends Component {
  config = {
    navigationBarTitleText: "个人主页"
  };

  constructor() {
    super(...arguments);
    this.state = {
      userInfo: {},
      total_count: 0,
      hasMore: true,
      page: 1
    };
  }

  static defaultProps = {
    personalpageList: []
  };

  componentDidMount() {
    this.getUserInfo();
  }

  async personalhomepage() {
    const { userInfo, page } = this.state
    let data = await this.props.dispatch({
      type: "user/fetchPersonalhomepage",
      payload: {
        page: page,
        uid: userInfo.id
      }
    });
    let { publish_post_count } = await this.props.dispatch({
      type: "user/fetchPersonalpublishpostcount",
      payload: {
        uid: userInfo.id
      }
    });
    if (data) {
      this.setState(prevState => ({
        total_count: publish_post_count || 0,
        page: prevState.page + 1,
        hasMore: data.list.length > 9
      }));
    }
  }
  async getUserInfo() {
    //获取用户信息  首选从地址栏选取 若没取到 则取当前登录用户的
    const { uid } = this.$router.params;
    let data = await this.props.dispatch({
      type: "user/fetchOtheruserinfo",
      payload: { uid: uid }
    });
    if (data) {
      this.setState({ userInfo: data }, () => {
        this.personalhomepage();
      });
    }
  }
  
  handleBack = () => {
    const { uid } = this.$router.params;
    if (uid) {
      Taro.navigateBack({
        delta: 1 // 返回上一级页面。
      });
    } else {
      Dq.redirectTo({
        url: "/pages/user/user"
      });
    }
  };

  loadRecommend = () => { // 加载更多
    const isLoading = this.props.effects['user/fetchPersonalhomepage']
    if (!this.state.hasMore || isLoading) {
      return;
    }
    this.personalhomepage();
  };

  onToDetail = (id, type) => {
    //查看详情
    Dq.navigateTo({
      url: `/pages/class/detail-master/index?post_id=${id}&from=personal-page`
    });
  };

  onToPersonalPage = uid => {
    //查看个人主页
    Dq.navigateTo({
      url: `/pages/user/personal-page/index?uid=${uid}`
    });
  };

  render() {
    const { userInfo, total_count, hasMore } = this.state;
    const { personalpageList } = this.props
    const isLoading = this.props.effects['user/fetchPersonalhomepage']
    const base_class = "personal-page";
    
    return (
      <View className={`${base_class}`}>
        <ScrollView
          scrollY
          className="personal-page__wrap"
          onScrollToLower={this.loadRecommend}
          style={{ height: getWindowHeight(false, false) }}
        >
          <View className={`${base_class}__header`}>
            <Image
              className={`${base_class}__header__bg`}
              src={STATIC_ASSETS("images/bg/user.png")}
            />
            <View
              className={`${base_class}__header__back`}
              onClick={this.handleBack.bind(this)}
            >
              <IconFont name="ic_back" size={30} />
              <Text className={`${base_class}__header__back__text`}>返回</Text>
            </View>
            <View className={`${base_class}__header__info`}>
              <View className={`${base_class}__header__img`}>
                {userInfo &&
                userInfo.avatar_url &&
                userInfo.avatar_url != "" ? (
                  <Image
                    mode="aspectFill"
                    className={`${base_class}__header__img__img`}
                    src={userInfo.avatar_url}
                  />
                ) : (
                  <View className={`${base_class}__header__img__img`}>
                    <IconFont name="icon_moren" size="122" />
                  </View>
                )}
              </View>
              <View className={`${base_class}__header__text`}>
                <Text className={`${base_class}__header__text1`}>
                  {userInfo.uname}
                </Text>
                <Text className={`${base_class}__header__text2`}>
                  注册时间: {userInfo.create_time}
                </Text>
                <Text className={`${base_class}__header__text2`}>
                  E网发布: {total_count}条
                </Text>
              </View>
            </View>
          </View>

          <View className="personal-page__main-list">
            {personalpageList.map((item, index) => {
              return (
                <ItemMaster
                  key={item.id}
                  item_data={item}
                  type="personal-page"
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
                ></ItemMaster>
              );
            })}
          </View>
          <View className="list__bottom__loading">
            {isLoading && (
              <Text className="list__bottom__loading-txt">正在加载中...</Text>
            )}
            {!hasMore && (
              <Text className="list__bottom__loading-txt">
                更多内容，敬请期待
              </Text>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default Index;